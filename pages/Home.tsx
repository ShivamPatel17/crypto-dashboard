import styles from '../styles/Home.module.scss'
import { useState, useEffect } from "react"
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import Login from './auth/Login';
import Link from 'next/link'
import { auth } from '../config/FirebaseSetup'
import handleLogout from '../components/auth/logout'
import Image from 'next/image'
import CryptoCard from '../components/cards/CryptoCard'
import { addTokenInfo, getTokenInfoData } from '../components/db/TokenInfo'
import AddTokenCard from '../components/cards/AddTokenInfoCard'
import { GetStaticProps } from 'next';
import { collection, query, doc, DocumentSnapshot, getDoc, getDocs, QueryDocumentSnapshot, QuerySnapshot, where } from "firebase/firestore";
import { firestore as db } from '../config/FirebaseSetup'


function appendTokenInfo(){

}
export default function Home(){
  const[tokenInfoData, setTokenInfoData] = useState([])
  const user = useSelector((state:any) => state.auth.value);

  //renders stuff at component run
  useEffect(() => {
    async function func(){
      const tokenInfoArray = await getTokenInfoData(user)
      setTokenInfoData(tokenInfoArray)
    }
    func()

  }, [])

  return(
    <>
    {/* NAV BAR */}
    <div className={styles.navbar}>
      <li className={styles.dropdown}>
        <button className={styles.dropbtn}>
          {user}
        </button>
        <div className={styles.dropdownContent}>
          <Link href="/user-settings">
            <a onClick={handleLogout}>Settings</a>
          </Link>
          <Link href="/auth/Login">
            <a onClick={handleLogout}>Logout</a>
          </Link>
        </div>
      </li>
    </div>
    {/* END NAV BAR */}
    <div className={styles.container}>
      <div className={styles.CryptoCardContainer}>
        <AddTokenCard/>
        {tokenInfoData &&
          tokenInfoData.map((val, index) =>{
            //val.data()
            return (
              <CryptoCard key={index} tokenInfoDoc={val}/>
            )
          })
        }
      </div>
    </div>
    </>
  )

  
}