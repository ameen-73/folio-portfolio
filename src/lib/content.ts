export const services = [
    { num: "01", label: "Brand Strategy" },
    { num: "02", label: "Brand Identity Design" },
    { num: "03", label: "Packaging Design" },
    { num: "04", label: "Creative Direction" },
];

export const PROJECT_CATEGORIES = [
    "Branding",
    "Packaging",
    "Campaign",
    "Identity",
    "Typography",
    "Logo Design",
    "Social Media",
    "Photography",
    "Art Direction",
    "ui/ux",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

