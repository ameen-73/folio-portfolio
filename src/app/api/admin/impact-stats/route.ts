import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getImpactStats, saveImpactStats } from "@/lib/data";
import type { ImpactStat } from "@/lib/site";

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const stats = await getImpactStats();
    return NextResponse.json(stats);
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = (await request.json()) as ImpactStat[];
        await saveImpactStats(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
}
