import {NextApiRequest} from "next";
import {NextApiResponseStats} from "@pages/api/types";
import jwt from "jsonwebtoken";
import {jwtSecret} from "@lib/jwt";

export default async function stats(req:NextApiRequest, res: NextApiResponseStats) {
    if (req.method === 'POST') {
        try {
            const cookies = res.cookies
            if (cookies === undefined) {
                res.status(403).send({})
            } else {
                const token = cookies.token
                if (token !== undefined) {
                    const decoded = jwt.verify(token, jwtSecret)
                    res.send({msg: "it works", decoded})
                }
            }
        } catch (error) {
            console.error('Error occurred in /stats', error)
            res.status(500).send({done: false, error})
        }
    }
}
