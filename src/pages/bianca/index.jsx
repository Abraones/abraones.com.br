import Head from 'next/head'
import Trades from '../../components/Trades'
import styles from '../../styles/Bianca.module.scss'

export default function Bianca({saldo, trades, price, cleber}){

    //console.log(cleber)
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

            <Trades trades={cleber} ></Trades>

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

    //console.log(tradesBTC)
    

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

    function withTrade(props){
        let parTrade = [];

        saldo.map((props)=>{
            //console.log(a.asset)
            if (props.asset !== 'BUSD' &&  props.asset !== 'BRL'){
            const par = (props.asset + 'BUSD')
            //console.log(par)
            parTrade.push(par)
            }
        })
        return parTrade
    }

    const pares = withTrade(saldo)
    //console.log(pares)

    /* async function allTrades(props){
        let seila = {}
        props.map((a)=>{
            let atualTrade = await client.myTrades(a)
            console.log(atualTrade)
        })

    }
    allTrades(pares) */
    //const allTrades = await client.myTrades()
    
    async function Cleber(){
        let cleber = []
        const allTrades = pares.map(async function(a){
            //console.log(typeof(a))
            const aTrade = await client.myTrades(a)
            const aPrice = await client.tickerPrice(a)
            const dataPrice = aPrice.data
            const par = a
            const dataTrade = aTrade.data
            const augusto = {
                par: par,
                price: dataPrice,
                data: dataTrade
            }
            return augusto
        })
        
        const arrayTrades = await Promise.all(allTrades);

        //cleber.push(allTrades)
        //console.log(vitor)
        return arrayTrades
    }

    const cleber = await Cleber()
    //Cleber()
    //console.log(cleber)


    return{
        props:{
            saldo, 
            trades:{btc: tradesBTC},
            price:{btc: priceBTC},
            cleber
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


//
/*  <div className={styles.tradesBTC}>
                <h2>Aqui os Trades de BTC com calculo de retorno</h2>
                <div className='boxTrades'>
                    {novoTrade.map((a)=>(
                        <div className={styles.tradeItem}>
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
 */