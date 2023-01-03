import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfpwv0xTF9mtiM-rJJ47_U5Kl8yrKfcUM",
  authDomain: "tcl-53-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-53-smart-shopping-list",
  storageBucket: "tcl-53-smart-shopping-list.appspot.com",
  messagingSenderId: "544151379544",
  appId: "1:544151379544:web:cc730922e25c7a8f32f42d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
