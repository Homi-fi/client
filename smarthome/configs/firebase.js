import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD1mK15L0g7LPtM_SJqI6anuJ0lz6KKRs4",
  authDomain: "homi-fi-f7ccc.firebaseapp.com",
  projectId: "homi-fi-f7ccc"
})

export const db = firebase.firestore()
export const fireAuth = firebase.auth()
export const firestore = firebase.firestore
