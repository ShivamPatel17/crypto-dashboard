import { access_key, coinlayer_live_url } from './secrets'
import { useSelector } from "react-redux";

export default async function getPriceMap(symbols){
    const response = await fetch(`${coinlayer_live_url}?access_key=${access_key}`)
    const data = await response.json()
    const rates:Object = (data['rates'])
    const map = new Map()
    symbols.forEach((val, ind) => {
        const tokenInfo = val.data()
        const tokenInfoSymbol = tokenInfo['sym']
        if(rates[tokenInfoSymbol]){
            map.set(tokenInfoSymbol, rates[tokenInfoSymbol])
        }
    })
    console.log({map})
    return map   
}