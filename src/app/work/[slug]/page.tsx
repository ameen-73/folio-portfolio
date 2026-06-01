import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getProjectBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project not found" };
    return {
        title: `${project.title} — Folioblox`,
        description: project.summary,
    };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) notFound();

    return (
        <article className="pt-28 pb-24">
            <Container>
                <Link
                    href="/work"
                    className="text-sm text-[var(--accent)] transition hover:opacity-80"
                >
                    ← All projects
                </Link>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="mt-4 text-4xl font-bold text-[var(--text)] lg:text-5xl">
                    {project.title}
                </h1>
                <p className="mt-2 text-[var(--text-muted)]">
                    {project.role} · {project.year}
                </p>

                <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-[var(--border)]">
                    <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                </div>

                <p className="mt-10 max-w-3xl text-xl leading-relaxed text-[var(--text)]">
                    {project.summary}
                </p>

                <div className="mt-16 grid gap-12 lg:grid-cols-3">
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                            Problem
                        </h2>
                        <p className="mt-3 text-[var(--text-muted)]">{project.problem}</p>
                    </section>
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                            Solution
                        </h2>
                        <p className="mt-3 text-[var(--text-muted)]">{project.solution}</p>
                    </section>
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                            Outcome
                        </h2>
                        <p className="mt-3 text-[var(--text-muted)]">{project.outcome}</p>
                    </section>
                </div>

                <div className="mt-16">
                    <Link
                        href="/contact"
                        className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Start a project
                    </Link>
                </div>
            </Container>
        </article>
    );
}
