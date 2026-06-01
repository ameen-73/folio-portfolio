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