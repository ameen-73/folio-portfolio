import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getTrustLogos, saveTrustLogos } from "@/lib/data";
import type { TrustLogo } from "@/lib/site";

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const logos = await getTrustLogos();
    return NextResponse.json(logos);
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = (await request.json()) as TrustLogo[];
        await saveTrustLogos(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
}
