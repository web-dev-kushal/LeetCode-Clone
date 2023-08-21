import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm3QYD0gv2I0X6-wvhJ4-1PkROEhRew0k",
  authDomain: "leetcode-clone-b4771.firebaseapp.com",
  projectId: "leetcode-clone-b4771",
  storageBucket: "leetcode-clone-b4771.appspot.com",
  messagingSenderId: "793026902210",
  appId: "1:793026902210:web:fe00b72ea2a5e7acb9e35b"
};

const app = !getApps.length? initializeApp(firebaseConfig) : getApp();
//for authentication
const auth = getAuth(app);
//for database 
const firestore = getFirestore(app);

export { auth, firestore, app }