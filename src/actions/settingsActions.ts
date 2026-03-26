"use server";

import { prisma } from "@/lib/db";
import { supabaseStorage } from "@/lib/supabase-storage";
import { revalidatePath } from "next/cache";

// 설정 조회
export async function getSiteSettings() {
  try {
    const data = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// 설정 업데이트
export async function updateSiteSettings(formData: FormData) {
  // 참고: Firebase Auth 인증은 클라이언트에서 처리하므로 여기서는 생략
  // (기존 Supabase auth.getUser() 제거)

  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  let imageUrl = formData.get("existingImage") as string;

  // 새 이미지가 업로드된 경우 (Supabase Storage — 임시 유지)
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `og-image-${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabaseStorage.storage
      .from("images")
      .upload(filePath, imageFile);

    if (uploadError) {
      return { error: "이미지 업로드 실패: " + uploadError.message };
    }

    const { data: publicUrlData } = supabaseStorage.storage
      .from("images")
      .getPublicUrl(filePath);

    imageUrl = publicUrlData.publicUrl;
  }

  // DB 업데이트 (Prisma upsert)
  try {
    await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: {
        og_description: description,
        og_image_url: imageUrl,
        updated_at: new Date(),
      },
      create: {
        id: 1,
        og_description: description,
        og_image_url: imageUrl,
      },
    });
  } catch (error) {
    return { error: "설정 저장 실패: " + String(error) };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");

  return { success: true };
}
