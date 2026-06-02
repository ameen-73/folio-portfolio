import { Container } from "@/components/ui/Container";
import { HomeProjectsSection } from "@/components/home/HomeProjectsSection";
import type { Project } from "@/lib/site";

type Props = {
    projects: Project[];
};

function homepageProjects(projects: Project[]): Project[] {
    const featured = projects.filter((p) => p.featured);
    return featured.length > 0 ? featured : projects;
}

export function ProjectShowcase({ projects }: Props) {
    const pool = homepageProjects(projects);

    return (
        <section className="pb-24">
            <Container>
                <p className="text-sm font-medium text-[var(--accent)]">Selected Work</p>
                <h2 className="mt-2 text-3xl font-bold text-[var(--text)] lg:text-4xl">
                    Projects by category
                </h2>
                <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
                    Browse main work across branding, packaging, campaigns, and more.
                </p>

                <HomeProjectsSection projects={pool} />
            </Container>
        </section>
    );
}
