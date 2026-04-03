import exifr from "exifr";

export async function extractExifDate(file: File): Promise<number | null> {
  try {
    const exif = await exifr.parse(file, {
      pick: ["DateTimeOriginal", "CreateDate", "ModifyDate"],
    });
    if (exif?.DateTimeOriginal) {
      return new Date(exif.DateTimeOriginal).getTime();
    }
    if (exif?.CreateDate) {
      return new Date(exif.CreateDate).getTime();
    }
    if (exif?.ModifyDate) {
      return new Date(exif.ModifyDate).getTime();
    }
  } catch {
    // EXIF extraction failed, that's fine
  }
  return null;
}

export async function createThumbnail(
  img: HTMLImageElement,
  maxSize: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  let w = img.naturalWidth;
  let h = img.naturalHeight;

  if (w > h) {
    if (w > maxSize) {
      h = Math.round((h * maxSize) / w);
      w = maxSize;
    }
  } else {
    if (h > maxSize) {
      w = Math.round((w * maxSize) / h);
      h = maxSize;
    }
  }

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      "image/jpeg",
      0.7
    );
  });
}
