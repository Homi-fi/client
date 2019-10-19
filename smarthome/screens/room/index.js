import React, {useState, useEffect} from 'react'
import { Image,View, StyleSheet, TouchableOpacity,Text, AsyncStorage} from 'react-native'
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { Sensor, Room } from '../../apis/firebase'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


function Rooms(){
    const [myname, setMyName] = useState('')
    const [fontLoaded, setFont] = useState(false)
    const [roomies, setRooms] = useState([])
    const [sense, setSense] = useState(null)
    const getName = async() => {
        let name = await AsyncStorage.getItem('name')
        setMyName(name)
    }
    useEffect(()=>{
        getName()
    },[])
    useEffect(()=>{
        Font.loadAsync({
          'neo-sans-medium': require('../../assets/NeoSansMedium.otf'),
        }).then(()=>{
          setFont(true)
        })
      },[])

      useEffect(()=>{
        Room
        .onSnapshot(function(querySnapshot) {
            var rooms = [];
            querySnapshot.forEach(function(doc) {
                let document = doc.data()
                let id = doc.id
                let total = {
                   ...document,
                    id
                }
                rooms.push(total)
            });
            setRooms(rooms)
        });
      },[])
       
      useEffect(()=>{
          Sensor
        .onSnapshot(function(querySnapshot) {
            var sensors = [];
            querySnapshot.forEach(function(doc) {
                sensors.push(doc.data());
            });
            setSense(sensors[0])
        });
      },[])

    const checkSensors = (el) => {
        if(el == "light"){
            if(sense[el]){
                return(
                <>
                <MaterialCommunityIcons name="lightbulb-on" size={70} color="#FFFF66" style={{marginLeft:15}} />
                <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>{el}</Text>
                </>
                )
            }else{
                return(
                <>
                <MaterialCommunityIcons name="lightbulb" size={70} color="#FFFF66" />
                <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right", color:"grey"}}>{el}</Text>
                </>
                )
            }
        }else if(el == "temperature"){
            return(    
                <>      
               <Text style={{fontSize:45, fontFamily:"neo-sans-medium", textAlign:"center"}}>{sense[el]}</Text>
               <MaterialCommunityIcons name="temperature-celsius" size={15} color="black" style={{position:"absolute",right:10,top:70}} />
               <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>{el}</Text>
                </>
        )
        }else if(el == "humidity"){
            return(
                <>      
               <Text style={{fontSize:45, fontFamily:"neo-sans-medium", textAlign:"center"}}>{sense[el]}  </Text>
               <Text style={{position:"absolute", right:10,top:70}}>%</Text>
               <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>{el}</Text>
                </>
            )

        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.upBox}>
                 {fontLoaded?<Text style={{fontFamily:"neo-sans-medium", fontSize:25}}>Hello, {myname}! </Text>:null}
                 {fontLoaded?<Text style={{fontFamily:"neo-sans-medium"}}>What are you up to?</Text>:null}
            </View>
            <View style={styles.rooms}>

                {
                    roomies.map(el => {
                        return( <TouchableOpacity style={styles.roomz} key={el.id}>
                            {
                                el.name == "bedroom" ? <Image source={{uri:"https://images.unsplash.com/photo-1536349788264-1b816db3cc13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"}} style={{width:160,height:270}}></Image>:<Image source={{uri:"https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}} style={{width:160,height:270}}></Image>
                            }
                        {fontLoaded?<Text style={{position:"absolute", bottom:20, left: 15, fontFamily:"neo-sans-medium", color:"white"}}>{el.name}</Text>:null}
                       </TouchableOpacity>)
                    }
                       )
                }
                

            </View>
            <View style={styles.downBox}>
                {
                    sense && Object.keys(sense).map((el,i) => {
                        return (
                            <TouchableOpacity style={styles.sensorz} key={i}>
                                <View style={{height:30}}>
                                {el == 'humidity' ? <Ionicons name="ios-water" size={20} color="#fec894" />:null}
                                {el == 'temperature' ? <MaterialCommunityIcons name="thermometer" size={20} color="#fec894" />:null}
                                {el == 'light' ? <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#fec894" />:null}
                                </View>
                                {
                                    fontLoaded ? checkSensors(el):null
                                }
                                
                            </TouchableOpacity>
                        )
                    })
                }
                
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#f9f9f9",
        marginTop:Constants.statusBarHeight
    },
    upBox: {
        height: "20%",
        // backgroundColor:"blue",
        padding: 20,
        justifyContent:"flex-end"
    },
    rooms: {
        height: "50%",
        width:"100%",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent: "space-around",
        alignItems:"center"
    },
    downBox:{
        height:"30%",
        width:"100%",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent: "space-around",
        alignItems:"center"
    },
    sensorz:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:"28%", 
        height: 150,
        backgroundColor:"white",
        borderRadius: 5,
        padding:10,
        justifyContent:"space-between"
    },
    roomz:{
        overflow:"hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        width:"42%", 
        height: 250,
        backgroundColor:"white",
        borderRadius: 5,
        justifyContent:"flex-end",
    }
})

export default Rooms