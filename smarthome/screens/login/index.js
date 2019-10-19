import React,{useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useDispatch} from 'react-redux'
import welcome from '../../assets/rumah_baru.png'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import {Form, Item, Label, Input,Button,Icon} from 'native-base'
import {register, signin} from '../../store/action'

export default () => {
    const dispatch = useDispatch()
    const [fontLoaded, setFont] = useState(false)
    const [emailLogin, setLogin] = useState('')
    const [passwordLogin, setPassL] = useState('')
    const [emailRegister, setRegister] = useState('')
    const [passwordRegister, setPassR] = useState('')
    const [nameRegister, setName] = useState('')


    const handleRegister = () => {
        let data = {
            email: emailRegister,
            password: passwordRegister,
            name: nameRegister
        }
        dispatch(register(data))
        setRegister('')
        setPassR('')
        setName('')
    }

    const handleLogin = () => {
        let data = {
            email: emailLogin,
            password: passwordLogin,
        }
        dispatch(signin(data))
        setLogin('')
        setPassL('')
    }

    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])

  return (
    <View style={styles.container}>
        <View style={styles.top}>
         <Image source={welcome} style={{width:300, height:300, resizeMode:"contain"}}></Image>
        </View>
        <Swiper>
        <View style={styles.mid}>
        {
            fontLoaded? <Text style={{fontFamily:"neo-sans-medium", fontSize:35}}>Login</Text>:null
        } 
            {
                fontLoaded?<>
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
                </>:null
            }

        </View>
        <View style={styles.mid}>
        {
            fontLoaded? <Text style={{fontFamily:"neo-sans-medium", fontSize:35}}>Register</Text>:null
        } 
        {
                fontLoaded?<>
            <View style={styles.wrap}>
                <Form style={{alignItems:"center"}}>
                    <Item floatingLabel>
                        <Label style={{fontFamily:"neo-sans-medium"}}>Name</Label>
                        <Input  onChangeText={(text)=>{setName(text)}} />
                    </Item>
                    <Item floatingLabel>
                        <Label style={{fontFamily:"neo-sans-medium"}}>Email</Label>
                        <Input  onChangeText={(text)=>{setRegister(text)}}  />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={{fontFamily:"neo-sans-medium"}}>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(text)=>{setPassR(text)}}/>
                    </Item>
                </Form>
                <TouchableOpacity style={styles.buttons} onPress={()=>{handleRegister()}}>
                    <Text style={{fontFamily:"neo-sans-medium", color:"white"}}>Register</Text>
                </TouchableOpacity>
          </View>
                </>:null
            }
        </View>
        </Swiper>

    </View>
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
        alignItems:"center"
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