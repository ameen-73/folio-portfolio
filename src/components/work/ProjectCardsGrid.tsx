import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site";

type Props = {
    projects: Project[];
    className?: string;
};

export function ProjectCardsGrid({ projects, className = "" }: Props) {
    if (projects.length === 0) {
        return (
            <p className={`text-[var(--text-muted)] ${className}`}>
                No projects in this category yet.
            </p>
        );
    }

    return (
        <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {projects.map((project) => (
                <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="group overflow-hidden rounded-3xl bg-[var(--bg-elevated)] ring-1 ring-[var(--border)] transition hover:ring-[var(--accent)]"
                >
                    <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.alt}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-sm font-medium text-[var(--accent)]">
                            {project.category}
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                            {project.role} · {project.year}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-[var(--text)]">
                            {project.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                            {project.summary}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
