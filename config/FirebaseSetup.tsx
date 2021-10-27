import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyCMflVeVjd7eCo1bl17iW20rPaeDNF0eC8",
  authDomain: "crypto-dashboard-ee4ac.firebaseapp.com",
  projectId: "crypto-dashboard-ee4ac",
  storageBucket: "crypto-dashboard-ee4ac.appspot.com",
  messagingSenderId: "894776525125",
  appId: "1:894776525125:web:fece37c8a2a3994c1c3e2c",
  measurementId: "G-2J1JVLTH7D"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)

export default app 