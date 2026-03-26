
import { prisma } from "@/lib/db";
import ArchiveClient from "@/components/ArchiveClient";
import { AdminExhibitionButton } from "@/components/AdminButtons";

// ISR 적용: 60초마다 캐시 갱신
export const revalidate = 60;

export default async function ArchivePage() {
  // 1. 전시 데이터 가져오기 (DB)
  const exhibitions = await prisma.exhibition.findMany({
    orderBy: { start_date: "desc" },
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-6 mt-8 py-12 md:py-20 relative">
      <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl">Exhibition Archive</h2>

        {/* 관리자에게만 보이는 등록 버튼 (클라이언트 사이드 체크) */}
        <AdminExhibitionButton />
      </div>

      {/* 기존 모달 스타일 유지 */}
      <ArchiveClient initialData={exhibitions || []} />
    </div>
  );
}
