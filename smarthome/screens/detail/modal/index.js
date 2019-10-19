import React, { useState } from 'react'
import styled from 'styled-components'
import Constant from 'expo-constants'

import TimePicker from 'react-native-modal-datetime-picker'

export default () => {
  const [modal, setModal] = useState(false)
  const [time, setTime] = useState({ hours: null, minutes: null })
  const [schedules, setSchedules] = useState([])

  const addScheduler = (hour, minute) => {
    console.log(hour, minute)
  }

  console.log(time)

  return (
    <Container>
      <Heading>Lampu</Heading>
      <Txt>On time</Txt>
      <Txt>Off time</Txt>
      <Btn onPress={() => setModal(true)} />

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
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  color: #fec894;
  margin-top: ${Constant.statusBarHeight};
`

const Heading = styled.Text`
  font-size: 35;
  color: #000;
  margin-bottom: 50;
  font-weight: 600;
`

const Txt = styled.Text``

const Btn = styled.TouchableOpacity`
  width: 150;
  height: 50;
  background-color: red;
`