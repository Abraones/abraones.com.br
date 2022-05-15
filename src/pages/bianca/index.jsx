import Head from 'next/head'
import Carteira from '../../components/Carteira'
import Trades from '../../components/Trades'
import styles from '../../styles/Bianca.module.scss'

export default function Bianca({saldo, trades, price, allTrades}){

    //console.log(cleber)
    //console.log(trades)
    //console.log(price.btc.price)
    //console.log(allTrades)
 
    

    return(
        <div className={styles.container}>
            <Head>
                <title>Bianca</title>
            </Head>

            <div className={styles.headbar}>
                
            </div>


            <div className={styles.info}>
                <a href='/'> <h1>Bianca</h1> </a> 
                <p>Seja bem vindo a Bianca, minha página de consumo da API da Binance. </p>
                <p>Tá feio, mas funciona</p>
                <p>Documentação: <a href="https://binance.github.io/binance-connector-node/index.html" >Connector Binance Node</a></p>

            </div>

            <Carteira saldo={saldo}></Carteira>

            <Trades trades={allTrades} />

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
    const myBalance = await response.data.balances
    // Captura Trades de BTC com BUSD
    const resBTC = await client.myTrades('BTCBUSD')
    const tradesBTC = await resBTC.data
    //Puxar preço
    const resPriceBTC = await client.tickerPrice('BTCBUSD')
    const priceBTC = await resPriceBTC.data

    
    //const arrayTrades = await Promise.all(allTrades);
    
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
    const saldo = comSaldo(myBalance)

    //console.log(saldo)


    function withTrade(){
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

    const pares = withTrade()
 
    ////// my test

    function saldoModificado(props){
       // console.log(props)
        let saldinho = []
        props.map((a)=>{
            //console.log(a)
            const joana =  (a.asset + 'BUSD') 
            if (a.asset !== 'BUSD' &&  a.asset !== 'BRL'){
                
                saldinho.push({...a, par : joana })   
              
               
            }else {
                saldinho.push({...a, par : a.asset })     
            }
           // console.log(a.par)        
        })
       //console.log(saldinho)
        return saldinho
    }

    const saldao = saldoModificado(saldo)
    //console.log(saldao)

    ////// my test

    
    //console.log(aDolarPrice)




    const takeAllPrices = saldao.map(async function(a){
        switch(a.par){
            case 'BRL':
                const dolarprice = await client.tickerPrice('BUSDBRL')
                const seilas = parseFloat(dolarprice.data.price)
                a.value = ( parseFloat(a.free) / parseFloat(dolarprice.data.price)).toFixed(2)
                a.price = seilas.toFixed(2)
                break
            case 'BUSD':
                const dolar = 1
                a.price = dolar.toFixed(2)
                a.value = parseFloat(a.free).toFixed(2)
                break
            default:
                const precoIndividual = await client.tickerPrice(a.par)
                const precoIndividualData = precoIndividual.data
                const numberPrice = parseFloat(precoIndividualData.price)
                const numberQnt = parseFloat(a.free)
                const valueAsset = (numberPrice * numberQnt)

                const tradesAsset = await client.myTrades(a.par)
                const dataTradeAsset = tradesAsset.data

                a.trades = dataTradeAsset
                a.value = valueAsset.toFixed(2)
                a.price = numberPrice.toFixed(2)
                break

        }
 
        return {...a} 
    })
    const saldoComPreco = await Promise.all(takeAllPrices)
    console.log(saldoComPreco)



    const allParTrades = pares.map(async function(a){
          
        const par = a
        const aTrade = await client.myTrades(a)
        const aPrice = await client.tickerPrice(a)
        const dataPrice = aPrice.data
        const dataTrade = aTrade.data
        const infosTrade = {
            par: par,
            price: dataPrice,
            data: dataTrade
        }
        return infosTrade
    })
    
    const arrayAllTrades = await Promise.all(allParTrades);





    return{
        props:{
            saldo : saldoComPreco, 
            trades:{btc: tradesBTC},
            price:{btc: priceBTC},
            allTrades : arrayAllTrades
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