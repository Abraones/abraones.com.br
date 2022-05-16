import styles from '../styles/Bianca.module.scss'
import Image from 'next/image'

export default function Carteira(props){
    const saldo = props.saldo
    console.log(saldo)
    let saldoTotal = 0 
    saldo.map((a) =>{
     
        saldoTotal = saldoTotal + parseFloat(a.value)
       return saldoTotal
    })
    
    // <h2>Aqui aparecerão meus ativos</h2>
    //    <Image className={styles.iconAtivo} alt={`Icone ${saldo.asset} `} src={} width={90} height={90} />
    return(
            <div className={styles.carteira}>   
                <h2>Meus Ativos</h2>
                
                <div className={styles.saldo}>
                        <p className={styles.valorSaldo}>$ {saldoTotal.toFixed(2)}</p>
                        <p className={styles.moedaSaldo}>USD</p>
                        
                </div>

               {/*  <div className={styles.tabelaCarteira} >
                    <div className={styles.cabecalho} >
                        <p>crypto</p> <p>preço</p> <p>quantidade</p>
                    </div>
                    <div className={styles.listaAtivos}>
                    
                    {saldo.map((a, index)=>(
                        <div className={styles.ativo}>
                           
                            <p>{a.asset}</p>
                            <p>{a.price}</p>
                            <div>
                                <p>$ {a.value}</p>
                                <p>{a.free}</p>                     
                            </div>
                        </div>                        
                    ))}
                    </div>
                </div> */}

                <div className={styles.tabelaCarteira} >
                    <div className={styles.gridCabecalho}>
                        <div className={styles.nome}>crypto</div>
                        <div className={styles.preco}>preço</div> 
                        <div className={styles.qnt}><p>quantidade</p></div>
                    </div>
            
                     {saldo.map((a, index)=>(
                        <div className={styles.gridAtivo}>
                           
                            <div className={styles.nome} >{a.asset}</div>
                            <div className={styles.preco}>{a.price}</div>
                            <div className={styles.qnt}>
                                <p>$ {a.value}</p>
                                <p>{a.free}</p>                     
                            </div>
                        </div>                        
                    ))} 
                
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
