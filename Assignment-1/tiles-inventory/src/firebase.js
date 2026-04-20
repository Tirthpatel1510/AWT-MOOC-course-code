// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIMjDrZ5_Sa6MIP64mfmg8MVUxvbuHjkI",
  authDomain: "tilesinventory-ce655.firebaseapp.com",
  projectId: "tilesinventory-ce655",
  storageBucket: "tilesinventory-ce655.firebasestorage.app",
  messagingSenderId: "581299113300",
  appId: "1:581299113300:web:79f19de588c4c6f7740cc1",
  measurementId: "G-HBSP8P9P7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;