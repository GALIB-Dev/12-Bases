// Import Firebase modules (modular approach)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBtM06cTQF2EEdPqvOyyeGzyspIhKCLUMo",
  authDomain: "bases-1125d.firebaseapp.com",
  projectId: "bases-1125d",
  storageBucket: "bases-1125d.appspot.com",
  messagingSenderId: "426471575892",
  appId: "1:426471575892:web:5aa2a9d6652f08176c38c1",
  measurementId: "G-SQ7HK3Z1QZ"  // Added the missing comma here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Analytics
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' && getAnalytics ? getAnalytics(app) : null;

export { db, analytics };
