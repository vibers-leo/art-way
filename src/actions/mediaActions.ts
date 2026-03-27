// src/actions/mediaActions.ts
"use server";

import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMedia(formData: FormData) {
  const title = formData.get("title") as string;
  const press_name = formData.get("press_name") as string;
  const link_url = formData.get("link_url") as string;
  const content = formData.get("content") as string;
  const published_date = formData.get("published_date") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !link_url) return;

  let image_url: string | null = null;

  // 이미지가 있으면 NCP 서버에 업로드
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { url, error } = await uploadImage(imageFile, "media_images", fileName);

    if (error) {
      console.error("Image upload error:", error);
    } else {
      image_url = url;
    }
  }

  await prisma.mediaRelease.create({
    data: {
      title,
      press_name,
      link_url,
      content,
      image_url,
      published_date: published_date ? new Date(published_date) : null,
    },
  });

  revalidatePath("/media");
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function deleteMedia(id: string) {
  await prisma.mediaRelease.delete({ where: { id } });

  revalidatePath("/admin/media");
  revalidatePath("/media");
}
