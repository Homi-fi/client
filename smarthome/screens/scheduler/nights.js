import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import {Lamp} from '../../apis/firebase'
import ToggleSwitch from 'toggle-switch-react-native'
import {db} from '../../configs/firebase'
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default (props) => {
    const modal = props.modal
    const [fontLoaded, setFont] = useState(false)
    const lamps = props.lamps

    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])


    const changeDay = (id, val) => { 
        Lamp.doc(id).update({night: val})
        .then(function() {
            // console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    } 
    const changeDayAuto = (id, val) => {
        // console.log(id, val,'<<<<<<<<<<')
        Lamp.doc(id).update({ nightAuto: val })
        .then(function() {
            // console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <View style={{flex: 1, backgroundColor: '#09021c'}}>
                <View style={{marginTop: Constants.statusBarHeight + (screenHeight*0.07), flex: 1, alignItems: 'center', width: '100%'}}>
                    {
                        lamps.map(lamp => {
                            let shadow = null
                            let labelAuto = ""
                            lamp.nightAuto ? labelAuto = "Auto on" : labelAuto = "Auto off"
                            lamp.status ? shadow = "#fec894" : shadow = 'white'
                            
                            return (
                                <TouchableOpacity key={lamp.id} onPress={() => {
                                        changeDayAuto(lamp.id, !lamp.nightAuto)
                                    }
                                }>
                                    <View  style={[styles.menu, {shadowColor: shadow}]}>
                                        <Text style={styles.text}>{lamp.name}</Text>
                                        <ToggleSwitch
                                            label={labelAuto}
                                            isOn={lamp.night}
                                            labelStyle={{color: 'silver',fontFamily:"neo-sans-medium"}}
                                            onColor="#fec894"
                                            offColor="#ecf0f1"
                                            size="medium"
                                            onToggle={isOn => changeDay(lamp.id, isOn)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={{padding: 30}}>
                        <Text style={{color: 'silver', textAlign: 'center'}}>When the sun sets. All the selected devices will be turned on or off</Text>
                    </View>
                
                    <TouchableOpacity style={{
                        position: "absolute",
                        bottom: 80,}} 
                        onPress={()=>modal(false)}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:60, height: 60, 
                            borderRadius: 100, 
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,}}>
                            <Feather name="x" size={30} color="#383838" />
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
        backgroundColor: '#919191',
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: 2,
      color: '#f4f4f4',
      fontFamily:"neo-sans-medium"
    }
}