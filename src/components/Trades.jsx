import styles from '../styles/Bianca.module.scss'
export default function Trades(props){

    
    // props.arrayTodosTrades
    // props.parEspecifico (opcional)

    let novoTrade = []
    const arrayArray = []
    console.log(props.trades)
    let allTradesFomacted = []

    

    function formactTrades(props){
        const resTrades = props
        //console.log(resTrades)
        
        resTrades.map((as, index)=>{
            let individualTrades = []
            const indivDataTrades = as.data
            

            indivDataTrades.map((a, index)=>{
                // Formata a Data
                const date = a.time
                const timeFormact = new Date(date)
                let ddmmyyy = ((timeFormact.getDate() )) + "/" + ((timeFormact.getMonth() + 1)) + "/" + timeFormact.getFullYear(); 

                //Arredonda valores
                const qnt = parseFloat(a.quoteQty)
                const paid = parseFloat(a.price)
                const arredondaQnt = qnt.toFixed(2)
                //const atualValor = parseFloat(as.price.price)
                //const arredodntaValor = atualValor.toFixed(2)
                //console.log(typeof(atualValor))

                //Calcula Retorno
                const retorno = ((as.price.price - a.price)*100/as.price.price)
                const arredondaRetorno = retorno.toFixed(2)

                if (a.isBuyer === true) {
                    individualTrades.push({...a, time: ddmmyyy, quoteQty: arredondaQnt,  isBuyer: 'Compra', price: paid, roi: arredondaRetorno})
                } else {
                    individualTrades.push({...a, time: ddmmyyy, quoteQty: arredondaQnt,  isBuyer: 'Venda', price: paid, roi: arredondaRetorno})
                }
            })

            let b = {par: as.par, data: individualTrades, price: as.price }
            arrayArray.push(b)
        })

        //console.log(arrayArray)
        return arrayArray
    }

    formactTrades(props.trades)
    
   // <p className={styles.pText}>Retorno: {`${a.roi}%`}</p>
   //<p className={styles.pText}>Preço Atual: {parseFloat(price.btc.price)}</p>
    return(
        <div className={styles.tradesBTC}>
                <h2>Aqui todos os Trades</h2>
                <div className={styles.boxTrades}>

                    {arrayArray.map((moeda, index)=>(
                        <div className={styles.tradesBTC} id={index}>
                            <h2>Par : {moeda.par}</h2>
                            
                            {moeda.data.map((a)=>(
                                <div className={styles.tradeItem} id={a.id} >
                                    <p className={styles.pText}>Quando: {a.time} </p>
                                    <p className={styles.pText}>Preço: {a.price}</p>
                                    <p className={styles.pText}>Quantidade: {a.quoteQty}</p>
                                    <p className={styles.pText}>Preço Atual: {parseFloat(moeda.price.price)}</p>
                                    <p className={styles.pText}>Retorno: {`${a.roi}%`}</p>
                                    <p className={styles.pText}>Foi uma: {a.isBuyer}</p>
                                </div>
                            ))}

                        </div>
                    ))

                    }

                </div>
            </div>

    )
}