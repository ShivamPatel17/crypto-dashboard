import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from '../../config/FirebaseSetup'

export default function handleLogout() {
    signOut(auth)
    .then(() => {
      console.log("user signed out");
    })
    .catch((error) => {
      console.log("error", error);
    });
}