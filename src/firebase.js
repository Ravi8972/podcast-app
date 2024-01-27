// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP6xfPhIA08qbLeALnl99vyQVi7VbBeEQ",
  authDomain: "podcast-app-70939.firebaseapp.com",
  projectId: "podcast-app-70939",
  storageBucket: "podcast-app-70939.appspot.com",
  messagingSenderId: "523733518708",
  appId: "1:523733518708:web:7e438b528348032566c421",
  measurementId: "G-6HZLYBR2WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };