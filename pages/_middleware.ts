import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req ? req.cookies?.token : ''
    const {pathname, origin} = req.nextUrl.clone()

    if (token || pathname.includes(`/api/login`) || pathname.includes('/static')) {
        return NextResponse.next()
    }
    if (!token && pathname !== `/login`) {
        return NextResponse.redirect(`${origin}/login`)
    }
}
