// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsUQqcrdvFU2gDH6fb0psByxJxNV7osP4",
  authDomain: "opinion-loom.firebaseapp.com",
  projectId: "opinion-loom",
  storageBucket: "opinion-loom.appspot.com",
  messagingSenderId: "652329751001",
  appId: "1:652329751001:web:9eac42e97663505a9bc9c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);