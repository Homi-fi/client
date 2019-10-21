import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Constant from 'expo-constants'
import { Dimensions, Alert, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

import TimePicker from 'react-native-modal-datetime-picker'
import ToggleSwitch from 'toggle-switch-react-native'

import { Ionicons } from '@expo/vector-icons'

import { useDispatch } from 'react-redux'
import { cronOn, cronOff } from '../../../store/action'
import { Lamp } from '../../../apis/firebase'
import { Item } from 'native-base'

const screenWidth = Math.round(Dimensions.get('window').width);

export default (props) => {
  const { item, tutup } = props
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [onTime, setOnTime] = useState({ hours: item.onScheduler.hours, minutes: item.onScheduler.minutes })
  const [offTime, setOffTime] = useState({ hours: item.offScheduler.hours, minutes: item.offScheduler.minutes })
  const [timeMode, setTimeMode] = useState('on')

  const [onToggle, setOnToggle] = useState(item.onScheduler.status ? true : false)
  const [offToggle, setOffToggle] = useState(item.offScheduler.status ? true : false)


  const BtnHandler = mode => () => {
    setTimeMode(mode)
    setModal(true)
  }

  const timeHandler = async (hours, minutes, status) => {
    const inputHours = hours < 10 ? `0${hours}` : (hours + '')
    const inputMinutes = minutes < 10 ? `0${minutes}` : (minutes + '')
    if (status === 'on') {
      setOnTime({ hours: inputHours, minutes: inputMinutes })
      try {
        await Lamp.doc(item.id).update({ onScheduler: { status: true, hours: inputHours, minutes: inputMinutes } })
        dispatch(cronOn(inputHours, inputMinutes, item.name + '-on'))
      } catch (err) {
        console.log(err)
      }
    } else {
      setOffTime({ hours: inputHours, minutes: inputMinutes })
      try {
        await Lamp.doc(item.id).update({ offScheduler: { status: true, hours: inputHours, minutes: inputMinutes } })
        dispatch(cronOn(inputHours, inputMinutes, item.name + '-off'))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const toggleHandler = (params) => async () => {
    if (params === 'on') {
      if(item.day || item.night){
        Alert.alert(
          'Light sensor warning',
          'This lamp is using day or night feature. Clicking OK will turn them off',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK', onPress: async () => {
                setOnToggle(!onToggle)
                if (!onToggle) {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, onScheduler: { status: true, hours: onTime.hours, minutes: onTime.minutes } })
                    dispatch(cronOn(onTime.hours, onTime.minutes, item.name + '-on'))
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, onScheduler: { status: false, hours: onTime.hours, minutes: onTime.minutes } })
                    dispatch(cronOff(item.name + '-on'))
                  } catch (err) {
                    console.log(err)
                  }
                }
              }
            },
          ],
          { cancelable: false },
        );
      }else{
        setOnToggle(!onToggle)
        if (!onToggle) {
          try {
            await Lamp.doc(item.id).update({ onScheduler: { status: true, hours: onTime.hours, minutes: onTime.minutes } })
            dispatch(cronOn(onTime.hours, onTime.minutes, item.name + '-on'))
          } catch (err) {
            console.log(err)
          }
        } else {
          try {
            await Lamp.doc(item.id).update({ onScheduler: { status: false, hours: onTime.hours, minutes: onTime.minutes } })
            dispatch(cronOff(item.name + '-on'))
          } catch (err) {
            console.log(err)
          }
        }
      }
      
      
    } else {
      setOffToggle(!offToggle)

      if (!offToggle) {
        try {
          await Lamp.doc(item.id).update({ offScheduler: { status: true, hours: offTime.hours, minutes: offTime.minutes } })
          dispatch(cronOn(offTime.hours, offTime.minutes, item.name + '-off'))
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await Lamp.doc(item.id).update({ offScheduler: { status: false, hours: offTime.hours, minutes: offTime.minutes } })
          dispatch(cronOff(item.name + '-off'))
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  if (isLoading)
    return (
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#fec894" />
      </Container>
    )
  else {
    return (
      <Container>
        {/* <TopPart>
          <Heading style={{ fontFamily: "neo-sans-medium" }}>{item.name}</Heading>

        </TopPart> */}


        <BotPart style={{marginTop: 20}}>
          <Box style={styless.shadow}>
            <OnOffCont>
              <Txt style={{ fontFamily: "neo-sans-medium" }}>On time</Txt>
              <ToggleSwitch
                isOn={onToggle}
                onColor="#fec894"
                offColor="#ecf0f1"
                size="medium"
                onToggle={toggleHandler('on')}
              />
            </OnOffCont>

            <BotCont pointerEvents={onToggle ? 'auto' : 'none'} style={{ backgroundColor: onToggle ? '#f9f9f9' : '#ecf0f1' }}>
              {
                !onToggle ?
                  <ScheduleText style={{ color: 'grey' }}>no schedule, yet.</ScheduleText>
                  :
                  <TimeCont>
                    <TimeText style={{ fontFamily: "neo-sans-medium" }}>{`${onTime.hours}:${onTime.minutes}`}</TimeText>
                    <Btn onPress={BtnHandler('on')}>
                      <Ionicons name='ios-clock' size={50} color="#fec894" />
                    </Btn>
                  </TimeCont>
              }
            </BotCont>
          </Box>

          <Box style={styless.shadow}>
            <OnOffCont>
              <Txt style={{ fontFamily: "neo-sans-medium" }}>Off time</Txt>
              <ToggleSwitch
                isOn={offToggle}
                onColor="#fec894"
                offColor="#ecf0f1"
                size="medium"
                onToggle={toggleHandler('off')}
              />
            </OnOffCont>

            <BotCont  pointerEvents={offToggle ? 'auto' : 'none'} style={{ backgroundColor: offToggle ? '#f9f9f9' : '#ecf0f1' }}>
              {
                !offToggle ?
                  <ScheduleText style={{ color: 'grey' }}>no schedule, yet.</ScheduleText>
                  :
                  <TimeCont>
                    <TimeText style={{ fontFamily: "neo-sans-medium" }}>{`${offTime.hours}:${offTime.minutes}`}</TimeText>
                    <Btn onPress={BtnHandler('off')}>
                      <Ionicons name='ios-clock' size={50} color="#fec894" />
                    </Btn>
                  </TimeCont>
              }
            </BotCont>
          </Box>

          <TimePicker
            isVisible={modal}
            mode="time"
            locale={'en_GB'}
            is24Hour={true}
            onConfirm={data => {
              timeHandler(data.getHours(), data.getMinutes(), timeMode)
              setModal(false)
            }}
            onCancel={() => setModal(false)}
          />
        </BotPart>
        {/* <View style={{ flex: 0.2, alignItems: 'center' }}> */}
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 80,
            }}
            onPress={() => {
              tutup(false)
            }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 60, height: 60,
              borderRadius: 100,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Feather name="x" size={30} color="#383838" />
            </View>
          </TouchableOpacity>
        {/* </View> */}
      </Container>
    )
  }
}

const radius = 20;

const styless = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
}


const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  color: #fec894;
  margin-top: ${Constant.statusBarHeight};
  align-items: center;
`

const TopPart = styled.View`
  flex: 0.7;
  /* border-bottom-left-radius: 30;
  border-bottom-right-radius: 30; */
  background-color: #fec894;
`

const BotPart = styled.View`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 7px;
  
`

const Box = styled.View`
  width: ${screenWidth * 0.4};
  height: ${screenWidth * 0.4};
  margin-right: 15;
`

const OnOffCont = styled.View`
  flex: 0.5;
  background-color: #f9f9f9;
  border-top-left-radius: ${radius};
  border-top-right-radius: ${radius};
  justify-content: space-between;
  padding: 0 20px;
  flex-direction: row;
`
const BotCont = styled.View`
  flex: 0.5;
  background-color: #f9f9f9;
  border-bottom-left-radius: ${radius};
  border-bottom-right-radius: ${radius};
  justify-content: space-between;
  padding: 0 20px;
  flex-direction: row;
  margin-bottom: 10;
  border-style: solid;
  border-top-width: 1px;
  border-color: #ecf0f1;
  justify-content: center;
  align-items: center;
`

const Heading = styled.Text`
  font-size: 35;
  color: #000;
  margin-bottom: 50;
`

const Txt = styled.Text`
  color: #fec894;
  line-height: 100;
`

const ScheduleText = styled.Text`
  color: silver;
`

const TimeCont = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const TimeText = styled.Text`
  font-size: 20;
`

const Btn = styled.TouchableOpacity``