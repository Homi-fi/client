import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as Font from 'expo-font'
import Constant from 'expo-constants'
import Item from './item'


export default () => {
  const [fontLoaded, setFont] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({ 'neo-sans-medium': require('../../assets/NeoSansMedium.otf'), })
        setFont(true)
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
        {
          data.length > 0 && data.map((item, i) => {
            return <Item item={item} key={i} />
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


