"use client";

import { useAuth } from "@/components/auth/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// 전시 관리 버튼
export function AdminExhibitionButton() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <Button asChild className="bg-black text-white hover:bg-gray-800 gap-2">
      <Link href="/admin/exhibition">
        <Plus size={16} /> 전시 등록 및 관리
      </Link>
    </Button>
  );
}

// 미디어 관리 버튼
export function AdminMediaButton() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <Button asChild className="bg-black text-white hover:bg-gray-800 gap-2">
      <Link href="/admin/media">
        <Plus size={16} /> 보도자료 등록 및 관리
      </Link>
    </Button>
  );
}
