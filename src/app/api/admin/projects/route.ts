import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getProjects, saveProjects } from "@/lib/data";
import type { Project } from "@/lib/site";

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = (await request.json()) as Project[];
        await saveProjects(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
}