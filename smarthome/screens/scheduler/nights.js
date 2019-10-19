import React, {useState} from 'react'
import {View, Text, StatusBar} from 'react-native'
import Constants from 'expo-constants';
import Device from './device'


export default (props) => {
    const [on, setON] = useState(false)

    const data1 = {
        status: on,
        name: 'lamp1',
    }
    const data2 = {
        status: on,
        name: 'lamp2',
    }
    const data3 = {
        status: on,
        name: 'door',
    }
    const data4 = {
        status: on,
        name: 'heater',
    }

    const toggleDevice = (status) => {
        setON(status)
    }
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
                <View style={{marginTop: Constants.statusBarHeight, flex: 1, alignItems: 'center', width: '100%'}}>
                    <Device data={data1} toggle={toggleDevice} />
                    <Device data={data2} toggle={toggleDevice} />
                    <Device data={data3} toggle={toggleDevice} />
                    <Device data={data4} toggle={toggleDevice} />
                    <View style={{padding: 30}}>
                        <Text style={{color: 'silver', textAlign: 'center'}}>When the sun sets. All the selected devices will be turned on</Text>
                    </View>
                </View>
            </View>
        </>
    )
}


  