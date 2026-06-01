export type SiteConfig = {
    name: string;
    title: string;
    tagline: string;
    email: string;
    location: string;
    whatsapp: { phone: string; defaultMessage: string };
    social: { linkedin: string; behance: string; instagram: string };
    skills: string[];
};

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

export const defaultSite: SiteConfig = {
    name: "Al Ameen",
    title: "Creative Director",
    tagline: "Brand strategy, identity, packaging, and creative direction.",
    email: "hello@yourdomain.com",
    location: "City, Country",
    whatsapp: {
        phone: "917356039673",
        defaultMessage: "Hi! I'd like to discuss a design project.",
    },
    social: {
        linkedin: "https://linkedin.com/in/your-profile",
        behance: "https://behance.net/your-profile",
        instagram: "https://instagram.com/your-handle",
    },
    skills: [
        "Brand Strategy",
        "Visual Identity",
        "Packaging Design",
        "Art Direction",
        "Campaign Creative",
    ],
};

export const defaultProjects: Project[] = [
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
