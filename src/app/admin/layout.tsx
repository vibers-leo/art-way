"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/components/auth/auth-context";
import VibersBanner from "@/components/VibersBanner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // 로딩 중이거나 미인증 상태일 때
    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Admin Header / Nav */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="font-serif font-bold text-xl">
                            ARTWAY ADMIN
                        </Link>
                        <nav className="flex gap-6 text-sm font-medium text-gray-500">
                            <Link
                                href="/admin"
                                className="hover:text-black transition-colors"
                            >
                                대시보드
                            </Link>
                            <Link
                                href="/admin/exhibition"
                                className="hover:text-black transition-colors"
                            >
                                전시 관리
                            </Link>
                            <Link
                                href="/admin/media"
                                className="hover:text-black transition-colors"
                            >
                                언론보도 관리
                            </Link>
                            <Link
                                href="/admin/inquiry"
                                className="hover:text-black transition-colors"
                            >
                                문의 관리
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="hover:text-black transition-colors"
                            >
                                사이트 설정
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                나가기
                            </Button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>

            {children}
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 16px' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>계발자들 프로젝트</p>
                <VibersBanner size="medium" currentProject="art-way" />
            </div>
        </div>
    );
}
