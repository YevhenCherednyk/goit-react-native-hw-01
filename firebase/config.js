import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Yjp5m-vrAWNdkoXUEll53wPUGWaWuzY",
  authDomain: "react-native-project-d3d44.firebaseapp.com",
  projectId: "react-native-project-d3d44",
  storageBucket: "react-native-project-d3d44.appspot.com",
  messagingSenderId: "543735279444",
  appId: "1:543735279444:web:ab578d28fa7c68b7f362c1",
  measurementId: "G-8DNME4YJ5X",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
