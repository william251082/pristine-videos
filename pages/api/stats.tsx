import {NextApiRequest} from "next";
import {NextApiResponseStats} from "@pages/api/types";

export default async function stats(req:NextApiRequest, res: NextApiResponseStats) {
    if (req.method === 'POST') {
        try {
            if (res.cookies === undefined) {
                res.status(403).send({})
            } else {
                res.send({msg: "it works"})
            }
        } catch (error) {
            console.error('Error occurred in /stats', error)
            res.status(500).send({done: false, error})
        }
    }
}
