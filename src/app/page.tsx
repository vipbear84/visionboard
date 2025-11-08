import { Suspense } from "react";
import DashboardClient from "./dashboard-client";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard (deploy de prueba)</h1>
      <Suspense fallback={<div>Cargando…</div>}>
        <DashboardClient />
      </Suspense>
    </main>
  );
}
