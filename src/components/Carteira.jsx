import styles from '../styles/Bianca.module.scss'
export default function Carteira(props){
    console.log(props.saldo)

    return(
            <div className={styles.carteira}>
                <h2>Aqui aparecerão meus ativos</h2>
                <div className={styles.ativos}>
                    {props.saldo.map((a, index)=>(
                        <p key={index}>{a.asset} : {a.free}</p>
                    ))}
                </div>
            </div>
    )
}

