import styles from '../../styles/AddTokenInfoCard.module.scss'
import { addTokenInfo } from '../../components/db/TokenInfo'
import { useState } from 'react'
import { auth } from '../../config/FirebaseSetup'
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'


const AddTokenInfoCard = () => {
    const router = useRouter()

    const user = useSelector((state:any) => state.auth.value);
    const [symbol, setSymbol] = useState("")
    const [quantity, setQuantity] = useState(0.0)
    const [avgCost, setAvgCost] = useState(0.0)
    const [location, setLocation] = useState("")

    const addtokeninfo = async () =>{
        await addTokenInfo(user, symbol, quantity, avgCost, location)
        router.reload()
    }

    
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.description}>
                    <div className={styles.text}>
                        Symbol
                    </div>
                    <div className={styles.text}>
                        Quantity
                    </div>
                    <div className={styles.text}>
                        Average Cost
                    </div>
                    <div className={styles.text}>
                        Location
                    </div>
                </div>
                <div className={styles.input}>
                    <div>
                        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                    </div>
                    <div>
                        <input type="number" step="any" min="0" value={quantity} onChange={(e) => {setQuantity(e.target.valueAsNumber)}} />
                    </div>
                    <div>
                        <input type="number" step="any" min="0" value={avgCost} onChange={(e) => setAvgCost(e.target.valueAsNumber)} />
                    </div>
                    <div>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className={styles.add}>
                <button className={styles.addBtn} onClick={addtokeninfo}>Add</button>
            </div>
        </div>
    )
}

export default AddTokenInfoCard