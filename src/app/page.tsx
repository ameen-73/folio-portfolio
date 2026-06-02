import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ImpactStatsBar } from "@/components/home/ImpactStatsBar";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const projects = await getProjects();

    return (
        <>
            <Hero />
            <TrustBar />
            <ImpactStatsBar />
            <AboutIntro />
            <ProjectShowcase projects={projects} />
            <TestimonialsSection />
            <HomeContactSection />
        </>
    );
}
