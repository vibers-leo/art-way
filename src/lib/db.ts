// src/lib/db.ts — Prisma 클라이언트 싱글톤 (Prisma 7 + PG 어댑터)
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// 개발 환경에서 핫 리로드 시 클라이언트 재생성 방지
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
