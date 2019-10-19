import {REGISTER} from './actionTypes'
import {Alert} from 'react-native'
import axios from 'axios'
import {AsyncStorage} from 'react-native'

const baseURLuser = `http://localhost:3000/user`

export const register = (data) => async dispatch => {
    try {
        await axios({
            method:'post',
            url: baseURLuser + '/register',
            data
        })
        Alert.alert('Success!','Successfully Register')
    } catch (error){
        let message = (error.response.data && error.response.data.totalError[0]) || 'Fail to Register'
        Alert.alert('Error',message)
        
    }
}

export const signin = (result) => async dispatch => {
    try {
       let {data} =  await axios({
            method:'post',
            url: baseURLuser + '/signin',
            data: result
        })
        await AsyncStorage.setItem('token', data.token)
        await AsyncStorage.setItem('name', data.name)
        Alert.alert('Success!','Successfully Login')
    } catch (error){
        let message = (error.response.data && error.response.data.message) || 'Fail to Login'
        Alert.alert('Error',message)
    }

}