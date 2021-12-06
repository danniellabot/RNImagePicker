import firebase from 'firebase/app';
//import firebase from '@react-native-firebase/app';
import "firebase/firestore";
//import firestore from '@react-native-firebase/firestore'
//import authentication from '@react-native-firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQKjkP8ENYcP9wCPX4j-k6CulMA4tCcG4",
  authDomain: "scan3-00.firebaseapp.com",
  databaseURL: "https://scan3-00-default-rtdb.firebaseio.com",
  projectId: "scan3-00",
  storageBucket: "scan3-00.appspot.com",
  messagingSenderId: "261445952755",
  appId: "1:261445952755:web:32b127d1967bc0572f4386"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore()

export {Firebase, db, auth};
