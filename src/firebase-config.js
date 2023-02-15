import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfwUDU_33pBwNhPJWPg7Ge6uDgBK4YWi8",
  authDomain: "my-food-diary-f22bb.firebaseapp.com",
  databaseURL: "https://my-food-diary-f22bb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-food-diary-f22bb",
  storageBucket: "my-food-diary-f22bb.appspot.com",
  messagingSenderId: "529249894641",
  appId: "1:529249894641:web:47ed91d67a81fb372a2950",
  measurementId: "G-KK3MFT5CN6"
};

const app = initializeApp(firebaseConfig);
// export const storage = firebase.storage().ref();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);