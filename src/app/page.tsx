import { prisma } from "@/lib/db";
import MainSlider from "@/components/MainSlider";

// 데이터가 계속 바뀌므로 캐싱하지 않음 (새로고침 시 즉시 반영)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  console.log("--------------- [메인 페이지 로드 시작] ---------------");

  // 1. 메인 슬라이더용 전시 데이터 가져오기
  const exhibitions = await prisma.exhibition.findMany({
    where: { is_main_slider: true },
    orderBy: { created_at: "desc" },
  });

  console.log(`✅ 전시 데이터: ${exhibitions.length}개 로드됨`);

  // 2. 배경 유튜브 URL 가져오기
  const bannerData = await prisma.mainBanner.findFirst({
    where: { is_active: true },
    select: { youtube_url: true },
  });

  console.log("✅ 배너 데이터:", bannerData);

  // 3. 데이터 가공
  const slides = exhibitions || [];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* 🖼️ [컨텐츠 레이어] (슬라이더 + 배경) */}
      <div className="relative z-10 h-full w-full pt-16">
        {slides.length > 0 ? (
          <MainSlider
            exhibitions={slides}
            fallbackYoutubeUrl={bannerData?.youtube_url}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
            <p className="text-lg font-light tracking-widest">EXHIBITION PREPARING</p>
            <p className="text-xs">현재 진행 중인 전시가 준비 중입니다.</p>
          </div>
        )}
      </div>

    </div>
  );
}
