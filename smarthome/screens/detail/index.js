import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Lamp, Room } from '../../apis/firebase'
import { StatusBar, ActivityIndicator } from 'react-native'
import Item from './item'

export default (props) => {
  const { navigation } = props
  const { navigation: { state: { params: { roomId } } } } = props
  const [lamps, setLamps] = useState([])
  const [roomName, setRoomName] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        await Lamp.where('roomId', '==', roomId).onSnapshot((querySnapshot) => {
          const lamps = []
          querySnapshot.forEach((doc) => {
            lamps.push({ id: doc.id, ...doc.data() })
          })
          setLamps(lamps)
        })

        await Room.doc(roomId).get().then(doc => {
          setRoomName(doc.data().name)
        })
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const data = [{ name: 'Lampu 1', status: false }, { name: 'Lampu 2', status: true }]
  const image = {
    Bedroom: 'https://images.unsplash.com/photo-1536349788264-1b816db3cc13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80',
    'Living Room': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
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
        <StatusBar backgroundColor="#fec894" barStyle="dark-content" />
        <HeadingCont>
          <Heading style={{ fontFamily: "neo-sans-medium" }}>{roomName}</Heading>
          <Img source={{ uri: image[roomName] }} />
        </HeadingCont>
        <ListCont>
          {
            lamps.length > 0 ?
              lamps.map((item, i) => {
                return <Item item={item} navigation={navigation} key={i} />
              })
              :
              (
                <Cont>
                  <Txt>There's no item to shown</Txt>
                </Cont>
              )
          }
        </ListCont>
      </Container>
    )
  }
}


const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`

const Cont = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 40;
`

const ListCont = styled.View`
  flex: 0.7;
  padding: 30px;
  background-color: #f9f9f9;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  margin-top: -60;
`
const Img = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  resize-mode: cover;
  z-index: -1;
`

const Txt = styled.Text`
  font-size: 16;
  color: silver;
`