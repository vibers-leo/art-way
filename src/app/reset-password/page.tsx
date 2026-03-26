// src/app/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oobCode, setOobCode] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { confirmReset } = useAuth();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    setOobCode(code);
  }, [searchParams]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    if (!oobCode) {
      setError("유효하지 않은 링크입니다. 비밀번호 재설정을 다시 요청해주세요.");
      setLoading(false);
      return;
    }

    try {
      await confirmReset(oobCode, password);
      setSuccess(true);
    } catch {
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-center mb-8">
          새 비밀번호 설정
        </h1>

        {success ? (
          <div className="space-y-6">
            <p className="text-sm text-center text-gray-700 leading-relaxed">
              비밀번호가 성공적으로 변경되었습니다.
            </p>
            <Link
              href="/login"
              className="block w-full bg-black text-white py-4 font-bold text-center hover:bg-gray-800 transition"
            >
              로그인하기
            </Link>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">
                새 비밀번호
              </label>
              <input
                name="password"
                type="password"
                className="w-full border p-3 focus:outline-none focus:border-black"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                비밀번호 확인
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full border p-3 focus:outline-none focus:border-black"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
