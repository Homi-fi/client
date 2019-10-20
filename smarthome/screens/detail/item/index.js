import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ToggleSwitch from 'toggle-switch-react-native'
import { Lamp } from '../../../apis/firebase'
import {Alert} from 'react-native'

export default (props) => {
  const { item, navigation } = props

  const [isOn, setIsOn] = useState(item.status)

  const toggleHandler = async () => {
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
          {text: 'OK', onPress: async () => {
            try {
              await Lamp.doc(item.id).update({ day: false, night: false, status: !isOn })
              setIsOn(!isOn)
            } catch (err) {
              console.log(err)
            }
          }},
        ],
        {cancelable: false},
        );
      }
      else{
        setIsOn(!isOn)
        try {
          await Lamp.doc(item.id).update({ status: !isOn })
        } catch (err) {
          console.log(err)
        }
      }
  }

  const modalHandler = () => {
    navigation.navigate('Modal', { item: item })
  }

  return (
    <Container onPress={modalHandler}>
      <ItemName style={{ fontFamily: "neo-sans-medium" }}>{item.name}</ItemName>
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

const Container = styled.TouchableOpacity`
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