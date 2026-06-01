import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const password = body?.password;

        if (!process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "ADMIN_PASSWORD is not configured" },
                { status: 500 }
            );
        }

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        await setAdminCookie();
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}