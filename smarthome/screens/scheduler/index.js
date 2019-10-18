import React from 'react'
<<<<<<< HEAD
import {View, StatusBar} from 'react-native'

export default  (props) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={{flex: 0.5, backgroundColor: '#f9f9f9'}}>

            </View>
        </>
    )
}
=======
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
>>>>>>> development
