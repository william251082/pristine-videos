import {NextApiRequest, NextApiResponse} from "next";
import {magicAdmin} from "@lib/magic-server";
import jwt from "jsonwebtoken";
import {createNewUser, isNewUser} from "@lib/db/hasura";
import {setTokenCookie} from "@lib/cookies";
import {LoginResponse} from "@pages/api/types";
import {jwtSecret} from "@lib/jwt";

export default async function login(req:NextApiRequest, res: NextApiResponse<LoginResponse>) {
    if (req.method === 'POST') {
        try {
            const auth = req.headers.authorization
            const didToken = auth ? auth.substring(7) : ''
            const metaData = await magicAdmin.users.getMetadataByToken(didToken)
            const payload = {
                ...metaData,
                iat: Math.floor(Date.now()/1000),
                exp: Math.floor(Date.now()/1000 + 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["admin","user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": `${metaData.issuer}`
                }
            }
            const token = jwt.sign(payload, jwtSecret)
            const isNewUserQuery = await isNewUser(token, metaData.issuer)
            isNewUserQuery && (await createNewUser(token, metaData))
            setTokenCookie(token, res);
            res.send({done: true})
        } catch (err) {
            console.error('Something went wrong logging in.', err)
            res.status(500).send({done: false})
        }
    } else {
        res.send({done: false})
    }
}
