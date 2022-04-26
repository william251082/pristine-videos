import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@utils/verifyToken";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req ? req.cookies?.token : ''
    const userId = await verifyToken(token)
    const {pathname, origin} = req.nextUrl.clone()

    if ((token && userId) || userId || pathname.includes(`/api/login`) || pathname.includes('/static')) {
        return NextResponse.next()
    }
    if (!token && pathname !== `/login`) {
        return NextResponse.redirect(`${origin}/login`)
    }
}
