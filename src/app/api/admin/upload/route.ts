import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { uploadProjectImage } from "@/lib/upload";

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const url = await uploadProjectImage(file);
        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        const message = error instanceof Error ? error.message : "Upload failed";
        const status = message.includes("Supported formats") || message.includes("5 MB") ? 400 : 500;
        return NextResponse.json({ error: message }, { status });
    }
}
