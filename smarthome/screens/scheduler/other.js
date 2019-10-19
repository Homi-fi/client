import React from 'react'
import {View, Text, StatusBar} from 'react-native'
import Constants from 'expo-constants';

export default (props) => {
    
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
                <View style={{marginTop: Constants.statusBarHeight, flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <View style={{padding: 30}}>
                        <Text style={{color: 'silver', textAlign: 'center'}}>All the selected devices will be turned on automatically</Text>
                    </View>
                </View>
            </View>
        </>
    )
}