"use server";

import { prisma } from "@/lib/db";

// [방문자 수 증가] (누구나 호출 가능 — 내부적으로 처리)
export async function incrementVisitor() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const todayDate = new Date(today);

  // upsert: 오늘 날짜 레코드가 있으면 count+1, 없으면 생성
  await prisma.dailyStat.upsert({
    where: { date: todayDate },
    update: { count: { increment: 1 } },
    create: { date: todayDate, count: 1 },
  });
}

// [대시보드 통계 조회] (관리자용)
export async function getDashboardStats() {
  // 1. 전체 전시 수
  const exhibitionCount = await prisma.exhibition.count();

  // 2. 전체 미디어 수
  const mediaCount = await prisma.mediaRelease.count();

  // 3. 최근 30일 방문자 통계
  const rawStats = await prisma.dailyStat.findMany({
    orderBy: { date: "asc" },
    take: 30,
  });

  // Date → string 변환 (클라이언트에서 사용하기 위해)
  const visitorStats = rawStats.map((s) => ({
    ...s,
    date: s.date.toISOString().split("T")[0], // YYYY-MM-DD
  }));

  // 4. 오늘의 방문자 수
  const today = new Date().toISOString().split("T")[0];
  const todayStat = visitorStats.find((s) => s.date === today);

  return {
    exhibitionCount,
    mediaCount,
    todayVisitorCount: todayStat?.count || 0,
    visitorStats,
  };
}
