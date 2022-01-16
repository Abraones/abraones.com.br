export default function Trades({data}){
    //console.log(data)
    const ativos = data.balances;
    
    const exAtivos = [
        {asset: 'BTC', free: 0.00100000 ,locked: 0.00000000},
        {asset: 'BUSD', free: 40.00000000 ,locked: 0.00000000},
        {asset: 'ETH', free: 0.00400000 ,locked: 0.00000000},
        {asset: 'LTC', free: 0.00000000 ,locked: 0.00000000}
    ]
    function ativosMaior(props){
        var comSaldo = [];
        props.map((props)=>{
            if(props.free > 0){
                comSaldo.push(props)
                
            }
        })
        return comSaldo
    }

    return(
        <div>
            <h1>Aqui aparecerão meus ativos</h1>

            {ativosMaior(ativos).map((ativo) =>(
                <p>{ativo.asset} : {ativo.free}</p>
            ))}

           {/*  {exAtivos.map((ativo) =>(
                <p>{ativo.asset} : {ativo.free}</p>
            ))} */}
            {/* {console.log(ativosMaior(exAtivos))} */}
            <h2></h2>
        </div>
    )
}

export const getStaticProps = async () => {
    //Conecta com a Binance
    const { Spot } = require('@binance/connector');
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.SECRET_KEY;
    const client = new Spot(apiKey, apiSecret);

    // Chama os dados do Metódo acconunt
    const response = await client.account();
    const data = await response.data

    return{
        props:{
            data
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