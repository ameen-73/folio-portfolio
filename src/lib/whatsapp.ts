import type { SiteConfig } from "@/lib/site";

export function whatsappUrl(site: SiteConfig) {
    const text = encodeURIComponent(site.whatsapp.defaultMessage);
    return `https://wa.me/${site.whatsapp.phone}?text=${text}`;
}