// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASb4VI9KjwaMXpwnP3j_zt-dHFfpsupv8",
  authDomain: "householdtypescript-b1c9a.firebaseapp.com",
  projectId: "householdtypescript-b1c9a",
  storageBucket: "householdtypescript-b1c9a.appspot.com",
  messagingSenderId: "713307656092",
  appId: "1:713307656092:web:b0137121bb115fea04c259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export  {db};