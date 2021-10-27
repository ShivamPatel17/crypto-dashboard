import styles from '../../styles/AddTokenInfoCard.module.scss'
import cardStyle from '../../styles/Card.module.scss'
import { addTokenInfo } from '../../components/db/TokenInfo'
import { useState } from 'react'
import { auth } from '../../config/FirebaseSetup'
import { useSelector } from "react-redux";


const AddTokenInfoCard = () => {
    const user = useSelector((state:any) => state.auth.value);
    const [symbol, setSymbol] = useState("")
    const [quantity, setQuantity] = useState(0.0)
    const [avgCost, setAvgCost] = useState(0.0)
    const [location, setLocation] = useState("")

    const addtokeninfo = async () =>{
        addTokenInfo(user, symbol, quantity, avgCost, location)
    }

    
    return(
        <div className={cardStyle.container}>
            <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            <input type="number" step="any" min="0" value={quantity} onChange={(e) => {
                console.log({e})
                setQuantity(e.target.valueAsNumber)}} />
            <input type="number" step="any" min="0" value={avgCost} onChange={(e) => setAvgCost(e.target.valueAsNumber)} />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button onClick={addtokeninfo}></button>
        </div>
    )
}

export default AddTokenInfoCard