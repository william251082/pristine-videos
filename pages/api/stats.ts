import {NextApiRequest} from "next";
import {DecodedToken, NextApiResponseStats} from "@pages/api/types";
import jwt from "jsonwebtoken";
import {jwtSecret} from "@lib/jwt";
import {findVideoIdByUser, insertStat, updateStat} from "@lib/db/hasura";

export default async function stats(req:NextApiRequest, res: NextApiResponseStats) {
    let token: string = ''
    let userId: string = ''
    let videoId: string = ''
    let doesStatExist: boolean = false
    let findVideo: [] = []
    try {
        const cookies = req.cookies
        if (cookies === undefined) {
            res.status(403).send({})
        } else {
            const inputParams = req.method === 'POST' ? req.body : req.query
            token = cookies.token
            videoId = inputParams.videoId
            const decoded = jwt.verify(token, jwtSecret)
            const decodedToken: DecodedToken = typeof decoded !== 'string' ? decoded : undefined
            userId = typeof decodedToken?.issuer === 'string' ? decodedToken?.issuer : ''
            findVideo = await findVideoIdByUser(token, userId, videoId)
            doesStatExist = findVideo?.length > 0
        }
        if (req.method === 'POST') {
            const {favourited, watched = true} = req.body
            if (doesStatExist) {
                const updatedStatRes = await updateStat(token, {
                    favourited, watched, userId, videoId
                })
                res.send({msg: "updated", updatedStatRes})
            } else {
                const insertedStatRes = await insertStat(token, {
                    favourited, watched, userId, videoId
                })
                res.send({msg: "inserted", insertedStatRes})
            }
        } else {
            if (doesStatExist) {
                res.send(findVideo)
            } else {
                res.status(404)
                res.send({user: null, msg: 'Video not found.'})
            }
        }
    } catch (error) {
        console.error('Error occurred in /stats', error)
        res.status(500).send({done: false, error})
    }
}
