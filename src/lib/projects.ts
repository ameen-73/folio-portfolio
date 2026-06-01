export type Project = {
    slug: string;
    title: string;
    image: string;
    alt: string;
    role: string;
    year: string;
    tags: string[];
    summary: string;
    problem: string;
    solution: string;
    outcome: string;
};

export const featuredProjects: Project[] = [
    {
        slug: "outerwear-campaign",
        title: "Outerwear Campaign",
        image: "/images/projects/project-1.webp",
        alt: "Puffer jacket product shot",
        role: "Creative Director",
        year: "2025",
        tags: ["Branding", "Campaign", "Photography"],
        summary: "Seasonal campaign for a premium outerwear line.",
        problem: "The brand needed a cohesive visual story across retail and digital.",
        solution: "Defined art direction, shot list, and layout system for launch assets.",
        outcome: "Unified campaign increased engagement across paid social and email.",
    },
    {
        slug: "audio-brand",
        title: "Audio Brand",
        image: "/images/projects/project-2.webp",
        alt: "Headphones lifestyle shot",
        role: "Brand Identity",
        year: "2024",
        tags: ["Identity", "Guidelines", "Packaging"],
        summary: "Identity refresh for a consumer audio startup.",
        problem: "Existing visuals felt generic and failed to stand out in retail.",
        solution: "New wordmark, color system, and packaging hierarchy.",
        outcome: "Clearer shelf presence and consistent partner-ready brand kit.",
    },
    {
        slug: "beauty-packaging",
        title: "Beauty Packaging",
        image: "/images/projects/project-3.webp",
        alt: "Cosmetic bottle on stone",
        role: "Packaging Design",
        year: "2024",
        tags: ["Packaging", "3D", "Print"],
        summary: "Primary packaging for a clean-beauty product line.",
        problem: "Launch timeline was tight; structure and print needed to align.",
        solution: "Iterated form, label architecture, and supplier-ready dielines.",
        outcome: "Shipped on schedule with strong retail feedback on shelf appeal.",
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return featuredProjects.find((p) => p.slug === slug);
}

export const services = [
    { num: "01", label: "Brand Strategy" },
    { num: "02", label: "Brand Identity Design" },
    { num: "03", label: "Packaging Design" },
    { num: "04", label: "Creative Direction" },
];

export const trustLogos = [
    { name: "Supa Blox", icon: "◆" },
    { name: "Hype Blox", icon: "◇" },
    { name: "Frame Blox", icon: "○" },
    { name: "Ultra Blox", icon: "□" },
];