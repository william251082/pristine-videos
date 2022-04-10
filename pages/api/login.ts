import {NextApiRequest, NextApiResponse} from "next";
import {magicAdmin} from "@lib/magic-server";
import jwt from "jsonwebtoken";
import {createNewUser, isNewUser} from "@lib/db/hasura";
import {setTokenCookie} from "@lib/cookies";

export interface ObjectExtend {
    [k: string]: any;
}

export default async function login(req:NextApiRequest, res: NextApiResponse<ObjectExtend>) {
    if (req.method === 'POST') {
        try {
            const jwtSecret = typeof process.env.NEXT_PUBLIC_JWT_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_JWT_SECRET : ''
            const auth = req.headers.authorization
            const didToken = auth ? auth.substr(7) : ''
            const metaData = await magicAdmin.users.getMetadataByToken(didToken)
            const token = jwt.sign({
                ...metaData,
                "iat": Math.floor(Date.now()/1000),
                "exp": Math.floor(Date.now()/1000 + 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["admin","user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": `${metaData.issuer}`
                }
            }, jwtSecret)
            const isNewUserQuery = await isNewUser(token, metaData.issuer)
            if (isNewUserQuery) {
                await createNewUser(token, metaData)
                isNewUserQuery && (await createNewUser(token, metaData))
                res.send({done: true, msg: didToken})
                setTokenCookie(token, res);
            } else {
                res.send({done: true, msg: 'not a new user'})
            }
        } catch (err) {
            console.error('Something went wrong logging in.', err)
            res.status(500).send({done: true})
        }
    } else {
        res.send({done: false})
    }
}
