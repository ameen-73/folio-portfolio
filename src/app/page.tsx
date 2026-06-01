import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const projects = await getProjects();

    return (
        <>
            <Hero />
            <TrustBar />
            <AboutIntro />
            <ProjectGrid projects={projects} />
        </>
    );
}
