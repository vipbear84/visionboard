import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1) rutas públicas (no pedir login)
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/api/auth/login") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico")
    ) {
        return NextResponse.next();
    }

    // 2) revisar cookie
    const session = req.cookies.get("vb_session")?.value;

    if (!session) {
        // no hay cookie → manda a login
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // 3) sí hay cookie → pasa
    return NextResponse.next();
}

// qué rutas van a pasar por aquí
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};