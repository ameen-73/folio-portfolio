import { PROJECT_CATEGORIES } from "@/lib/content";
import type { Project } from "@/lib/site";

export function slugifyCategory(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function buildCategoryTabs(projects: Project[]): string[] {
    const used = new Set(projects.map((p) => p.category).filter(Boolean));
    const ordered = PROJECT_CATEGORIES.filter((c) => used.has(c));
    const extras = [...used].filter(
        (c) => !PROJECT_CATEGORIES.includes(c as (typeof PROJECT_CATEGORIES)[number])
    );
    return ["All", ...ordered, ...extras];
}
