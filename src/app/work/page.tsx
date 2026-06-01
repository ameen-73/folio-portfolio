import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Projects — Folioblox",
    description: "Selected brand, packaging, and creative direction work.",
};

export default async function WorkIndexPage() {
    const projects = await getProjects();

    return (
        <section className="pt-28 pb-24">
            <Container>
                <p className="text-sm font-medium text-[var(--accent)]">Work</p>
                <h1 className="mt-2 text-4xl font-bold text-[var(--text)] lg:text-5xl">
                    Selected projects
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
                    Brand, packaging, and campaign work — click a project for the full case study.
                </p>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                                <p className="text-sm text-[var(--text-muted)]">
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
            </Container>
        </section>
    );
}
