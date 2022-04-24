import {NextApiRequest} from "next";
import {NextApiResponseStats} from "@pages/api/types";
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
                    const userId = 'william'
                    const videoId = 'vXk2Z1dy_gA'
                    const findVideoId = await findVideoIdByUser(token, userId, videoId)
                    res.send({msg: "it works", decoded, findVideoId})
                }
            }
        } catch (error) {
            console.error('Error occurred in /stats', error)
            res.status(500).send({done: false, error})
        }
    }
}
