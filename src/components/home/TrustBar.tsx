import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { getTrustLogos } from "@/lib/data";

export async function TrustBar() {
    const logos = await getTrustLogos();

    if (logos.length === 0) {
        return null;
    }

    return (
        <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)] py-10 md:py-12">
            <Container>
                <p className="text-center text-sm text-[var(--text-muted)] md:text-left">
                    Trusted by Brands I&apos;ve Helped Shape
                </p>
                <LogoMarquee logos={logos} />
            </Container>
        </section>
    );
}
