import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Allow login page without cookie
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const isLoggedIn = request.cookies.get("folio_admin")?.value === "1";

    if (!isLoggedIn) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};