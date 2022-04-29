import {NextApiResponse} from "next";
import {JwtPayload} from "jsonwebtoken";

export type NextApiResponseStats = NextApiResponse & {
    cookies?: { token?: string }
    status: (statusCode: number) => NextApiResponse<LoginResponse>
    send: (body: StatsResponse) => void
}
export interface LoginResponse {
    [k: string]: any
    done: boolean
    error?: ResponseError
}
export interface LogoutResponse {
    [k: string]: any
    error?: ResponseError
    message: string
}
export interface StatsResponse {
    [k: string]: any
    msg: string
}
export interface ResponseError {
    message: string
}
export interface HasuraPayloadToken extends JwtPayload {
    [k: string]: any
    issuer?: string
    publicAddress: string
    email: string
    oauthProvider: string | null
    phoneNumber: string | null
    iat: number
    exp: number
    'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': string[]
        'x-hasura-default-role': string
        'x-hasura-user-id': string
    }
}
export type DecodedToken = HasuraPayloadToken | JwtPayload | string | undefined
