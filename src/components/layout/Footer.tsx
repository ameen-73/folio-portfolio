import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
    { href: "/work", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border)] py-12">
            <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-lg font-semibold text-[var(--text)]">Folioblox</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                        © {year} — Creative direction & brand design
                    </p>
                </div>
                <nav className="flex flex-wrap gap-6">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </Container>
        </footer>
    );
}