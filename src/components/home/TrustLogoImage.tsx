"use client";

import { useEffect, useState } from "react";
import type { TrustLogo } from "@/lib/site";

const logoClassName =
    "h-7 w-auto max-w-[140px] object-contain transition-[filter,opacity] duration-300 select-none md:h-8";

export function TrustLogoImage({ logo }: { logo: TrustLogo }) {
    const [inColor, setInColor] = useState(false);
    const alt = logo.alt || logo.name;

    useEffect(() => {
        if (!inColor) return;
        const reset = () => setInColor(false);
        document.addEventListener("pointerdown", reset);
        return () => document.removeEventListener("pointerdown", reset);
    }, [inColor]);

    const image = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={logo.image}
            alt={alt}
            className={`${logoClassName} ${
                inColor
                    ? "opacity-100 grayscale-0"
                    : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            }`}
            draggable={false}
            onPointerEnter={(e) => {
                if (e.pointerType !== "touch") setInColor(true);
            }}
            onPointerLeave={(e) => {
                if (e.pointerType !== "touch") setInColor(false);
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                setInColor(true);
            }}
            onFocus={() => setInColor(true)}
            onBlur={() => setInColor(false)}
        />
    );

    if (logo.href) {
        return (
            <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                aria-label={logo.name}
            >
                {image}
            </a>
        );
    }

    return <span className="inline-flex items-center">{image}</span>;
}
