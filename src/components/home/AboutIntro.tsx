import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutIntro() {
    return (
        <section className="py-24">
            <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                    <p className="text-sm font-medium text-[var(--accent)]">Behind the Designs</p>
                    <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[var(--text)] lg:text-5xl">
                        Shaping Experiences That Make Life Simpler
                    </h2>
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                        I&apos;m a product designer focused on building clean, intuitive interfaces
                        that solve real-world problems.
                    </p>
                    <p className="mt-6 text-sm text-[var(--text-muted)]">
                        Let&apos;s Build Something Meaningful Together
                    </p>
                    <div className="mt-8">
                        <Button href="/contact" variant="accent">
                            Get in touch
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}