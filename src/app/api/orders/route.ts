import { NextResponse } from "next/server";

export async function GET() {
  const rows = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    customer: ["Talayote","Wonderfields","Abogue","Byosberries"][i % 4],
    status: ["Pagado","Pendiente","Cancelado"][i % 3],
    amount: 1200 + i * 230,
  }));
  return NextResponse.json(rows);
}
