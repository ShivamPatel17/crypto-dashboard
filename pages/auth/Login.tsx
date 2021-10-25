import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../config/FirebaseSetup'
import Home from "../../pages/Home";
import { Redirect } from 'react-router'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in user: ", user);
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Log In</button>
      <button><Link href="/auth/Register"><a>Login</a></Link></button>
    </div>
    
  );
};

export default Login;