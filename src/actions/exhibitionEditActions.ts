// src/actions/exhibitionEditActions.ts — 전시 수정용 서버 액션
"use server";

import { prisma } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// 전시 단건 조회
export async function getExhibitionById(id: string) {
  return prisma.exhibition.findUnique({ where: { id } });
}

// 포스터 이미지 null 처리
export async function clearExhibitionPoster(id: string) {
  await prisma.exhibition.update({
    where: { id },
    data: { poster_url: null },
  });
}

// 전시 수정 (이미지 업로드 포함)
export async function updateExhibition(id: string, formData: FormData) {
  const imageFile = formData.get("poster") as File;
  const existingPosterUrl = formData.get("existing_poster_url") as string | null;

  let poster_url = existingPosterUrl;

  // 새 이미지가 업로드된 경우 (NCP 서버)
  if (imageFile && imageFile.size > 0) {
    // 기존 이미지 삭제 시도
    if (existingPosterUrl) {
      try {
        const urlParts = existingPosterUrl.split('/');
        const oldFileName = urlParts[urlParts.length - 1].split('?')[0];
        if (oldFileName && oldFileName !== 'null' && oldFileName !== 'undefined') {
          await deleteImage("posters", oldFileName);
        }
      } catch (error) {
        console.error("기존 이미지 삭제 실패:", error);
      }
    }

    // 새 이미지 업로드
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { url, error: uploadError } = await uploadImage(imageFile, "posters", fileName);

    if (uploadError) {
      return { success: false, message: `이미지 업로드 실패: ${uploadError}` };
    }

    poster_url = url;
  }

  const descHtml = formData.get("description") as string;

  await prisma.exhibition.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      artist: formData.get("artist") as string,
      start_date: (formData.get("start_date") as string) ? new Date(formData.get("start_date") as string) : null,
      end_date: (formData.get("end_date") as string) ? new Date(formData.get("end_date") as string) : null,
      description: descHtml,
      poster_url,
      is_active: formData.get("is_active") === "on",
      is_main_slider: formData.get("is_main_slider") === "on",
      youtube_url: (formData.get("youtube_url") as string) || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/archive");
  revalidatePath("/admin/exhibition");

  return { success: true };
}
