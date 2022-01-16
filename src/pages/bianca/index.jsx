export default function Trades({data}){
    //console.log(data)
    const ativos = data.balances;
    
    const meusAtivos = ativos.map(()=>{
        return ativos.free > 0.00000000 
    })
    //console.log(meusAtivos)
    

    return(
        <div>
            <h1>Aqui aparecerão meus ativos</h1>
            {ativos.map((ativo) =>(
                <p>{ativo.asset} : {ativo.free}</p>
            ))}
            <h2></h2>
        </div>
    )
}



export const getStaticProps = async () => {

    const { Spot } = require('@binance/connector');
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.SECRET_KEY;
    const client = new Spot(apiKey, apiSecret);

    const response = await client.account();
    const data = await response.data
    //console.log(response.data.balances)
   
    //const data = await res.json()

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