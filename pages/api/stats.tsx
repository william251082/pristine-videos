import {NextApiRequest} from "next";
import {DecodedToken, NextApiResponseStats} from "@pages/api/types";
import jwt from "jsonwebtoken";
import {jwtSecret} from "@lib/jwt";
import {findVideoIdByUser, insertStat, updateStat} from "@lib/db/hasura";

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
                    const doesStatExist = await findVideoIdByUser(token, userId, videoId)
                    if (doesStatExist) {
                        const updatedStatRes = await updateStat(token, {
                            favourited: 0, watched: false, userId, videoId
                        })
                        res.send({msg: "it works", updatedStatRes})
                    } else {
                        const insertedStatRes = await insertStat(token, {
                            favourited: 0, watched: false, userId, videoId
                        })
                        res.send({msg: "it works", insertedStatRes})
                    }
                }
            }
        } catch (error) {
            console.error('Error occurred in /stats', error)
            res.status(500).send({done: false, error})
        }
    }
}
