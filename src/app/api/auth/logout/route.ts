import { NextResponse } from "next/server";

export async function GET() {
    const res = NextResponse.redirect("/login");

    res.cookies.set("vb_session", "", {
        httpOnly: true,
        secure: false, // pon true en producción https
        path: "/",
        maxAge: 0,
    });

    return res;
}