import { PrismaClient } from "@prisma/client";

// esto es para no crear mil PrismaClient en dev (Next recarga y si no haces esto truena)
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["warn", "error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}