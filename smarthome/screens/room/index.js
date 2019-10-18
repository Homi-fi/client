import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'

function Room(){
    const [fontLoaded, setFont] = useState(false)
    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])

    return(
        <View style={styles.container}>
            <View style={styles.upBox}>
                <Text>Hello, Ronaldo! </Text>
                <Text>What are you up to?</Text>
            </View>
            <View style={styles.rooms}>
               <TouchableOpacity>
                <Text>Living Room</Text>
               </TouchableOpacity>
               <TouchableOpacity>
                <Text>Living Room</Text>
               </TouchableOpacity>
               <TouchableOpacity>
                <Text>Living Room</Text> 
               </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#f9f9f9"
    },
    upBox: {
        height: "20%",
        backgroundColor:"blue"
    },
    rooms: {
        height: "50%"
    }
})

export default Room