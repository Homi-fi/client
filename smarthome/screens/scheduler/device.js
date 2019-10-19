import React, {useState} from 'react'
import { View, Text, Dimensions} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (props) => {
    const data = props.data
    const toggle = props.toggle 
    return (
        <View style={styles.menu}>
            <Text style={styles.text}>{data.name}</Text>
            <ToggleSwitch
                isOn={data.status}
                onColor="green"
                offColor="#dbdbdb"
                size="medium"
                onToggle={isOn => toggle(isOn)}
            />
        </View>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20
    },
    text: {
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: 2,
      color: 'white'
    }
}