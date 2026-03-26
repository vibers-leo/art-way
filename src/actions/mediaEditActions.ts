// src/actions/mediaEditActions.ts — 보도자료 수정용 서버 액션
"use server";

import { prisma } from "@/lib/db";
import { supabaseStorage } from "@/lib/supabase-storage";
import { revalidatePath } from "next/cache";

// 보도자료 단건 조회
export async function getMediaById(id: string) {
  return prisma.mediaRelease.findUnique({ where: { id } });
}

// 이미지 URL null 처리 (이미지 삭제)
export async function clearMediaImage(id: string) {
  await prisma.mediaRelease.update({
    where: { id },
    data: { image_url: null },
  });
}

// 보도자료 수정 (이미지 업로드 포함)
export async function updateMedia(id: string, formData: FormData) {
  const imageFile = formData.get("image") as File;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  let image_url = existingImageUrl;

  // 새 이미지가 업로드된 경우 (Supabase Storage — 임시 유지)
  if (imageFile && imageFile.size > 0) {
    // 기존 이미지 Storage 삭제 시도
    if (existingImageUrl) {
      try {
        const urlParts = existingImageUrl.split('/');
        const oldFileName = urlParts[urlParts.length - 1].split('?')[0];
        if (oldFileName && oldFileName !== 'null' && oldFileName !== 'undefined') {
          await supabaseStorage.storage.from("media_images").remove([oldFileName]);
        }
      } catch (error) {
        console.error("기존 이미지 삭제 실패:", error);
      }
    }

    // 새 이미지 업로드
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabaseStorage.storage
      .from("media_images")
      .upload(fileName, imageFile);

    if (uploadError) {
      return { success: false, message: `이미지 업로드 실패: ${uploadError.message}` };
    }

    const { data: urlData } = supabaseStorage.storage
      .from("media_images")
      .getPublicUrl(fileName);
    image_url = urlData.publicUrl;
  }

  await prisma.mediaRelease.update({
    where: { id },
    data: {
      press_name: formData.get("press_name") as string,
      title: formData.get("title") as string,
      link_url: formData.get("link_url") as string,
      content: formData.get("content") as string,
      published_date: (formData.get("published_date") as string)
        ? new Date(formData.get("published_date") as string)
        : null,
      image_url,
    },
  });

  revalidatePath("/media");
  revalidatePath("/admin/media");

  return { success: true };
}
