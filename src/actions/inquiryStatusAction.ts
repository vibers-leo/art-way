// src/actions/inquiryStatusAction.ts — 문의 상태 변경 서버 액션
"use server";

import { prisma } from "@/lib/db";

export async function updateInquiryStatus(id: string, newStatus: "new" | "read" | "done") {
  await prisma.inquiry.update({
    where: { id },
    data: { status: newStatus },
  });
}
