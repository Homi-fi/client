import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Lamp } from '../../apis/firebase'
import * as Font from 'expo-font'
import Constant from 'expo-constants'
import Item from './item'

// import * as Permissions from 'expo-permissions'
// import { BarCodeScanner } from 'expo-barcode-scanner'

export default (props) => {
  const { navigation } = props
  const [fontLoaded, setFont] = useState(false)
  const [lamps, setLamps] = useState([])


  // barcode

  // const [hasCameraPermission, setCameraPermission] = useState(null)
  // const [scanned, setScanned] = useState(false)

  // const getPermissionsAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA)
  //   setCameraPermission({ hasCameraPermission: status === 'granted' })
  // }

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // }

  // useEffect(() => {
  //   getPermissionsAsync()
  // }, [])

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({ 'neo-sans-medium': require('../../assets/NeoSansMedium.otf') })
        setFont(true)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        await Lamp.where('userId', '==', '123').onSnapshot((querySnapshot) => {
          const lamps = []
          querySnapshot.forEach((doc) => {
            lamps.push({ id: doc.id, ...doc.data() })
          })
          setLamps(lamps)
        })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const data = [{ name: 'Lampu 1', status: false }, { name: 'Lampu 2', status: true }]

  return (
    <Container>
      <HeadingCont>
        <Heading>Living Room</Heading>
      </HeadingCont>
      <ListCont>
        {/* <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ height: 500, backgroundColor: 'red' }} /> */}
        {
          lamps.length > 0 && lamps.map((item, i) => {
            return <Item item={item} navigation={navigation} key={i} />
          })
        }
      </ListCont>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  color: #fec894;
  margin-top: ${Constant.statusBarHeight};
`

const HeadingCont = styled.View`
  flex: 0.3;
  background-color: #fec894;
  border-bottom-left-radius: 30;
  border-bottom-right-radius: 30;
  justify-content: center;
  align-items: center;
`

const Heading = styled.Text`
  font-size: 35;
  color: #fff;
  margin-bottom: 50;
  font-weight: 600;
`

const ListCont = styled.View`
  flex: 0.7;
  padding: 30px;
  background-color: #f9f9f9;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  margin-top: -60;
`


