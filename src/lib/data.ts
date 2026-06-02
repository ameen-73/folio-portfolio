// src/lib/data.ts

import { getDb } from "@/lib/db";
import type { SiteConfig, Project, TrustLogo, ImpactStat, Testimonial } from "./site";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const hasDatabase = Boolean(process.env.DATABASE_URL);

async function tryGetDb() {
    if (!hasDatabase) return null;
    return await getDb();
}

// -------------------------------------------------------------------
// Types for raw database rows (keep existing definitions for mapping)
// -------------------------------------------------------------------

type SiteRow = {
    name: string;
    title: string;
    tagline: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    location: string | null;
    whatsapp_phone: string;
    whatsapp_message: string | null;
    linkedin: string | null;
    behance: string | null;
    instagram: string | null;
    skills: string[] | unknown;
};

type TestimonialRow = {
    id: string;
    quote: string;
    author: string;
    role: string | null;
    avatar: string | null;
    sort_order: number;
};

type ProjectRow = {
    slug: string;
    title: string;
    image: string;
    alt: string | null;
    role: string | null;
    year: string | null;
    category: string | null;
    featured: boolean | null;
    tags: string[] | unknown;
    summary: string | null;
    problem: string | null;
    solution: string | null;
    outcome: string | null;
    sort_order: number;
};

type TrustLogoRow = {
    id: string;
    name: string;
    image: string;
    alt: string | null;
    href: string | null;
    sort_order: number;
};

type ImpactStatRow = {
    id: string;
    value: string;
    label: string;
    sort_order: number;
};

// -------------------------------------------------------------------
// Mapping helpers – convert raw rows to typed objects
// -------------------------------------------------------------------

function mapSite(row: SiteRow): SiteConfig {
    return {
        name: row.name,
        title: row.title,
        tagline: row.tagline ?? "",
        email: row.email ?? "",
        phone: row.phone ?? "",
        address: row.address ?? "",
        location: row.location ?? "",
        whatsapp: {
            phone: row.whatsapp_phone,
            defaultMessage: row.whatsapp_message ?? "",
        },
        social: {
            linkedin: row.linkedin ?? "",
            behance: row.behance ?? "",
            instagram: row.instagram ?? "",
        },
        skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
    };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
    return {
        id: row.id,
        quote: row.quote,
        author: row.author,
        role: row.role ?? "",
        avatar: row.avatar ?? "",
    };
}

function mapProject(row: ProjectRow): Project {
    return {
        slug: row.slug,
        title: row.title,
        image: row.image,
        alt: row.alt ?? "",
        role: row.role ?? "",
        year: row.year ?? "",
        category: row.category ?? "",
        featured: Boolean(row.featured),
        tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
        summary: row.summary ?? "",
        problem: row.problem ?? "",
        solution: row.solution ?? "",
        outcome: row.outcome ?? "",
    };
}

function mapTrustLogo(row: TrustLogoRow): TrustLogo {
    return {
        id: row.id,
        name: row.name,
        image: row.image,
        alt: row.alt ?? "",
        href: row.href ?? "",
    };
}

function mapImpactStat(row: ImpactStatRow): ImpactStat {
    return {
        id: row.id,
        value: row.value,
        label: row.label,
    };
}

// -------------------------------------------------------------------
// Public API – data access functions
// -------------------------------------------------------------------

export async function getSite(): Promise<SiteConfig> {
    if (!hasDatabase) {
        return (await import("./site")).defaultSite;
    }

    try {
        const db = await tryGetDb();
        if (!db) return (await import("./site")).defaultSite;
        const row = ((await db`select * from site limit 1`) as SiteRow[])[0];
        return row ? mapSite(row) : (await import("./site")).defaultSite;
    } catch {
        return (await import("./site")).defaultSite;
    }
}

export async function saveSite(site: SiteConfig) {
    const db = await getDb();
    await db`delete from site`;
    await db`insert into site (name, title, tagline, email, phone, address, location, whatsapp_phone, whatsapp_message, linkedin, behance, instagram, skills) values (${site.name}, ${site.title}, ${site.tagline}, ${site.email}, ${site.phone}, ${site.address}, ${site.location}, ${site.whatsapp.phone}, ${site.whatsapp.defaultMessage}, ${site.social.linkedin}, ${site.social.behance}, ${site.social.instagram}, ${JSON.stringify(site.skills)})`;
    revalidatePath("/");
}

export async function getProjects(): Promise<Project[]> {
    if (!hasDatabase) return [];

    try {
        const db = await tryGetDb();
        if (!db) return [];
        const rows = (await db`select * from project order by sort_order`) as ProjectRow[];
        return rows.map(mapProject);
    } catch {
        return [];
    }
}

export async function saveProjects(projects: Project[]) {
    const db = await getDb();
    await db`delete from project`;
    for (const p of projects) {
        await db`insert into project (slug, title, image, alt, role, year, category, featured, tags, summary, problem, solution, outcome, sort_order) values (${p.slug}, ${p.title}, ${p.image}, ${p.alt}, ${p.role}, ${p.year}, ${p.category}, ${p.featured}, ${JSON.stringify(p.tags)}, ${p.summary}, ${p.problem}, ${p.solution}, ${p.outcome}, ${0})`;
    }
    revalidatePath("/work");
}

export async function getImpactStats(): Promise<ImpactStat[]> {
    if (!hasDatabase) return [];

    try {
        const db = await tryGetDb();
        if (!db) return [];
        const rows = (await db`select * from impact_stat order by sort_order`) as ImpactStatRow[];
        return rows.map(mapImpactStat);
    } catch {
        return [];
    }
}

export async function saveImpactStats(stats: ImpactStat[]) {
    const db = await getDb();
    await db`delete from impact_stat`;
    for (const s of stats) {
        await db`insert into impact_stat (id, value, label, sort_order) values (${s.id}, ${s.value}, ${s.label}, ${0})`;
    }
    revalidatePath("/");
}

export async function getTestimonials(): Promise<Testimonial[]> {
    if (!hasDatabase) return [];

    try {
        const db = await tryGetDb();
        if (!db) return [];
        const rows = (await db`select * from testimonial order by sort_order`) as TestimonialRow[];
        return rows.map(mapTestimonial);
    } catch {
        return [];
    }
}

export async function saveTestimonials(testimonials: Testimonial[]) {
    const db = await getDb();
    await db`delete from testimonial`;
    for (const t of testimonials) {
        await db`insert into testimonial (id, quote, author, role, avatar, sort_order) values (${t.id}, ${t.quote}, ${t.author}, ${t.role}, ${t.avatar}, ${0})`;
    }
    revalidatePath("/");
}

export async function getTrustLogos(): Promise<TrustLogo[]> {
    if (!hasDatabase) return [];

    try {
        const db = await tryGetDb();
        if (!db) return [];
        const rows = (await db`select * from trust_logo order by sort_order`) as TrustLogoRow[];
        return rows.map(mapTrustLogo);
    } catch {
        return [];
    }
}

export async function saveTrustLogos(logos: TrustLogo[]) {
    const db = await getDb();
    await db`delete from trust_logo`;
    for (const l of logos) {
        await db`insert into trust_logo (id, name, image, alt, href, sort_order) values (${l.id}, ${l.name}, ${l.image}, ${l.alt}, ${l.href}, ${0})`;
    }
    revalidatePath("/");
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    if (!hasDatabase) return undefined;

    try {
        const db = await tryGetDb();
        if (!db) return undefined;
        const rows = (await db`select * from project where slug = ${slug} limit 1`) as ProjectRow[];
        return rows[0] ? mapProject(rows[0]) : undefined;
    } catch {
        return undefined;
    }
}