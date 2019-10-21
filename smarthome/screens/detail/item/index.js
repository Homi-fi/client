import React, { useState } from 'react'
import styled from 'styled-components'
import ToggleSwitch from 'toggle-switch-react-native'
import { Lamp } from '../../../apis/firebase'
import { Alert, Modal } from 'react-native'
import ModalItem from '../modal'

export default (props) => {
  const { item, navigation } = props
  // const [isOn, setIsOn] = useState(item.status)
  const [modal, setModal] = useState(false)

  // console.log(item, 'ini item cuy')

  const toggleHandler = async () => {
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
              try {
                await Lamp.doc(item.id).update({ day: false, night: false, status: !item.status })
                // setIsOn(!isOn)
              } catch (err) {
                console.log(err)
              }
            }
          },
        ],
        { cancelable: false },
      );
    }
    else {
      // setIsOn(!isOn)
      try {
        await Lamp.doc(item.id).update({ status: !item.status })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const modalHandler = () => {
    // navigation.navigate('Modal', { item: item })
    setModal(true)
  }

  return (
    <>
      <Container onPress={modalHandler}>
        <ItemName style={{ fontFamily: "neo-sans-medium" }}>{item.name}</ItemName>
        <ToggleSwitch
          isOn={item.status}
          onColor="#fec894"
          offColor="#ecf0f1"
          size="medium"
          onToggle={toggleHandler}
        />
      </Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
      >
        {/* <Days lamps={lamps} modal={setDayModal} /> */}
        <ModalItem item={item} tutup={setModal}/>
      </Modal>
    </>
  )
}

const Container = styled.TouchableOpacity`
  height: 80;
  width: 100%;
  background-color: #fff;
  border-radius: 15;
  elevation: 3;
  justify-content: space-between;
  padding: 0 20px;
  flex-direction: row;
  margin-bottom: 10;
`

const ItemName = styled.Text`
  font-size: 20;
  line-height: 80;
`