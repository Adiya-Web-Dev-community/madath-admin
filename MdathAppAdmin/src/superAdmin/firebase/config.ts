// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSIVmSOIdx3TBnyDgmdVtJMVjwe3xmLQM",
  authDomain: "urbanclap-8c57b.firebaseapp.com",
  projectId: "urbanclap-8c57b",
  storageBucket: "urbanclap-8c57b.appspot.com",
  messagingSenderId: "905875557912",
  appId: "1:905875557912:web:4107bf76d2da1947027d6d",
  measurementId: "G-TGMQLY6PND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);