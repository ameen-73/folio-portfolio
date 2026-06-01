import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSite, saveSite } from "@/lib/data";
import type { SiteConfig } from "@/lib/site";

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const site = await getSite();
    return NextResponse.json(site);
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = (await request.json()) as SiteConfig;
        await saveSite(body);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[API] saveSite error:', err);
        const message = err instanceof Error ? err.message : 'Invalid data';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}