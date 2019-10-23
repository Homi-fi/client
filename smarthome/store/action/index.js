import { SET_USER, SET_SUCCESS } from './actionTypes'
import { Alert } from 'react-native'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

const baseURLuser = `http://34.87.107.147/user`
const baseURLCron = `http://34.87.107.147/cron/`

export const setUser = payload => {
  return {
    type: SET_USER,
    user: { payload }
  }
}

export const setSuccess = (payload) => {
  return {
    type: SET_SUCCESS,
    success: payload
  }
}

export const register = (data) => async dispatch => {
  try {
    await axios({
      method: 'post',
      url: baseURLuser + '/register',
      data
    })
    Alert.alert('Success!', 'Successfully Register')
  } catch (error) {
    // console.log(error)
    let message = (error.response.data && error.response.data.totalError[0]) || 'Fail to Register'
    Alert.alert('Error', message)

  }
}

export const signin = (result) => async dispatch => {
  try {
    let { data } = await axios({
      method: 'post',
      url: baseURLuser + '/signin',
      data: result
    })
    await AsyncStorage.setItem('token', data.token)
    await AsyncStorage.setItem('name', data.name)

    const payload = {
      name: data.name
    }


    dispatch(setUser(payload))
    dispatch(setSuccess(true))

    Alert.alert('Success!', 'Successfully Login')
  } catch (error) {
    let message = (error.response.data && error.response.data.message) || 'Fail to Login'
    Alert.alert('Error', message)
  }
}

export const cronOn = (hours, minutes, name) => async dispatch => {
  try {
    const { data } = await axios({
      method: 'get',
      url: baseURLCron + `lamp/${hours}:${minutes}:${1}:${name}`
    })
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}


export const cronOff = (name) => async dispatch => {
  try {
    const { data } = await axios({
      method: 'get',
      url: baseURLCron + `lamp/0:0:0:${name}`
    })
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}