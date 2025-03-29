// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtM06cTQF2EEdPqvOyyeGzyspIhKCLUMo",
  authDomain: "bases-1125d.firebaseapp.com",
  projectId: "bases-1125d",
  storageBucket: "bases-1125d.firebasestorage.app",
  messagingSenderId: "426471575892",
  appId: "1:426471575892:web:5aa2a9d6652f08176c38c1",
  measurementId: "G-SQ7HK3Z1QZ"
};

// Initialize Firebase with error handling
let db;
let analytics;

try {
  console.log("Initializing Firebase with config:", firebaseConfig);
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  analytics = getAnalytics(app);
  console.log("Firebase initialized successfully, db:", db);
  
  // Test Firebase connection by adding a test document
  const testFirebase = async () => {
    try {
      const testCollection = collection(db, 'test');
      const testDoc = await addDoc(testCollection, {
        message: 'Testing Firebase connection',
        timestamp: new Date()
      });
      console.log('Test document added with ID:', testDoc.id);
      return true;
    } catch (error) {
      console.error('Error adding test document:', error);
      return false;
    }
  };
  
  // Execute the test
  testFirebase();
  
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Create a dummy db object to prevent app crashes
  db = {};
  analytics = {};
}

export { db, analytics };