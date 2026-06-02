import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getTestimonials, saveTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/site";

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = (await request.json()) as Testimonial[];
        await saveTestimonials(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
}
