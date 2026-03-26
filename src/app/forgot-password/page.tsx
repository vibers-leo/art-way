// src/app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-context";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const email = formData.get("email") as string;

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch {
      setError("비밀번호 재설정 이메일 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-center mb-8">
          비밀번호 찾기
        </h1>

        {success ? (
          <div className="space-y-6">
            <p className="text-sm text-center text-gray-700 leading-relaxed">
              비밀번호 재설정 링크를 이메일로 전송했습니다.
              <br />
              이메일을 확인해주세요.
            </p>
            <Link
              href="/login"
              className="block w-full bg-black text-white py-4 font-bold text-center hover:bg-gray-800 transition"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border p-3 focus:outline-none focus:border-black"
                required
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
              {loading ? "전송 중..." : "재설정 링크 전송"}
            </button>

            <Link
              href="/login"
              className="block text-sm text-center text-gray-500 hover:text-black transition"
            >
              로그인으로 돌아가기
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
