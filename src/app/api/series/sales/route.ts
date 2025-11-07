import { NextResponse } from "next/server";

export async function GET() {
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const series = months.map((m, i) => ({ m, total: Math.round(6000 + Math.sin(i)*1500 + i*450) }));
  return NextResponse.json(series);
}
