import {NextApiResponse} from "next";

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
export interface StatsResponse {
    [k: string]: any
    msg: string
}
export interface ResponseError {
    message: string
}
