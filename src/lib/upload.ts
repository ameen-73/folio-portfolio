import { put } from "@vercel/blob";
import path from "path";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
]);

function isAllowedImage(file: File): boolean {
    if (ALLOWED_TYPES.has(file.type)) return true;
    const ext = path.extname(file.name).toLowerCase();
    return ext === ".svg" && (file.type === "" || file.type === "application/octet-stream");
}

export function sanitizeFilename(originalName: string): string {
    const extension = path.extname(originalName).toLowerCase() || ".webp";
    const nameWithoutExt = path
        .basename(originalName, path.extname(originalName))
        .replace(/[^a-zA-Z0-9-]/g, "_")
        .toLowerCase();

    return `${nameWithoutExt}-${Date.now()}${extension}`;
}

export async function uploadImage(
    file: File,
    folder: "projects" | "trust-logos" = "projects"
): Promise<string> {
    if (!isAllowedImage(file)) {
        throw new Error("Supported formats: JPEG, PNG, WebP, GIF, and SVG.");
    }

    if (file.size > MAX_SIZE_BYTES) {
        throw new Error("Image must be 5 MB or smaller.");
    }

    const contentType =
        file.type ||
        (path.extname(file.name).toLowerCase() === ".svg" ? "image/svg+xml" : "application/octet-stream");

    const filename = sanitizeFilename(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());

    if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(`${folder}/${filename}`, buffer, {
            access: "public",
            contentType,
            addRandomSuffix: false,
        });
        return blob.url;
    }

    const base64 = buffer.toString("base64");
    return `data:${contentType};base64,${base64}`;
}

/** @deprecated Use uploadImage */
export async function uploadProjectImage(file: File): Promise<string> {
    return uploadImage(file, "projects");
}
