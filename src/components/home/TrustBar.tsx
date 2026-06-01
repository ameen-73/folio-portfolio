import { Container } from "@/components/ui/Container";
import { trustLogos } from "@/lib/projects";

export function TrustBar() {
    return (
        <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)] py-10">
            <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                    Trusted by Brands I&apos;ve Helped Shape
                </p>
                <ul className="flex flex-wrap items-center gap-8 md:gap-12">
                    {trustLogos.map((logo) => (
                        <li
                            key={logo.name}
                            className="flex items-center gap-2 text-sm font-medium text-[var(--text)] opacity-80"
                        >
                            <span aria-hidden className="text-[var(--accent)]">
                                {logo.icon}
                            </span>
                            {logo.name}
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}