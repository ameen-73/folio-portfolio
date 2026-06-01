import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]);

export function sanitizeFilename(originalName: string): string {
    const extension = path.extname(originalName).toLowerCase() || ".webp";
    const nameWithoutExt = path
        .basename(originalName, path.extname(originalName))
        .replace(/[^a-zA-Z0-9-]/g, "_")
        .toLowerCase();

    return `${nameWithoutExt}-${Date.now()}${extension}`;
}

export async function uploadProjectImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/") || !ALLOWED_TYPES.has(file.type)) {
        throw new Error("Supported formats: JPEG, PNG, WebP, and GIF.");
    }

    if (file.size > MAX_SIZE_BYTES) {
        throw new Error("Image must be 5 MB or smaller.");
    }

    const filename = sanitizeFilename(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());

    if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(`projects/${filename}`, buffer, {
            access: "public",
            contentType: file.type,
            addRandomSuffix: false,
        });
        return blob.url;
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "projects");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/images/projects/${filename}`;
}
