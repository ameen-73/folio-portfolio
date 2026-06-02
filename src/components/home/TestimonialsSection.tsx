import { Container } from "@/components/ui/Container";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { getTestimonials } from "@/lib/data";

export async function TestimonialsSection() {
    const testimonials = await getTestimonials();

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 md:py-24">
            <Container>
                <p className="text-sm font-medium text-[var(--accent)]">Testimonials</p>
                <h2 className="mt-2 text-3xl font-bold text-[var(--text)] lg:text-4xl">
                    What clients say
                </h2>
                <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
                    Feedback from brands and teams I&apos;ve partnered with on design and
                    creative direction.
                </p>
                <TestimonialsCarousel testimonials={testimonials} />
            </Container>
        </section>
    );
}
