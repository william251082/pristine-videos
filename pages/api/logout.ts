import {NextApiRequest, NextApiResponse} from "next";
import {LogoutResponse} from "@pages/api/types";
import {verifyToken} from "@utils/verifyToken";
import {removeTokenCookie} from "@lib/cookies";
import {magicAdmin} from "@lib/magic-server";

export default async function logout(req:NextApiRequest, res: NextApiResponse<LogoutResponse>) {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({ message: "User is not logged in" })
        }
        const token = req.cookies.token
        const userId = await verifyToken(token)
        removeTokenCookie(res)
        try {
            console.log(userId)
            await magicAdmin.users.logoutByIssuer(userId);
        } catch (error) {
            console.log("User's session with Magic already expired")
            console.error("Error occurred while logging out magic user", error)
        }
        res.writeHead(302, { Location: "/login" })
        res.end()
    } catch (error) {
        console.error({ error })
        res.status(401).json({ message: "User is not logged in" })
    }
}
