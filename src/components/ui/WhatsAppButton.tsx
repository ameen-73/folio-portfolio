"use client";

import { useSite } from "@/contexts/SiteContext";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
    className?: string;
    label?: string;
};

export function WhatsAppButton({
    className = "",
    label = "Chat on WhatsApp",
}: Props) {
    const site = useSite();

    return (
        <a
            href={whatsappUrl(site)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 ${className}`}
        >
            {label}
        </a>
    );
}