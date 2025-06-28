import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
  


const firebaseConfig = {
  apiKey: "AIzaSyAYIgP8aWH07QS1A_yP2jcmgnjB8vDGOok",
  authDomain: "todo-app-1-e88b4.firebaseapp.com",
  databaseURL: "https://todo-app-1-e88b4-default-rtdb.firebaseio.com",
  projectId: "todo-app-1-e88b4",
  storageBucket: "todo-app-1-e88b4.firebasestorage.app",
  messagingSenderId: "203898978799",
  appId: "1:203898978799:web:8c095213444a16a118f61a",
  measurementId: "G-8TBFPSWL0W"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const auth = getAuth(app)
export { db, ref, push, set, onValue, remove, update };