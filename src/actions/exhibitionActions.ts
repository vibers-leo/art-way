// src/actions/exhibitionActions.ts
"use server";

import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";

export async function createExhibition(formData: FormData) {
  try {
    // 1. 폼 데이터 가져오기
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string; // 작가명 등
    const description = formData.get("description") as string; // 에디터 내용
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const is_main_slider = formData.get("is_main_slider") === "on"; // 체크박스 확인

    // 파일 가져오기 (이미지)
    const file = formData.get("poster_image") as File;

    if (!title || !file) {
      return { success: false, message: "제목과 포스터 이미지는 필수입니다." };
    }

    // 2. 이미지 업로드 (NCP 서버)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { url, error: uploadError } = await uploadImage(file, "images", `exhibitions/${fileName}`);

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      return { success: false, message: "이미지 업로드 실패" };
    }

    const finalImageUrl = url;

    // 3. DB에 정보 저장 (Prisma)
    const youtube_url = formData.get("youtube_url") as string;

    await prisma.exhibition.create({
      data: {
        title,
        artist: subtitle,
        description,
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
        is_active: true,
        poster_url: finalImageUrl,
        is_main_slider,
        youtube_url: youtube_url || null,
      },
    });

    // 4. 페이지 갱신
    revalidatePath("/");
    revalidatePath("/archive");
    revalidatePath("/admin/exhibition");

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "서버 내부 오류 발생" };
  }
}

export async function deleteExhibition(id: string) {
  await prisma.exhibition.delete({ where: { id } });

  revalidatePath("/admin/exhibition");
  revalidatePath("/archive");
  revalidatePath("/");
}
