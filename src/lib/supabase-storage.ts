// lib/supabase-storage.ts — Supabase Storage 전용 (DB는 Prisma 사용)
// 추후 NCP 스토리지로 전환 시 이 파일만 교체하면 됨

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase Storage 환경 변수를 찾을 수 없습니다. .env.local 파일을 확인하세요."
  );
}

// Storage 전용 클라이언트
export const supabaseStorage = createClient(supabaseUrl, supabaseAnonKey);
