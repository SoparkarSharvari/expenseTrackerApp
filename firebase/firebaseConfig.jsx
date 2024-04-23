// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCXsh5jzaqnFlxfB9PDpVuL-ocHD1mxAs",
  authDomain: "expensetracker-b4707.firebaseapp.com",
  projectId: "expensetracker-b4707",
  storageBucket: "expensetracker-b4707.appspot.com",
  messagingSenderId: "80724424726",
  appId: "1:80724424726:web:73ba9369c920c9cfbfdd37",
  measurementId: "G-60M1TLZJNY"
};
const app = initializeApp(firebaseConfig);

// Access the Firebase database

// Get the authentication instance with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };

// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// export { auth, analytics };