import {NextApiRequest} from "next";
import {DecodedToken, NextApiResponseStats} from "@pages/api/types";
import jwt from "jsonwebtoken";
import {jwtSecret} from "@lib/jwt";
import {findVideoIdByUser} from "@lib/db/hasura";

export default async function stats(req:NextApiRequest, res: NextApiResponseStats) {
    if (req.method === 'POST') {
        try {
            const cookies = req.cookies
            if (cookies === undefined) {
                res.status(403).send({})
            } else {
                const token = cookies.token
                if (token !== undefined) {
                    const decoded = jwt.verify(token, jwtSecret)
                    const decodedToken: DecodedToken = typeof decoded !== 'string' ? decoded : undefined
                    const userId = typeof decodedToken?.issuer === 'string' ? decodedToken?.issuer : ''
                    const videoId = typeof req.query.videoId === 'string' ? req.query.videoId : ''
                    const findVideoId = await findVideoIdByUser(token, userId, videoId)
                    res.send({msg: "it works", decodedToken, findVideoId})
                }
            }
        } catch (error) {
            console.error('Error occurred in /stats', error)
            res.status(500).send({done: false, error})
        }
    }
}
