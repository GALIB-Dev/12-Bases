// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtM06cTQF2EEdPqvOyyeGzyspIhKCLUMo",
  authDomain: "bases-1125d.firebaseapp.com",
  projectId: "bases-1125d",
  storageBucket: "bases-1125d.firebasestorage.app",
  messagingSenderId: "426471575892",
  appId: "1:426471575892:web:5aa2a9d6652f08176c38c1",
  measurementId: "G-SQ7HK3Z1QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);