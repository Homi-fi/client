import React,{useEffect, useState} from 'react'
import {StatusBar, View, TouchableOpacity, Dimensions, Text, ImageBackground, Modal} from 'react-native'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import Days from './days'
import Night from './nights'
const screenWidth = Math.round(Dimensions.get('window').width);

export default (props) => {
  const [fontLoaded, setFont] = useState(false)
  const [dayModal, setDayModal] = useState(false)
  const [nightModal, setNightModal] = useState(false)

  useEffect(()=>{
    Font.loadAsync({
      'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
    }).then(()=>{
      setFont(true)
    })
  },[])

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground resizeMode={'cover'} source={{uri:'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80'}} style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: Constants.statusBarHeight, flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> {
            // props.navigation.navigate('Setting', { page: 'Days' })
            setDayModal(true)
          }}>
            <ImageBackground source={require('../../assets/sun.jpg')} style={[styles.menu, {marginRight: 20,}]}   imageStyle={{ borderRadius: 10 }}>
              <Text style={styles.text}>Days</Text>
            </ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> {

            // props.navigation.navigate('Setting', { page: 'Nights' })
            setNightModal(true)
          }}>
            <ImageBackground source={require('../../assets/night.png')} style={styles.menu} imageStyle={{ borderRadius: 10 }}>
              <Text style={styles.text}>Nights</Text>
            </ImageBackground>       
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={false}
        visible={dayModal}
      >
        <Days modal={setDayModal} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={nightModal}
      >
        <Night modal={setNightModal} />
      </Modal>
    </>
  )
}

const styles = {
  menu: {
    width: screenWidth*0.4,
    height: screenWidth*0.5,
    borderRadius: 15,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    color: 'white',
    fontFamily:"neo-sans-medium"
  }
}
