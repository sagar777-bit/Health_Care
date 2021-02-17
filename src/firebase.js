// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVCE5aRyY5iX33WE7XgSKlz5A2qssVldE",
  authDomain: "nodemcu-6692b.firebaseapp.com",
  databaseURL: "https://nodemcu-6692b-default-rtdb.firebaseio.com",
  projectId: "nodemcu-6692b",
  storageBucket: "nodemcu-6692b.appspot.com",
  messagingSenderId: "90545243244",
  appId: "1:90545243244:web:146112c91167720fd88449",
  measurementId: "G-649L2N0YLB",
};

firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

export const storageRef = firebase.storage().ref();
export default firebase;
