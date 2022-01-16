export default function Trades({saldo, trades, price}){

    return(
        <div>
            <h1>Aqui aparecerão meus ativos</h1>
            {saldo.map((a, index)=>(
                 <p key={index}>{a.asset} : {a.free}</p>
            ))}
            <h2>Aqui os Trades de BTC</h2>
            {//console.log(trades.btc)

            trades.btc.map((a)=>(
                <p key={a.id}>
                    Quando: {a.time}
                    Preço: {a.price}
                    Quantidade: {a.quoteQty}
                    Preço Atual: {price.btc.price}
                    Retorno : {(price.btc.price - a.price)*100/price.btc.price}
                </p>
            ))
            
            }

        </div>
    )
}

export const getStaticProps = async () => {
    //Conecta com a Binance
    const { Spot } = require('@binance/connector');
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.SECRET_KEY;
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

    console.log(priceBTC)

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
            trades:{
                btc: tradesBTC
            },
            price:{
                btc: priceBTC
            }
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