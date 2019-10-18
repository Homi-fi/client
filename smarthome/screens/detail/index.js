import React from 'react'
import styled from 'styled-components'
import { Lamp } from '../../apis/firebase'

export default () => {
  const pressHandler = () => {

  }

  return (
    <Container>
      <Btn>
        <Heading>Hello</Heading>
      </Btn>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Heading = styled.Text`
  font-size: 20;
`

const Btn = styled.TouchableOpacity`
  width: 150;
  height: 50;
  background-color: yellow;
  border-radius: 10;
`