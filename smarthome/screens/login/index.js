import React,{useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from 'react-native'
import {useDispatch} from 'react-redux'
import welcome from '../../assets/rumah_baru.png'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import {Form, Item, Label, Input,Button,Icon} from 'native-base'
import {register, signin} from '../../store/action'
import back from '../../assets/backlogin.png'
import { useSelector } from 'react-redux'

export default (props) => {
    const dispatch = useDispatch()
    const mysuccess = useSelector(state => state.user.success)
    const [fontLoaded, setFont] = useState(false)
    const [emailLogin, setLogin] = useState('')
    const [passwordLogin, setPassL] = useState('')
    const [emailRegister, setRegister] = useState('')
    const [passwordRegister, setPassR] = useState('')
    const [nameRegister, setName] = useState('')

    // const handleRegister = () => {
    //     let data = {
    //         email: emailRegister,
    //         password: passwordRegister,
    //         name: nameRegister
    //     }
    //     dispatch(register(data))
    //     setRegister('')
    //     setPassR('')
    //     setName('')
    // }
    useEffect(()=>{
        if(mysuccess){
            props.navigation.navigate('App')
            setLogin('')
            setPassL('')
        }
    },[mysuccess])
    const handleLogin = async () => {
        let data = {
            email: emailLogin,
            password: passwordLogin,
        }
        await dispatch(signin(data))
    }

    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])

  return (
    // <View style={styles.container}>
    <ImageBackground source={back} style={{width:"100%", height:"100%"}}>
        <View style={styles.top}>
         <Image source={welcome} style={{width:300, height:300, resizeMode:"contain"}}></Image>
        {
            fontLoaded? <Text style={{fontFamily:"neo-sans-medium", fontSize:35, position: 'absolute', bottom: 20}}>Login</Text>:null
        } 
        </View>
        <View style={styles.mid}>
            {
                fontLoaded?<>
            {/* <View style={styles.wrap}> */}
                <View style={styles.wrap}>
                    <Form style={{alignItems:"center"}}>
                        <Item floatingLabel>
                            <Label style={{fontFamily:"neo-sans-medium"}}>Email</Label>
                            <Input onChangeText={(text)=>{setLogin(text)}}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{fontFamily:"neo-sans-medium"}}>Password</Label>
                            <Input secureTextEntry={true} onChangeText={(text)=>{setPassL(text)}}/>
                        </Item>
                    </Form>
                    <TouchableOpacity style={styles.buttons} onPress={()=>{handleLogin()}}>
                        <Text style={{fontFamily:"neo-sans-medium", color:"white"}}>Login</Text>
                    </TouchableOpacity>
                </View>
          {/* </View> */}
                </>:null
            }

        </View>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:Constants.statusBarHeight
    },
    top: {
        height:300,
        alignItems:"center",
    },
    mid: {
        height: 300,
        alignItems:"center",
    },
    wrap:{
        width:"80%",
        alignItems:"center",
    },
    buttons: {
        alignItems:"center",
        backgroundColor:"#fec894",
        width: 75,
        padding: 5,
        marginTop:40, 
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})