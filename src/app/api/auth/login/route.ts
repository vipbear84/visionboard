// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json(
            { ok: false, message: "Faltan datos" },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user || user.password !== password) {
        return NextResponse.json(
            { ok: false, message: "Usuario o contraseña incorrectos" },
            { status: 401 }
        );
    }

    // crear respuesta
    const res = NextResponse.json({
        ok: true,
        user: { id: user.id, username: user.username },
    });

    // poner cookie simple (luego la ciframos)
    res.cookies.set("vb_session", String(user.id), {
        httpOnly: true,
        secure: false, // pon true cuando ya estés en https
        path: "/",
        maxAge: 60 * 60 * 8, // 8 horas
    });

    return res;
}