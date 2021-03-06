import React, {useState, useEffect} from 'react'
import { Image,View, StyleSheet, TouchableOpacity,Text, AsyncStorage, Alert, Modal, ActivityIndicator,StatusBar} from 'react-native'
import * as Font from 'expo-font';
import { Notifications } from 'expo';
import { Sensor, Room, Door,User } from '../../apis/firebase'
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import {setSuccess} from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'

function Rooms(props){
    const dispatch = useDispatch()
    const [change, setchange] = useState(false)
    const [hasCameraPermission, setCameraPermission] =  useState(null)
    const [mydoor, setDoor] = useState(null)
    const [scanned, setScanned] = useState(false)
    // const [myname, setMyName] = useState('')
    const myname = useSelector(state => state.user.user.name)
    const [fontLoaded, setFont] = useState(false)
    const [roomies, setRooms] = useState([])
    const [sense, setSense] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [bells, setBell] = useState(null)
    const [temp, setTemp] = useState(null)
    const [notification, setNotification] = useState(null)

    const registerForPushNotificationsAsync = async () => {
          const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(
              Permissions.NOTIFICATIONS
            );
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          let token = await Notifications.getExpoPushTokenAsync();
          User
          .doc('user1')
          .update({
              expoToken: token
          }).then(()=>{

          }).catch(error => {
              Alert.alert('Fail to add Token')
          })
          
      };

    useEffect(()=>{
        if(temp >= 27){
            sendPushNotification()
        }
    },[temp])

    useEffect(()=>{
        if(bells){
            sendKnockNotif()
        }
    },[bells])
    const sendPushNotification = async () => {
        User
        .doc('user1')
        .get()
        .then(async function(doc){
            let myToken = doc.data().expoToken
            const message = {
                to: myToken,
                sound: 'default',
                title: 'Fire Alert!',
                body: 'Your House is on fire!!!' ,
                data: { data: 'goes here' },
              };
              const response = await axios({
                url:'https://exp.host/--/api/v2/push/send',
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(message),
              });
        })
    }

    const sendKnockNotif = async () => {
        User
        .doc('user1')
        .get()
        .then(async function(doc){
            let myToken = doc.data().expoToken
            const message = {
                to: myToken,
                sound: 'default',
                title: 'Bell Alert!',
                body: 'Someone is pressing the bell!!!' ,
                data: { data: 'goes here' },
              };
              const response = await axios({
                url:'https://exp.host/--/api/v2/push/send',
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(message),
              });
        })
    }

    

    useEffect(()=>{
        Notifications.addListener((notification)=>{
            setNotification(notification)
        });
        registerForPushNotificationsAsync()
        checkDoor()
    },[])


    const checkDoor = () => {
        Door
        .onSnapshot(function(querySnapshot) {
            let doorz = [];
            querySnapshot.forEach(function(doc) {
                doorz.push(doc.data());
            });

            setDoor(doorz[0].status)
        });
    }

    const updateDoor = () => {
        let changeMe;
        if(mydoor){
            changeMe = false
        }else{
            changeMe = true
        }
        Door
        .doc('ogwpJEM8Ekn9JiKtYogA')
        .update({
            status: changeMe
        })
        .then((data) => {
        })
        .catch((error)=>{
            Alert.alert('Error!', 'Failed to update your door!')
        })
    }


    const changeDoor = () => {
        let mssg = `The door is ${mydoor ? 'unlocked':'locked'}, do you really want to ${mydoor ? 'lock':'unlock'} the door ?`
        Alert.alert(
            'Update Door',
            mssg,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {updateDoor()}},
            ],
            {cancelable: false},
          );
    }


    // const shakeListener =  () => {
    //     DeviceMotion.addListener((data)=>{
    //         if(data.acceleration["x"] > 10){
    //             if(!modalVisible && !change){
    //                     Alert.alert(
    //                         'Scan Barcode',
    //                         'Do you really want to Scan a Barcode?',
    //                         [
    //                           {
    //                             text: 'Cancel',
    //                             onPress: () => {setchange(true)},
    //                             style: 'cancel',
    //                           },
    //                           {text: 'OK', onPress: () => {setModalVisible(true)}},
    //                         ],
    //                         {cancelable: false},
    //                       );
    //             }
    //         }
    //     })
    // }



    


    // const getName = async() => {
    //     let name = await AsyncStorage.getItem('name')
    //     setMyName(name)
    // }

    const getPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        setCameraPermission(status === 'granted')
    }

    useEffect(()=>{
        // getName()
        getPermission()
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
            let sensors = [];
            querySnapshot.forEach(function(doc) {
                sensors.push(doc.data());
            });
            setSense(sensors[0])
            setTemp(sensors[0].temperature)
            setBell(sensors[0].bell)

        });
      },[])


    const removeAll = async () => {
        await AsyncStorage.removeItem('token') 
        await AsyncStorage.removeItem('name')
        dispatch(setSuccess(false))
        props.navigation.navigate('LandingPage')
    }

    const handleLogout = () => {
        Alert.alert(
            'Sign Out',
            'Do you really want to Sign Out?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {removeAll()}},
            ],
            {cancelable: false},
          );
    }

 

    return(
        <>
           {roomies.length > 0 ?
           <>
           <StatusBar backgroundColor="whitesmoke" barStyle="dark-content" />
           <View style={styles.container}>
            <View style={styles.upBox}>
                <View style={{width:"100%",justifyContent:"flex-end", flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>{handleLogout()}}>
                        <AntDesign name="logout" size={30} color="#fec894" />
                    </TouchableOpacity>
                
                </View>
                <View>
                    {fontLoaded?<Text style={{fontFamily:"neo-sans-medium", fontSize:25}}>Hello, {myname}! </Text>:null}
                    {fontLoaded?<Text style={{fontFamily:"neo-sans-medium"}}>What are you up to?</Text>:null}
                </View>
                
            </View>
            <View style={styles.rooms}>

                {
                    roomies.map(el => {
                        return( <TouchableOpacity style={styles.roomz} key={el.id} onPress={()=>{props.navigation.navigate('Detail', {roomId:el.id})}}>
                            {
                                el.name == "Bedroom" ? <Image source={{uri:"https://images.unsplash.com/photo-1536349788264-1b816db3cc13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"}} style={{width:190,height:270}}></Image>:<Image source={{uri:"https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}} style={{width:190,height:270}}></Image>
                            }
                        {fontLoaded?<Text style={{position:"absolute", bottom:20, left: 15, fontFamily:"neo-sans-medium", color:"white"}}>{el.name}</Text>:null}
                       </TouchableOpacity>)
                    }
                       )
                }
                

            </View>
            <View style={styles.downBox}>
                {sense ? 
                <>
                            {/* <TouchableOpacity style={styles.sensorz}> */}
                            <View style={styles.sensorz}>
                                <View style={{height:30}}>
                                    <Ionicons name="ios-water" size={20} color="#fec894" />
                                </View>
                                <Text style={{fontSize:45, fontFamily:"neo-sans-medium", textAlign:"center"}}>{sense.humidity}</Text>
                                <Text style={{position:"absolute", right:10,top:70}}>%</Text>
                                <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>{Object.keys(sense)[1]}</Text>
                            </View>
                            {/* </TouchableOpacity> */}
                            <TouchableOpacity style={styles.sensorz} onPress={()=>{changeDoor()}}>
                                <View style={{height:30}}>
                                <Ionicons name="ios-home" size={20} color="#fec894" /> 
                                </View>
                               {mydoor ? <MaterialCommunityIcons name="home-lock-open" size={70} color="black" style={{position:"absolute",right:20,top:40}} />:<MaterialCommunityIcons name="home-lock" size={70} color="black" style={{position:"absolute",right:20,top:40}}/> } 
                                <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>Door</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.sensorz}> */}
                            <View style={styles.sensorz}>
                                <View style={{height:30}}>
                                    <MaterialCommunityIcons name="thermometer" size={20} color="#fec894" /> 
                                </View>
                                <Text style={{fontSize:45, fontFamily:"neo-sans-medium", textAlign:"center"}}>{sense.temperature}  </Text>
                                <MaterialCommunityIcons name="temperature-celsius" size={15} color="black" style={{position:"absolute",right:10,top:70}} />
                                 <Text style={{fontSize:12,fontFamily:"neo-sans-medium",textAlign:"right",color:"grey"}}>{Object.keys(sense)[3]}</Text>
                            </View>

                            {/* </TouchableOpacity> */}
                </>:null}



            </View>
             </View>
           </>:<View style={styles.load}><ActivityIndicator size="large" color="#fec894" /></View>
           
            } 

       </>
    )


}

const styles = StyleSheet.create({
    load:{
        flex:1,
        backgroundColor:"#f9f9f9",
        justifyContent:"center",
        alignItems:"center"
    },
    container: {
        flex:1,
        backgroundColor:"#f9f9f9",
        // marginTop:20
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