export type Project = {
    slug: string;
    title: string;
    image: string;
    alt: string;
};

export const featuredProjects: Project[] = [
    {
        slug: "outerwear-campaign",
        title: "Outerwear Campaign",
        image: "/images/projects/project-1.webp",
        alt: "Puffer jacket product shot",
    },
    {
        slug: "audio-brand",
        title: "Audio Brand",
        image: "/images/projects/project-2.webp",
        alt: "Headphones lifestyle shot",
    },
    {
        slug: "beauty-packaging",
        title: "Beauty Packaging",
        image: "/images/projects/project-3.webp",
        alt: "Cosmetic bottle on stone",
    },
];

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