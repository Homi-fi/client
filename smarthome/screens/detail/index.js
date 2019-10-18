import React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Heading>Hello</Heading>
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