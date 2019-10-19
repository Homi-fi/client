import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ToggleSwitch from 'toggle-switch-react-native'
import { Lamp } from '../../../apis/firebase'

export default (props) => {
  const { item } = props

  const [isOn, setIsOn] = useState(false)

  const toggleHandler = async () => {
    setIsOn(!isOn)
  }

  const pressHandler = async () => {
    try {
      await Lamp.doc('krTjlLxFeeXiqPNRioL8').update({ status: false })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <ItemName>{item.name}</ItemName>
      <ToggleSwitch
        isOn={isOn}
        onColor="#fec894"
        offColor="#ecf0f1"
        size="medium"
        onToggle={toggleHandler}
      />
    </Container>
  )
}

const Container = styled.View`
  height: 50;
  width: 100%;
  background-color: #fff;
  border-radius: 30;
  elevation: 3;
  justify-content: space-between;
  padding: 0 20px;
  flex-direction: row;
  margin-bottom: 10;
`

const ItemName = styled.Text`
  font-size: 20;
  line-height: 50;
`