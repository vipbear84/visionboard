"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default function Page() {
    const router = useRouter();

    async function handleLogout() {
        // llamamos a la API que borra la cookie
        await fetch("/api/auth/logout");
        // y nos vamos al login
        router.replace("/login");
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {/* barra superior */}
            <header className="w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between">
                <h1 className="text-lg md:text-xl font-semibold text-slate-800">
                    VisionBoard
                </h1>
                <button
                    onClick={handleLogout}
                    className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition"
                >
                    Cerrar sesión
                </button>
            </header>

            {/* contenido original */}
            <main className="mx-auto max-w-7xl p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    Dashboard (deploy de prueba5)
                </h2>
                <Suspense fallback={<div>Cargando…</div>}>
                    <DashboardClient />
                </Suspense>
            </main>
        </div>
    );
}