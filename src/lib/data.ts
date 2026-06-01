import { getDb } from "@/lib/db";
import type { SiteConfig, Project } from "@/lib/site";
import { defaultSite } from "@/lib/site";

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

async function ensureSiteSettingsTable() {
  const sql = getDb();
  // Create the table if it doesn't exist. Matches the SiteRow type.
  // id is always 1 for the singleton settings row.
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
    );
  `;
}

// Ensure the table exists before any read/write operation
async function ensureSiteTableReady() {
  // Call the guard; wait for it to complete.
  await ensureSiteSettingsTable();
}

export async function getSite(): Promise<SiteConfig> {
  // Ensure the site_settings table exists before any read
  await ensureSiteTableReady();
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
  // Ensure table exists
  await ensureSiteTableReady();
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
}

export async function getProjects(): Promise<Project[]> {
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
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await getProjects();
    return projects.find((p) => p.slug === slug);
}