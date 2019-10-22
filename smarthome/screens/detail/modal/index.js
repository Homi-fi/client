import React, { useState } from 'react'
import styled from 'styled-components'
import Constant from 'expo-constants'
import { Dimensions, Alert, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

import TimePicker from 'react-native-modal-datetime-picker'
import ToggleSwitch from 'toggle-switch-react-native'

import { Ionicons } from '@expo/vector-icons'

import { useDispatch } from 'react-redux'
import { cronOn, cronOff } from '../../../store/action'
import { Lamp } from '../../../apis/firebase'

const screenWidth = Math.round(Dimensions.get('window').width);

export default (props) => {
  const { item, tutup } = props

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [timeMode, setTimeMode] = useState('on')

  const BtnHandler = mode => () => {
    setTimeMode(mode)
    setModal(true)
  }

  const timeHandler = async (hours, minutes, status) => {
    const inputHours = hours < 10 ? `0${hours}` : (hours + '')
    const inputMinutes = minutes < 10 ? `0${minutes}` : (minutes + '')
    if (status === 'on') {
      try {
        await Lamp.doc(item.id).update({ onScheduler: { status: true, hours: inputHours, minutes: inputMinutes } })
        dispatch(cronOn(inputHours, inputMinutes, item.name + '-on'))
      } catch (err) {
        console.log(err)
      }
    } else {
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
      if (item.day || item.night) {
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
                if (!item.onScheduler.status) {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, onScheduler: { status: true, hours: item.onScheduler.hours, minutes: item.onScheduler.minutes } })
                    dispatch(cronOn(item.onScheduler.hours, item.onScheduler.minutes, item.name + '-on'))
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, onScheduler: { status: false, hours: item.onScheduler.hours, minutes: item.onScheduler.minutes } })
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
      } else {
        if (!item.onScheduler.status) {
          try {
            await Lamp.doc(item.id).update({ onScheduler: { status: true, hours: item.onScheduler.hours, minutes: item.onScheduler.minutes } })
            dispatch(cronOn(item.onScheduler.hours, item.onScheduler.minutes, item.name + '-on'))
          } catch (err) {
            console.log(err)
          }
        } else {
          try {
            await Lamp.doc(item.id).update({ onScheduler: { status: false, hours: item.onScheduler.hours, minutes: item.onScheduler.minutes } })
            dispatch(cronOff(item.name + '-on'))
          } catch (err) {
            console.log(err)
          }
        }
      }

    } else {
      if (item.day || item.night) {
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
                if (!item.offScheduler.status) {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, offScheduler: { status: true, hours: item.offScheduler.hours, minutes: item.offScheduler.minutes } })
                    dispatch(cronOn(item.offScheduler.hours, item.offScheduler.minutes, item.name + '-on'))
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                  try {
                    await Lamp.doc(item.id).update({ day: false, night: false, offScheduler: { status: false, hours: item.offScheduler.hours, minutes: item.offScheduler.minutes } })
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
      } else {
        if (!item.offScheduler.status) {
          try {
            await Lamp.doc(item.id).update({ offScheduler: { status: true, hours: item.offScheduler.hours, minutes: item.offScheduler.minutes } })
            dispatch(cronOn(item.offScheduler.hours, item.offScheduler.minutes, item.name + '-off'))
          } catch (err) {
            console.log(err)
          }
        } else {
          try {
            await Lamp.doc(item.id).update({ offScheduler: { status: false, hours: item.offScheduler.hours, minutes: item.offScheduler.minutes } })
            dispatch(cronOff(item.name + '-off'))
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }

  return (
    <Container>
      <BotPart style={{ marginTop: 20 }}>
        <Box style={styless.shadow}>
          <OnOffCont>
            <Txt style={{ fontFamily: "neo-sans-medium" }}>On time</Txt>
            <ToggleSwitch
              isOn={item.onScheduler.status}
              onColor="#fec894"
              offColor="#ecf0f1"
              size="medium"
              onToggle={toggleHandler('on')}
            />
          </OnOffCont>

          <BotCont pointerEvents={item.onScheduler.status ? 'auto' : 'none'} style={{ backgroundColor: item.onScheduler.status ? '#f9f9f9' : '#ecf0f1' }}>
            {
              !item.onScheduler.status ?
                <ScheduleText style={{ color: 'grey' }}>no schedule, yet.</ScheduleText>
                :
                <TimeCont>
                  <TimeText style={{ fontFamily: "neo-sans-medium" }}>{`${item.onScheduler.hours}:${item.onScheduler.minutes}`}</TimeText>
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
              isOn={item.offScheduler.status}
              onColor="#fec894"
              offColor="#ecf0f1"
              size="medium"
              onToggle={toggleHandler('off')}
            />
          </OnOffCont>

          <BotCont pointerEvents={item.offScheduler.status ? 'auto' : 'none'} style={{ backgroundColor: item.offScheduler.status ? '#f9f9f9' : '#ecf0f1' }}>
            {
              !item.offScheduler.status ?
                <ScheduleText style={{ color: 'grey' }}>no schedule, yet.</ScheduleText>
                :
                <TimeCont>
                  <TimeText style={{ fontFamily: "neo-sans-medium" }}>{`${item.offScheduler.hours}:${item.offScheduler.minutes}`}</TimeText>
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
          onConfirm={data => {
            timeHandler(data.getHours(), data.getMinutes(), timeMode)
            setModal(false)
          }}
          onCancel={() => setModal(false)}
        />
      </BotPart>
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
    </Container>
  )
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
  justify-content: space-between;
  width: 88%;
  
`

const Box = styled.View`
  width: ${screenWidth * 0.4};
  height: ${screenWidth * 0.4};
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