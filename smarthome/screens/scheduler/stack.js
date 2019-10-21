// import React from 'react'
// import Days from './days'
// import Nights from './nights'
// import Other from './other'
// const Stack = (props) => {
//     const page = props.navigation.getParam('page', null)

//     if(page == "Days"){
//         return <Days />
//     }else if(page == 'Nights'){
//         return <Nights />
//     }
//     // else return <Other /> 
// }

// Stack.navigationOptions = ({navigation}) => ({
//     title: navigation.getParam('page'),
//     headerStyle: {
//         backgroundColor: navigation.getParam('page') == "Days" ? '#f9f9f9' : "#070707" ,
//     },
//     headerBackTitleStyle: {
//         color: navigation.getParam('page') == "Days" ? '#fec894' : "#f4f4f4"
//     },
//     headerTintColor: navigation.getParam('page') == "Days" ? '#fec894' : "#f4f4f4"
// })
// export default Stack
