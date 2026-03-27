// api/upload/route.ts — 클라이언트 → NCP 이미지 서버 프록시
import { NextRequest, NextResponse } from "next/server";

const IMAGE_SERVER = "http://49.50.138.93:8090";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // NCP 서버로 그대로 전달
    const res = await fetch(`${IMAGE_SERVER}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `업로드 실패: ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `서버 오류: ${String(error)}` },
      { status: 500 }
    );
  }
}
