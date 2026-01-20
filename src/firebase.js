import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIgQ5LkAxROzasm9khAnWnpJDzNjVR7pg",
  authDomain: "solar-352cc.firebaseapp.com",
  projectId: "solar-352cc",
  storageBucket: "solar-352cc.firebasestorage.app",
  messagingSenderId: "400518365772",
  appId: "1:400518365772:web:0e30228ae16757a114eae9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
