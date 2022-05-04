import styles from '../styles/Bianca.module.scss'
import Image from 'next/image'
export default function Carteira(props){
    const saldo = props.saldo
    const teste = saldo[0]

    console.log(saldo)
    
    // <h2>Aqui aparecerão meus ativos</h2>
    //    <Image className={styles.iconAtivo} alt={`Icone ${saldo.asset} `} src={} width={90} height={90} />
    return(
            <div className={styles.carteira}>
                
                <div className={styles.saldo}>
                        <p className={styles.valorSaldo}>50</p>
                        <p className={styles.moedaSaldo}>USD</p>
                        <p className={styles.infoSaldo}> {`>`} Ver depositos</p>
                </div>

                <div className={styles.tabelaCarteira} >
                    <div className={styles.cabecalho} >
                        <p>crypto</p> <p>preço</p> <p>quantidade</p>
                    </div>
                    <div className={styles.listaAtivos}>
                    
                    {saldo.map((a, index)=>(
                        <div className={styles.ativo}>
                            <p>{a.asset}</p>
                            <p>60.000</p>
                            <p>{a.free}</p>                     
                        </div>                        
                    ))}
                    </div>
                </div>

                
            </div>
    )
}

/* 
<div className={styles.ativos}>
                    {props.saldo.map((a, index)=>(
                        <p key={index}>{a.asset} : {a.free}</p>
                    ))}
</div>
*/
