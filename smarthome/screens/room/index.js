import React, {useState, useEffect} from 'react'
import { Image,View, StyleSheet, TouchableOpacity,Text} from 'react-native'
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { Sensor, Room } from '../../apis/firebase'


function Rooms(){
    const [fontLoaded, setFont] = useState(false)
    const [roomies, setRooms] = useState([])
    const [sense, setSense] = useState(null)
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


    return(
        <View style={styles.container}>
            <View style={styles.upBox}>
                 {fontLoaded?<Text style={{fontFamily:"neo-sans-medium", fontSize:25}}>Hello, Ronaldo! </Text>:null}
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
                                {
                                    fontLoaded?<Text style={{fontSize:50, fontFamily:"neo-sans-medium", textAlign:"right"}}>{sense[el]}</Text>:null
                                }
                                {
                                    fontLoaded?<Text style={{fontFamily:"neo-sans-medium"}}>{el}</Text>:null
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
        justifyContent:"flex-end"
    },
    roomz:{
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