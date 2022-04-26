import jwt from "jsonwebtoken";
import {jwtSecret} from "@lib/jwt";
import {DecodedToken} from "@pages/api/types";

export async function verifyToken(token: string): Promise<string> {
    let userId: string = ''
    if (token) {
        const decoded = jwt.verify(token, jwtSecret)
        const decodedToken: DecodedToken = typeof decoded !== 'string' ? decoded : undefined
        userId = typeof decodedToken?.issuer === 'string' ? decodedToken?.issuer : ''
    }
    return userId;
}
