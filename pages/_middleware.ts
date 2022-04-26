import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    // check the token
    // if token is valid or page is /login
    return NextResponse.next()

    // if no token
    // redirect to login
}
