import styles from '../../styles/Bianca.module.scss'

export default function Trades({saldo, trades, price}){

    //console.log(saldo)
    //console.log(trades)
    //console.log(price)
    //const tempo = 1635080094978
    //const date = new Date(tempo)
    //console.log(date.toDateString())
    


    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <a href='/'> <h1>Bianca</h1> </a> 
                <p>Seja bem vindo a Bianca, minha página de consumo da API da Binance. </p>
                <p>Tá feio, mas funciona</p>
                <p>Documentação: <a href="https://binance.github.io/binance-connector-node/index.html" >Connector Binance Node</a></p>

            </div>

            <div className={styles.carteira}>
                <h2>Aqui aparecerão meus ativos</h2>
                <div className={styles.ativos}>
                    {saldo.map((a, index)=>(
                        <p key={index}>{a.asset} : {a.free}</p>
                    ))}
                </div>
            </div>
            <div className={styles.tradesBTC}>
                <h2>Aqui os Trades de BTC</h2>
                <div className='boxTrades'>
                    {trades.btc.map((a)=>(
                        <div className={styles.tradeItem} key={a.id}>
                            
                            <p className={styles.pText}>Quando: {a.time} </p>
                            <p className={styles.pText}>Preço: {a.price}</p>
                            <p className={styles.pText}>Quantidade: {a.quoteQty}</p>
                            <p className={styles.pText}>Preço Atual: {price.btc.price}</p>
                            <p className={styles.pText}>Retorno : {(price.btc.price - a.price)*100/price.btc.price}</p>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async () => {
    //Conecta com a Binance
    const { Spot } = require('@binance/connector');
    const apiKey = process.env.BIANCA_API_KEY;
    const apiSecret = process.env.BIANCA_SECRET_KEY;
    const client = new Spot(apiKey, apiSecret);
    // Chama os dados do Metódo account
    const response = await client.account();
    // Captura todos as cryptos da conta
    const allCoins = await response.data.balances
    // Captura Trades de BTC com BUSD
    const resBTC = await client.myTrades('BTCBUSD')
    const tradesBTC = await resBTC.data
    //Puxar preço
    const resPriceBTC = await client.tickerPrice('BTCBUSD')
    const priceBTC = await resPriceBTC.data

    

    function comSaldo(props){
        let comSaldo = [];
        props.map((props)=>{
            if(props.free > 0){
                comSaldo.push(props)
            }
        })
        return comSaldo
    }
    const saldo = comSaldo(allCoins)
    return{
        props:{
            saldo, 
            trades:{btc: tradesBTC},
            price:{btc: priceBTC}
        }
    }
}





// BINANCE CONECTOR RESTful APIs
//const { Spot } = require('@binance/connector')
//const apiKey = ''
//const apiSecret = ''
//const client = new Spot(apiKey, apiSecret)
// Get account information
//client.account().then(response => client.logger.log(response.data))