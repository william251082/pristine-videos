import {NextApiRequest, NextApiResponse} from "next";
import {magicAdmin} from "@lib/magic-server";

export interface ObjectExtend {
    [k: string]: any;
}

export default async function login(req:NextApiRequest, res: NextApiResponse<ObjectExtend>) {
    if (req.method === 'POST') {
        try {
            const auth = req.headers.authorization
            const didToken = auth ? auth.substring(7) : ''
            // invoke magic
            const metaData = await magicAdmin.users.getMetadataByToken(didToken)
            res.send({done: true})
        } catch (err) {
            console.error('Something went wrong logging in.', err)
            res.status(500).send({done: true})
        }
    } else {
        res.send({done: false})
    }
}
