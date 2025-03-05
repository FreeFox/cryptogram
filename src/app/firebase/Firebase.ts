// firebase.js
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cryptogram-service.firebaseapp.com",
  projectId: "cryptogram-service",
  storageBucket: "cryptogram-service.appspot.com",
  messagingSenderId: "865463059773",
  appId: "1:865463059773:web:5c1c5d71ee491b67eb7154",
  measurementId: "G-RL5R2QELGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions };
