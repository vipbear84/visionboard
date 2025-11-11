"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log("login resp:", data);

            if (!res.ok || !data.ok) {
                setErrorMsg(data.message || "No se pudo iniciar sesión");
                return;
            }

            // 1) intento "bonito"
            router.replace("/");

            // 2) intento "forzado" por si el router no cambia
            setTimeout(() => {
                if (window.location.pathname === "/login") {
                    window.location.href = "/";
                }
            }, 300);
        } catch (err) {
            console.error(err);
            setErrorMsg("Error de red");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 border border-slate-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold mb-2">
                        V
                    </div>
                    <h1 className="text-xl font-semibold text-slate-900">
                        VisionBoard Login
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 text-center">
                        Ingresa tus credenciales para continuar
                    </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Usuario
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
                            placeholder="admin"
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
                            placeholder="••••••"
                        />
                    </div>
                    {errorMsg ? (
                        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                            {errorMsg}
                        </p>
                    ) : null}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}