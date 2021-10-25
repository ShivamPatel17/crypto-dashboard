import styles from '../styles/Home.module.scss'
import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import Login from './auth/Login';
import Link from 'next/link'
import { auth } from '../config/FirebaseSetup'
import handleLogout from '../components/auth/logout'


export default function Home(){
  const user = useSelector((state:any) => state.auth.value);
  
  if(!user){
    return <Login/>
  }
  return(
    <>
    <div className={styles.navbar}>
      <li className={styles.right}>
        <Link href="/auth/Login">
          <a onClick={handleLogout}>Logout</a>
        </Link>
      </li>
      <li className={styles.left}>
        <a>{user}</a>
      </li>
    </div>
    <div className={styles.container}>

    </div>
    </>
  )
}