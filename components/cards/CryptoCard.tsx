import styles from '../../styles/CryptoCard.module.scss'

export default function CryptoCard({tokenInfoDoc}){
    const data = tokenInfoDoc.data()
    return(
        <div className={styles.container}>
            <div className={styles.topRow}>   
                {`${data['qty']} ${data['sym']}`}
            </div>
            <div className={styles.row}>
                {`Average Cost: \$${data['avgCost']}`}
            </div>
            <div className={styles.row}>
                {`${data['location']}`}
            </div>
        </div>
    )
}