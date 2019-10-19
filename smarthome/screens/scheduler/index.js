import React from 'react'
import {StatusBar, View, TouchableOpacity, Dimensions, Text} from 'react-native'
import Constants from 'expo-constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (props) => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
        <View style={{marginTop: Constants.statusBarHeight, flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Days' })}>
            <View style={styles.menu}>
              <Text style={styles.text}>Days</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Nights' })}>
            <View style={styles.menu}>
              <Text style={styles.text}>Nights</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> props.navigation.navigate('Setting', { page: 'Other' })}>
            <View style={styles.menu}>
              <Text style={styles.text}>Other routines</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#e8d296',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    color: 'white'
  }
}
