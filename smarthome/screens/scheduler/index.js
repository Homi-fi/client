import React,{useEffect, useState} from 'react'
import {StatusBar, View, TouchableOpacity, Dimensions, Text, ImageBackground} from 'react-native'
import Constants from 'expo-constants';
import * as Font from 'expo-font';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (props) => {
  const [fontLoaded, setFont] = useState(false)

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
      <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
        <View style={{marginTop: Constants.statusBarHeight, flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Days' })}>
            <ImageBackground source={require('../../assets/sun.jpg')} style={styles.menu}  imageStyle={{ borderRadius: 10 }}>
              <Text style={styles.text}>Days</Text>
            </ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Nights' })}>
            <ImageBackground source={require('../../assets/night.png')} style={styles.menu} imageStyle={{ borderRadius: 10 }}>
              <Text style={styles.text}>Nights</Text>
            </ImageBackground>       
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Other' })}>
            <View style={styles.menu}>
              <Text style={styles.text}>Other routines</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  )
}

const styles = {
  menu: {
    width: screenWidth*0.9,
    height: 80,
    borderRadius: 15,
    marginBottom: 30,
    justifyContent: 'center',
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
