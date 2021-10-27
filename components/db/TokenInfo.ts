import { firestore as db } from '../../config/FirebaseSetup'
import { collection, query, doc, DocumentSnapshot, getDoc, getDocs, QueryDocumentSnapshot, QuerySnapshot, where, addDoc } from "firebase/firestore";


export async function addTokenInfo(uid:string, symbol: string, quantity: number, averageCost: number, location:string){
    console.log("in add Tokne info")
    try {
      const docRef = await addDoc(collection(db, "TokenInfo"), {
        uid: uid,
        sym: symbol, 
        qty: quantity,
        avgCost: averageCost,
        location: location
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}


export async function getTokenInfoData(uid:string){
    // const user = useSelector((state:any) => state.auth.value);

    const allTokenInfoDocs:QuerySnapshot = await getDocs(query(collection(db, "TokenInfo"), where("uid", "==", uid)))
    const tokenInfoArray:Array<QueryDocumentSnapshot> = new Array()
    allTokenInfoDocs.forEach((doc) => {
      tokenInfoArray.push(doc)
    })
    return tokenInfoArray
}
