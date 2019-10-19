import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar, TouchableOpacity, Dimensions} from 'react-native'
import Constants from 'expo-constants';
import DateTimePicker from "react-native-modal-datetime-picker";
import {  FontAwesome } from '@expo/vector-icons';
import { Scheduler } from '../../apis/firebase'
import {db} from '../../configs/firebase'
import ToggleSwitch from 'toggle-switch-react-native'

const screenWidth = Math.round(Dimensions.get('window').width);

export default (props) => {
    const [modal, setModal] = useState(false)
    const [time, setTime] = useState(null)
    const [schedules, setSchedules] = useState([])
    
    const addScheduler = (hour, minute) => {
        db.collection('schedulers').add({
            userId: '123',
            hour,
            minute,     
            isAuto: false
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    const changeIsAuto = (id, val ) => {
        db.collection('schedulers').doc(id).update({isAuto: val})
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    let unsubscribe = null
    const fetchScheduler = () => {
        unsubscribe = db.collection('schedulers').where("userId", "==", "123")
        .onSnapshot(function(querySnapshot) {
            const newScheduler = []
            querySnapshot.forEach(function(doc) {
                newScheduler.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setSchedules(newScheduler)
        });
    }

    useEffect(() => {
        return () => {
          unsubscribe()
        };
      }, []);
    useEffect(() => {
        fetchScheduler()
    },[])

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <DateTimePicker
                isVisible={modal}
                mode="time"
                locale={'id_ID'}
                onConfirm={data => {
                    setTime(data)
                    addScheduler(data.getHours(), data.getMinutes())
                    setModal(false)
                }}
                onCancel={()=> setModal(false)}
            />
            <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
                <View style={{marginTop: Constants.statusBarHeight, flex: 1, alignItems: 'center', width: '100%'}}>
                    {
                        schedules.map(schedule => {
                            let shadow = null
                            let labelAuto = "Auto on"
                            schedule.isAuto ? shadow = "#c18501" : shadow = '#000'
                            console.log(schedule.hour, schedule.minute)
                            return (
                                <TouchableOpacity key={schedule.id}>
                                    <View  style={[styles.menu, {shadowColor: shadow}]}>
                                        <Text style={styles.text}>{schedule.hour} : {schedule.minute}</Text>
                                        <ToggleSwitch
                                            label={labelAuto}
                                            isOn={schedule.isAuto}
                                            labelStyle={{color: 'silver'}}
                                            onColor="#e8d296"
                                            offColor="#dbdbdb"
                                            size="medium"
                                            onToggle={isOn => changeIsAuto(schedule.id, isOn)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={{padding: 30}}>
                        <Text style={{color: 'silver', textAlign: 'center'}}>All the selected devices will be turned on automatically</Text>
                    </View>

                    <TouchableOpacity style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,}} 
                        onPress={()=>setModal(true)}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:60, height: 60, 
                            borderRadius: '100', 
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,}}>
                            <FontAwesome name="plus" size={30} color="#383838" />
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