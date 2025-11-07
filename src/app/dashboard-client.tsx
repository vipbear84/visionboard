"use client";

import { useQuery } from "@tanstack/react-query";
import Chart from "@/components/chart";

function useKPIs() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async () => (await fetch("/api/kpis")).json(),
  });
}

function useSalesSeries() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => (await fetch("/api/series/sales")).json() as Promise<{m:string,total:number}[]>,
  });
}

function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await fetch("/api/orders")).json(),
  });
}

export default function DashboardClient() {
  const { data: kpis } = useKPIs();
  const { data: series } = useSalesSeries();
  const { data: orders } = useOrders();

  const lineOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: series?.map((r:any)=>r.m) ?? [] },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        smooth: true,
        areaStyle: {},
        data: series?.map((r:any)=>r.total) ?? [],
      },
    ],
  };

  const stackedOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Pagado","Pendiente","Cancelado"] },
    xAxis: { type: "category", data: (series ?? []).map((r:any)=>r.m) },
    yAxis: { type: "value" },
    series: ["Pagado","Pendiente","Cancelado"].map((name) => ({
      name,
      type: "bar",
      stack: "total",
      emphasis: { focus: "series" },
      data: (series ?? []).map((_, i:number) =>
        name === "Pagado" ? 800+i*40 : name === "Pendiente" ? 300 - i*10 : 120 + (i%3)*15
      ),
    })),
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Ventas" value={kpis?.sales ?? 0} prefix="$" />
        <KPI title="Clientes" value={kpis?.clients ?? 0} />
        <KPI title="Órdenes" value={kpis?.orders ?? 0} />
        <KPI title="CXC" value={kpis?.ar ?? 0} prefix="$" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-xl bg-white">
          <h2 className="font-medium mb-2">Ventas mensuales</h2>
          <Chart option={lineOption} height={320} />
        </div>
        <div className="p-4 border rounded-xl bg-white">
          <h2 className="font-medium mb-2">Estado de órdenes</h2>
          <Chart option={stackedOption} height={320} />
        </div>
      </div>

      {/* Tabla */}
      <div className="p-4 border rounded-xl bg-white overflow-auto">
        <h2 className="font-medium mb-3">Órdenes recientes</h2>
        <table className="min-w-[560px] w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Cliente</th>
              <th className="text-left p-2">Estatus</th>
              <th className="text-right p-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((r:any) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.customer}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2 text-right">${Number(r.amount).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPI({ title, value, prefix = "" }:{title:string; value:number; prefix?:string}) {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold mt-1">{prefix}{Number(value).toLocaleString()}</div>
    </div>
  );
}
