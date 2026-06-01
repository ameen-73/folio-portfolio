"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Projects" },
];

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const logoClass = isHome ? "text-white" : "text-[var(--text)]";
    const linkClass = isHome
        ? "text-sm text-white/90 transition hover:text-white"
        : "text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]";

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
                    Folioblox
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href} className={linkClass}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button href="/contact" variant={isHome ? "light" : "accent"}>
                        Get in touch
                    </Button>
                </div>
            </Container>
        </header>
    );
}