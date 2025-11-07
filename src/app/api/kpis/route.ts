import { NextResponse } from "next/server";

export async function GET() {
  // TODO: reemplazar por consultas reales (Prisma/MySQL) en staging/prod
  const data = { sales: 128540, clients: 42, orders: 318, ar: 57900 };
  return NextResponse.json(data);
}
