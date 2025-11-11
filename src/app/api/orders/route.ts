import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  // leemos las órdenes de la BD
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Prisma te regresa Decimal, fecha, etc. Lo normalizamos
  const formatted = orders.map((o) => ({
    id: o.id,
    customer: o.customer,
    status: o.status,
    amount: Number(o.amount),      // <-- para que tu tabla pueda hacer toLocaleString
    createdAt: o.createdAt,        // por si luego la muestras
  }));

  return NextResponse.json(formatted);
}