// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjJCW4uZf4KXJ1MeELWKBfNDF_3CX1L5Y",
  authDomain: "pathology-9fb64.firebaseapp.com",
  projectId: "pathology-9fb64",
  storageBucket: "pathology-9fb64.appspot.com",
  messagingSenderId: "177289842322",
  appId: "1:177289842322:web:082277cee789f02068e04b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
