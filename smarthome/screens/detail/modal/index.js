import React, { useState } from 'react'
import styled from 'styled-components'
import Constant from 'expo-constants'

import TimePicker from 'react-native-modal-datetime-picker'
import ToggleSwitch from 'toggle-switch-react-native'

import { Ionicons } from '@expo/vector-icons'

export default () => {
  const [modal, setModal] = useState(false)
  const [time, setTime] = useState({ hours: null, minutes: null })
  const [schedules, setSchedules] = useState([])

  const [onToggle, setOnToggle] = useState(false)
  const [offToggle, setOffToggle] = useState(false)

  const addScheduler = (hour, minute) => {
    console.log(hour, minute)
  }

  const toggleHandler = (params) => async () => {
    if (params === 'on') {
      setOnToggle(!onToggle)
    } else {
      setOffToggle(!offToggle)
    }
  }

  return (
    <Container>
      <TopPart>
        <Heading>Lampu</Heading>
      </TopPart>


      <BotPart>
        <OnOffCont>
          <Txt>On time</Txt>
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
              <Txt style={{ color: 'grey' }}>You still haven't set a schedule</Txt>
              :
              <Btn onPress={() => setModal(true)}>
                <Ionicons name='ios-clock' size={50} color="#fec894" />
              </Btn>
          }

        </BotCont>

        <OnOffCont>
          <Txt>Off time</Txt>
          <ToggleSwitch
            isOn={offToggle}
            onColor="#fec894"
            offColor="#ecf0f1"
            size="medium"
            onToggle={toggleHandler('off')}
          />
        </OnOffCont>
        <BotCont>

        </BotCont>

        <TimePicker
          isVisible={modal}
          mode="time"
          locale={'en_GB'}
          is24Hour={true}
          onConfirm={data => {
            setTime({
              hours: data.getHours(),
              minutes: data.getMinutes()
            })
            addScheduler(data.getHours(), data.getMinutes())
            setModal(false)
          }}
          onCancel={() => setModal(false)}
        />
      </BotPart>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  color: #fec894;
  margin-top: ${Constant.statusBarHeight};
`

const TopPart = styled.View`
  flex: 0.5;
  border-bottom-left-radius: 30;
  border-bottom-right-radius: 30;
  background-color: #fec894;
`

const BotPart = styled.View`
  flex: 0.5;
`

const OnOffCont = styled.View`
  height: 50;
  background-color: #f9f9f9;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  elevation: 5;
  justify-content: space-between;
  padding: 0 20px;
  flex-direction: row;
`
const BotCont = styled.View`
  height: 50;
  background-color: #f9f9f9;
  border-bottom-left-radius: 30;
  border-bottom-right-radius: 30;
  elevation: 5;
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
  font-weight: 600;
`

const Txt = styled.Text``

const Btn = styled.TouchableOpacity``