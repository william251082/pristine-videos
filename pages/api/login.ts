import {NextApiRequest, NextApiResponse} from "next";

export interface ObjectExtend {
    [k: string]: any;
}

export default async function login(req:NextApiRequest, res: NextApiResponse<ObjectExtend>) {
    if (req.method === 'POST') {
        try {
            res.send({done: true})
        } catch (err) {
            console.error('Something went wrong logging in.', err)
            res.status(500).send({done: true})
        }
    } else {
        res.send({done: false})
    }
}
