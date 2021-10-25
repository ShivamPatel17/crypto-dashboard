import { StaticRouter as Router, Switch, Route} from "react-router-dom";
import Link from 'next/link'
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register";
import Reset from "../pages/auth/Reset";
import Home from "../pages/Home";
import Secret from "../pages/protected/Secrets"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../config/FirebaseSetup'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { saveUser } from '../redux/slices/authSlice'
import ProtectedRoute from "../components/ProtectedRoute";
import handleLogout from '../components/auth/logout'

function App() {
  const user = useSelector((state:any) => state.auth.value);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.uid));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);


  return(
    <Home/>
  )
}

export default App;