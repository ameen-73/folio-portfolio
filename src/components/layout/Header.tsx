"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { useSite } from "@/contexts/SiteContext";

const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Projects" },
];

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const isHome = pathname === "/";
    const site = useSite();

    const logoClass = isHome ? "text-white" : "text-[var(--text)]";
    const linkClass = isHome
        ? "text-sm text-white/90 transition hover:text-white"
        : "text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]";

    const mobileLinkClass =
        "block py-3 text-lg text-[var(--text)] border-b border-[var(--border)]";

    return (
        <header
            className={
                isHome
                    ? "absolute inset-x-0 top-0 z-50"
                    : "sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur"
            }
        >
            <Container className="flex items-center justify-between py-6">
                <Link href="/" className={`text-lg font-semibold ${logoClass}`}>
                    {site.name}
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href} className={linkClass}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <ThemeToggle />

                    <button
                        type="button"
                        className={`md:hidden rounded-full border border-[var(--border)] px-3 py-2 text-sm ${isHome ? "text-white" : "text-[var(--text)]"
                            }`}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "✕" : "☰"}
                    </button>

                    <div className="hidden md:block">
                        <Button href="/contact" variant={isHome ? "light" : "accent"}>
                            Get in touch
                        </Button>
                    </div>
                </div>
            </Container>

            {open && (
                <div className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
                    <Container className="py-4">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={mobileLinkClass}
                                onClick={() => setOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="mt-4 block rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-medium text-white"
                            onClick={() => setOpen(false)}
                        >
                            Get in touch
                        </Link>
                    </Container>
                </div>
            )}
        </header>
    );
}