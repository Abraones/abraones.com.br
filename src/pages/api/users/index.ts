import { NextApiRequest, NextApiResponse } from "next";


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Acesso a API da Binance
        /* const { Spot } = require('@binance/connector');
        const apiKey = "f9ptAU0dv3MK3pYkcvd9pHl1elZCwQVmFSJO5O2xR2tuUyPksyN24OqDs0dKkLFP";
        const apiSecret = "1k1ZJtXLCsLSfyHYvDOjz4RdcQpLU4Hn6i1Js0ocaRg7GRNsSob50hZ1MXTKouQf";
        const client = new Spot(apiKey, apiSecret);
        // Get account information
        const cliente = client.account().then(response => client.logger.log(response.data)) */

        res.status(200).json([ 
            {id: 1, name:"cliente"}
        ])
    } catch(err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}

export default handler