import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Projects" },
];

export function Header() {
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <Container className="flex items-center justify-between py-6">
                <Link href="/" className="text-lg font-semibold text-white">
                    Folioblox
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-white/90 transition hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button href="/contact" variant="light">
                        Get in touch
                    </Button>
                </div>
            </Container>
        </header>
    );
}