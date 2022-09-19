
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_GSZlLwWaLDqqRtnt_b3uU1-OZ3w97zE",
  authDomain: "firecommerce-bcb9e.firebaseapp.com",
  projectId: "firecommerce-bcb9e",
  storageBucket: "firecommerce-bcb9e.appspot.com",
  messagingSenderId: "479546017746",
  appId: "1:479546017746:web:42e8782727eeedaa4caa0b",
  measurementId: "G-08M70B8EFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//creating our firestore
const fireDB=getFirestore(app)
export default fireDB