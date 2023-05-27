// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Yjp5m-vrAWNdkoXUEll53wPUGWaWuzY",
  authDomain: "react-native-project-d3d44.firebaseapp.com",
  projectId: "react-native-project-d3d44",
  storageBucket: "react-native-project-d3d44.appspot.com",
  messagingSenderId: "543735279444",
  appId: "1:543735279444:web:ab578d28fa7c68b7f362c1",
  measurementId: "G-8DNME4YJ5X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
