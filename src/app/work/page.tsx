import { Container } from "@/components/ui/Container";
import { WorkProjectGrid } from "@/components/work/WorkProjectGrid";
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

                <WorkProjectGrid projects={projects} />
            </Container>
        </section>
    );
}
