import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import {Lamp} from '../../apis/firebase'
import ToggleSwitch from 'toggle-switch-react-native'
import {db} from '../../configs/firebase'
import * as Font from 'expo-font';
const screenWidth = Math.round(Dimensions.get('window').width);


export default (props) => {
    const [fontLoaded, setFont] = useState(false)
    const [lamps, setLamps] = useState([])
    const [loading, setLoading] = useState(true)
    let unsubscribe = null

    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])

    const fetchLamp = () => {
        unsubscribe = Lamp.where("userId", "==", "123")
        .onSnapshot(function(querySnapshot) {
            const newLamps = []
            querySnapshot.forEach(function(doc) {
                newLamps.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setLamps(newLamps)
            setLoading(false)
        });
    }

    const changeDay = (id, val) => { 
        Lamp.doc(id).update({night: val})
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    } 
    const changeDayAuto = (id, val) => {
        console.log(id, val,'<<<<<<<<<<')
        Lamp.doc(id).update({ nightAuto: val })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    useEffect(() => {
        return () => {
          unsubscribe()
        };
      }, []);
    useEffect(() => {
        fetchLamp()
    },[])
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View style={{marginTop: Constants.statusBarHeight, flex: 1, alignItems: 'center', width: '100%'}}>
                    {
                        loading ? <ActivityIndicator size="small" color="#e8d296"/> :
                        <>
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
                        </>
                    }                   
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