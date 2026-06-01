import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProjectGrid } from "@/components/home/ProjectGrid";

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustBar />
            <AboutIntro />
            <ProjectGrid />
        </>
    );
}