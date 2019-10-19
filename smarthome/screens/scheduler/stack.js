import React from 'react'
import Days from './days'
import Nights from './nights'
import Other from './other'
const Stack = (props) => {
    const page = props.navigation.getParam('page', null)

    if(page == "Days"){
        return <Days />
    }else if(page == 'Nights'){
        return <Nights />
    }
    // else return <Other /> 
}

Stack.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('page'),
    headerStyle: {
        backgroundColor: '#f9f9f9',
    },
    headerBackTitleStyle: {
        color: '#fec894'
    },
    headerTintColor: '#fec894'
})
export default Stack