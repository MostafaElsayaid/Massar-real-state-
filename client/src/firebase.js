// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "massar-18be2.firebaseapp.com",
  projectId: "massar-18be2",
  storageBucket: "massar-18be2.appspot.com",
  messagingSenderId: "747783114855",
  appId: "1:747783114855:web:f74fc571192828c3f884c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);