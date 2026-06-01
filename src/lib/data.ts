import { getDb } from "@/lib/db";
import type { SiteConfig, Project } from "@/lib/site";
import { defaultSite, defaultProjects } from "@/lib/site";
import { revalidatePath } from "next/cache";

type SiteRow = {
    name: string;
    title: string;
    tagline: string | null;
    email: string | null;
    location: string | null;
    whatsapp_phone: string;
    whatsapp_message: string | null;
    linkedin: string | null;
    behance: string | null;
    instagram: string | null;
    skills: string[] | unknown;
};

type ProjectRow = {
    slug: string;
    title: string;
    image: string;
    alt: string | null;
    role: string | null;
    year: string | null;
    tags: string[] | unknown;
    summary: string | null;
    problem: string | null;
    solution: string | null;
    outcome: string | null;
    sort_order: number;
};

function mapSite(row: SiteRow): SiteConfig {
    return {
        name: row.name,
        title: row.title,
        tagline: row.tagline ?? "",
        email: row.email ?? "",
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

function mapProject(row: ProjectRow): Project {
    return {
        slug: row.slug,
        title: row.title,
        image: row.image,
        alt: row.alt ?? "",
        role: row.role ?? "",
        year: row.year ?? "",
        tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
        summary: row.summary ?? "",
        problem: row.problem ?? "",
        solution: row.solution ?? "",
        outcome: row.outcome ?? "",
    };
}

let schemaReady: Promise<void> | null = null;

function ensureSchema() {
    if (!schemaReady) {
        schemaReady = initSchema();
    }
    return schemaReady;
}

async function initSchema() {
    const sql = getDb();

    await sql`
        CREATE TABLE IF NOT EXISTS site_settings (
            id integer PRIMARY KEY,
            name text NOT NULL,
            title text NOT NULL,
            tagline text,
            email text,
            location text,
            whatsapp_phone text NOT NULL,
            whatsapp_message text,
            linkedin text,
            behance text,
            instagram text,
            skills jsonb,
            updated_at timestamp with time zone default now()
        )
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS projects (
            slug text PRIMARY KEY,
            title text NOT NULL,
            image text NOT NULL,
            alt text,
            role text,
            year text,
            tags jsonb,
            summary text,
            problem text,
            solution text,
            outcome text,
            sort_order integer NOT NULL
        )
    `;

    const siteRows = await sql`SELECT id FROM site_settings WHERE id = 1`;
    if (siteRows.length === 0) {
        await insertSite(sql, defaultSite);
    }

    const projectRows = await sql`SELECT slug FROM projects LIMIT 1`;
    if (projectRows.length === 0) {
        await insertProjects(sql, defaultProjects);
    }
}

type Sql = ReturnType<typeof getDb>;

async function insertSite(sql: Sql, site: SiteConfig) {
    await sql`
        INSERT INTO site_settings (
            id, name, title, tagline, email, location,
            whatsapp_phone, whatsapp_message,
            linkedin, behance, instagram, skills, updated_at
        ) VALUES (
            1, ${site.name}, ${site.title}, ${site.tagline}, ${site.email}, ${site.location},
            ${site.whatsapp.phone}, ${site.whatsapp.defaultMessage},
            ${site.social.linkedin}, ${site.social.behance}, ${site.social.instagram},
            ${JSON.stringify(site.skills)}::jsonb, NOW()
        )
    `;
}

async function insertProjects(sql: Sql, projects: Project[]) {
    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await sql`
            INSERT INTO projects (
                slug, title, image, alt, role, year, tags,
                summary, problem, solution, outcome, sort_order
            ) VALUES (
                ${p.slug}, ${p.title}, ${p.image}, ${p.alt}, ${p.role}, ${p.year},
                ${JSON.stringify(p.tags)}::jsonb,
                ${p.summary}, ${p.problem}, ${p.solution}, ${p.outcome}, ${i + 1}
            )
        `;
    }
}

export async function getSite(): Promise<SiteConfig> {
    await ensureSchema();
    try {
        const sql = getDb();
        const rows = await sql`SELECT * FROM site_settings WHERE id = 1`;
        const row = rows[0] as SiteRow | undefined;
        if (!row) return defaultSite;
        return mapSite(row);
    } catch {
        return defaultSite;
    }
}

export async function saveSite(site: SiteConfig): Promise<void> {
    await ensureSchema();
    const sql = getDb();

    await sql`
        INSERT INTO site_settings (
            id, name, title, tagline, email, location,
            whatsapp_phone, whatsapp_message,
            linkedin, behance, instagram, skills, updated_at
        ) VALUES (
            1, ${site.name}, ${site.title}, ${site.tagline}, ${site.email}, ${site.location},
            ${site.whatsapp.phone}, ${site.whatsapp.defaultMessage},
            ${site.social.linkedin}, ${site.social.behance}, ${site.social.instagram},
            ${JSON.stringify(site.skills)}::jsonb, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            title = EXCLUDED.title,
            tagline = EXCLUDED.tagline,
            email = EXCLUDED.email,
            location = EXCLUDED.location,
            whatsapp_phone = EXCLUDED.whatsapp_phone,
            whatsapp_message = EXCLUDED.whatsapp_message,
            linkedin = EXCLUDED.linkedin,
            behance = EXCLUDED.behance,
            instagram = EXCLUDED.instagram,
            skills = EXCLUDED.skills,
            updated_at = NOW()
    `;

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
}

export async function getProjects(): Promise<Project[]> {
    await ensureSchema();
    try {
        const sql = getDb();
        const rows = await sql`
            SELECT slug, title, image, alt, role, year, tags, summary, problem, solution, outcome, sort_order
            FROM projects
            ORDER BY sort_order ASC
        `;
        return (rows as ProjectRow[]).map(mapProject);
    } catch {
        return [];
    }
}

export async function saveProjects(projects: Project[]): Promise<void> {
    await ensureSchema();

    const sql = getDb();

    await sql`DELETE FROM projects`;

    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await sql`
            INSERT INTO projects (
                slug, title, image, alt, role, year, tags,
                summary, problem, solution, outcome, sort_order
            ) VALUES (
                ${p.slug}, ${p.title}, ${p.image}, ${p.alt}, ${p.role}, ${p.year},
                ${JSON.stringify(p.tags)}::jsonb,
                ${p.summary}, ${p.problem}, ${p.solution}, ${p.outcome}, ${i + 1}
            )
        `;
    }

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/work");
    for (const project of projects) {
        revalidatePath(`/work/${project.slug}`);
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await getProjects();
    return projects.find((p) => p.slug === slug);
}
