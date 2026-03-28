import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Serif_KR, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import VisitorTracker from "@/components/VisitorTracker";
import { AuthProvider } from "@/components/auth/auth-context";

import { getSiteSettings } from "@/actions/settingsActions";

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = "Artway Gallery";
  const description = settings?.og_description || "부산 동구 문화 예술 공간";
  const ogImage = settings?.og_image_url ? [settings.og_image_url] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
      url: "https://art-way.vercel.app",
      siteName: "Artway Gallery",
      type: "website",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans text-gray-900 bg-white selection:bg-black selection:text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGK1BSBM63"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CGK1BSBM63');
          `}
        </Script>
        <AuthProvider>
          {/* 방문자 추적기 (관리자 통계용) */}
          <VisitorTracker />

          {/* 헤더 */}
          <Header />

          {/* 메인 컨텐츠 */}
          <main className="min-h-screen">
              {children}
          </main>

          {/* 푸터 */}
          <footer className="py-24 border-t border-gray-100 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-gray-400 text-xs font-light">

              {/* 왼쪽: 주소 및 연락처 */}
              <div>
                <p className="mb-2 font-serif text-black text-sm">
                  아트웨이 갤러리 ARTWAY GALLERY
                </p>
                <p>부산광역시 동구 정공단로 9</p>
                <p>T. 0507-1369-8386 | E. artway_gallery@naver.com</p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/artwaygallery_story/"
                  target="_blank"
                  className="hover:text-black transition"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://blog.naver.com/art_way_"
                  target="_blank"
                  className="hover:text-black transition"
                >
                  BLOG
                </a>
                <a
                  href="https://www.youtube.com/@artwaygallerybusan"
                  target="_blank"
                  className="hover:text-black transition"
                >
                  YOUTUBE
                </a>
              </div>

            </div>
            <div className="max-w-screen-2xl mx-auto px-6 mt-12 pt-8 border-t border-gray-100 flex justify-center gap-6 text-[10px] text-gray-400">
              <a href="/privacy" className="hover:text-black transition">개인정보처리방침</a>
              <a href="/terms" className="hover:text-black transition">이용약관</a>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
