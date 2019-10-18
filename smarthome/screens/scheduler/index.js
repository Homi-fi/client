import React from 'react'
import {View, StatusBar} from 'react-native'

export default  (props) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={{flex: 0.5, backgroundColor: '#f9f9f9'}}>

            </View>
        </>
    )
}