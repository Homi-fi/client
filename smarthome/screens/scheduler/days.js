import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import {Lamp} from '../../apis/firebase'
import ToggleSwitch from 'toggle-switch-react-native'
const screenWidth = Math.round(Dimensions.get('window').width);


export default (props) => {
    const [lamps, setLamps] = useState([])
    const [loading, setLoading] = useState(true)
    let unsubscribe = null

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
        Lamp.doc(id).update({day: val})
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    } 
    const changeDayAuto = (id, val) => {
        Lamp.doc(id).update({ dayAuto: val })
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
            <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
                <View style={{marginTop: Constants.statusBarHeight, flex: 1, alignItems: 'center', width: '100%'}}>
                    {
                        loading ? <ActivityIndicator size="small" color="#e8d296"/> :
                        <>
                            {
                                lamps.map(lamp => {
                                    let shadow = null
                                    let labelAuto = ""
                                    lamp.dayAuto ? labelAuto = "Auto on" : labelAuto = "Auto off"
                                    lamp.status ? shadow = "#fec894" : shadow = '#000'
                                    
                                    return (
                                        <TouchableOpacity key={lamp.id} onPress={() => {
                                                changeDayAuto(lamp.id, !lamp.dayAuto)
                                            }
                                        }>
                                            <View style={[styles.menu, {shadowColor: shadow}]}>
                                                <Text style={styles.text}>{lamp.name}</Text>
                                                <ToggleSwitch
                                                    label={labelAuto}
                                                    isOn={lamp.day}
                                                    labelStyle={{color: 'silver'}}
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
                                <Text style={{color: 'silver', textAlign: 'center'}}>When the sun rises. All the selected devices will be turned on or off</Text>
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
        backgroundColor: 'white',
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
      color: '#383838'
    }
}