"use client";

import Link from "next/link";
import { CategoryHeroSlider } from "@/components/home/CategoryHeroSlider";
import type { Project } from "@/lib/site";

type Props = {
    projects: Project[];
};

export function HomeProjectsSection({ projects }: Props) {
    return (
        <>
            <CategoryHeroSlider projects={projects} className="mt-8" />

            <div className="mt-10">
                <Link
                    href="/work"
                    className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--text-muted)] active:border-[var(--text-muted)]"
                >
                    View all projects
                </Link>
            </div>
        </>
    );
}
