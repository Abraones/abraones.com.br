import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Acesso a API da Binance
        const { Spot } = require('@binance/connector');
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.SECRET_KEY;
        const client = new Spot(apiKey, apiSecret);
        // Get account information
        //const cliente = client.account().then(response => {client.logger.log(response.data)}) 
        

        const conta = await client.account()
        const trades = await client.myTrades("BTCBUSD")

        //const teste = await JSON.stringify(conta)


        const ativos = conta.balances
        //const tradesString = trades.toString()

        console.log(trades)
        
        res.status(200).json(conta)
    } catch(err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}

export default handler