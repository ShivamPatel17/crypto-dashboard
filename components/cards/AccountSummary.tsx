import { useState, useEffect } from 'react'
import styles from '../../styles/AccountSummary.module.scss'
import getPriceMap from '../utility/getPriceMap'
import AddTokenInfoCard from '../cards/AddTokenInfoCard'


const AccountSummary = ({ tokenInfoData }) => {
    console.log({tokenInfoData})
    const[pricesMap, setPricesMap] = useState(new Map())
    const[symbolPrice, setSymbolPrice] = useState([])
    const[totalValue, setTotalValue] = useState(0)
    const[tokenValue, setTokenValue] = useState([])


    useEffect(() => {
        async function func() {
            //this is a map of prices for tokens that the user owns
            const tokenPricesMap = await getPriceMap(tokenInfoData)
            setPricesMap(tokenPricesMap)
            const symPriceArr:Array<Object> = []
            tokenPricesMap.forEach((val:number, key) =>{
                symPriceArr.push({
                    sym: key,
                    price: val
                })
            })
            console.log({symPriceArr})
            setSymbolPrice(symPriceArr) 
            
            //okay so we got prices for every token, now lets calculate a balance
            const qtyMap = new Map()
            tokenInfoData.forEach((val, key) =>{
                const data = val.data()
                const sym = data['sym']
                const qty = data['qty']
                if(qtyMap.has(sym)){
                    let currQty = qtyMap.get(sym)
                    qtyMap.set(sym, currQty + qty)
                }else{
                    qtyMap.set(sym, qty)
                }
            })
            const tokenValMap = new Map()
            tokenInfoData.forEach((val, key) =>{
                const data = val.data()
                const sym = data['sym']
                if(tokenPricesMap.has(sym)){
                    tokenValMap.set(sym, tokenPricesMap.get(sym)*qtyMap.get(sym))
                }
            })
            const symbolValueArray = []
            tokenValMap.forEach((val, key) =>{
                symbolValueArray.push({
                    sym: key,
                    qty: qtyMap.get(key),
                    val: val
                })
            })
            setTokenValue(symbolValueArray)

            console.log(tokenValMap)
            let currVal = 0
            tokenValMap.forEach((val, key) => {
                currVal+=val
            })
            setTotalValue(currVal)
        }
        if(tokenInfoData.length>0) func()
    }, [])



    return(
        <div className={styles.flexContainer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.title}>
                        {`My Balance: $${totalValue.toFixed(2)}`}
                    </div>
                    <div>
                        {tokenValue.length>0 &&
                            tokenValue.map((val, index) => {
                                return(
                                    <div key={index}>
                                    {`${val['qty']} ${val['sym']}:  $${val['val'].toFixed(2)}`}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.title}>
                        Prices
                    </div>
                    {symbolPrice&&
                        symbolPrice.map((val, index) => {
                            return(
                                <div key = {index}>
                                    {`${val['sym']}: $${val['price'].toFixed(2)}`}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.container}>
                <AddTokenInfoCard />
            </div>
        </div>
    )
}

export default AccountSummary