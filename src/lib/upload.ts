// lib/upload.ts — NCP 이미지 서버 업로드 유틸리티
// 이미지를 http://49.50.138.93:8090 서버에 업로드하고 공개 URL을 반환

const IMAGE_SERVER = "http://49.50.138.93:8090";

/**
 * 서버 사이드에서 이미지를 NCP 서버에 업로드
 * @param file - 업로드할 파일
 * @param bucket - 버킷/폴더 이름 (예: "images", "posters", "media_images")
 * @param path - 파일 경로 (예: "editor/filename.jpg")
 * @returns 업로드된 이미지의 공개 URL
 */
export async function uploadImage(
  file: File,
  bucket: string,
  path?: string
): Promise<{ url: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    if (path) formData.append("path", path);

    const res = await fetch(`${IMAGE_SERVER}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return { url: "", error: `업로드 실패 (${res.status}): ${text}` };
    }

    const data = await res.json();
    // 서버가 반환하는 URL 형식에 맞춰 조정
    const url = data.url || `${IMAGE_SERVER}/${bucket}/${path || data.filename}`;
    return { url };
  } catch (error) {
    return { url: "", error: `업로드 오류: ${String(error)}` };
  }
}

/**
 * 서버 사이드에서 NCP 서버의 이미지를 삭제
 * @param bucket - 버킷/폴더 이름
 * @param fileName - 삭제할 파일명
 */
export async function deleteImage(
  bucket: string,
  fileName: string
): Promise<{ error?: string }> {
  try {
    const res = await fetch(`${IMAGE_SERVER}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucket, fileName }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { error: `삭제 실패 (${res.status}): ${text}` };
    }

    return {};
  } catch (error) {
    return { error: `삭제 오류: ${String(error)}` };
  }
}
