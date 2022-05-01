import Head from 'next/head'
import styles from '../../styles/Bianca.module.scss'

export default function Trades({saldo, trades, price}){

    console.log(saldo)
    //console.log(trades)
    //console.log(price.btc.price)
 
    let novoTrade = [ ]
    
    function formactTrades(props){
        const trans = props.btc

        trans.map((a, index, arrayBase)=>{

            // Formata a Data
            const date = a.time
            const timeFormact = new Date(date)
            let ddmmyyy = ((timeFormact.getDate() )) + "/" + ((timeFormact.getMonth() + 1)) + "/" + timeFormact.getFullYear(); 

            //Arredonda valores
            const qnt = parseFloat(a.quoteQty)
            const paid = parseFloat(a.price)
            const arredondaQnt = qnt.toFixed(2)

            //Calcula Retorno
            const retorno = ((price.btc.price - a.price)*100/price.btc.price)
            const arredondaRetorno = retorno.toFixed(2)

            if (a.isBuyer === true) {
                novoTrade.push({...a, time: ddmmyyy, quoteQty: arredondaQnt, roi:arredondaRetorno, isBuyer: 'Compra', price: paid})
            } else {
                novoTrade.push({...a, time: ddmmyyy, quoteQty: arredondaQnt, roi:arredondaRetorno, isBuyer: 'Venda', price: paid})
            }
        })

        //console.log(novoTrade)
        return novoTrade
    }

    formactTrades(trades)

    return(
        <div className={styles.container}>
            <Head>
                <title>Bianca</title>
            </Head>
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
                    {novoTrade.map((a)=>(
                        <div className={styles.tradeItem} key={a.id}>
                            <p className={styles.pText}>Quando: {a.time} </p>
                            <p className={styles.pText}>Preço: {a.price}</p>
                            <p className={styles.pText}>Quantidade: {a.quoteQty}</p>
                            <p className={styles.pText}>Preço Atual: {parseFloat(price.btc.price)}</p>
                            <p className={styles.pText}>Retorno: {`${a.roi}%`}</p>
                            <p className={styles.pText}>Foi uma: {a.isBuyer}</p>
                        

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