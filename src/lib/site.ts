// src/lib/site.ts

export type SiteConfig = {
    name: string;
    title: string;
    tagline: string;
    email: string;
    phone?: string; // added optional phone field
    location: string;
    address?: string; // added address field
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
    category: string;
    featured: boolean;
    tags: string[];
    summary: string;
    problem: string;
    solution: string;
    outcome: string;
};

/* -------------------------------------------------
   NEW: Types required by data.ts
   ------------------------------------------------- */
export type ImpactStat = {
    id: string;
    value: string;
    label: string;
};

export type Testimonial = {
    id: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
};

export type TrustLogo = {
    id: string;
    name: string;
    image: string;
    alt: string;
    href: string;
};

/* -------------------------------------------------
   NEW: Default data (place‑holders – replace with real content)
   ------------------------------------------------- */
export const defaultImpactStats: ImpactStat[] = [];   // ← populate with your stats
export const defaultTestimonials: Testimonial[] = []; // ← populate with testimonials

/* -------------------------------------------------
   Existing site & project defaults (unchanged)
   ------------------------------------------------- */
export const defaultSite: SiteConfig = {
    name: "Al Ameen",
    title: "Creative Director",
    tagline: "Brand strategy, identity, packaging, and creative direction.",
    email: "hello@yourdomain.com",
    phone: "",
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
    /* … existing project objects … */
];
