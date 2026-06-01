import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/data";

export async function generateMetadata() {
    const site = await getSite();
    return {
        title: `About — ${site.name}`,
        description: `Learn more about ${site.name}, ${site.title}.`,
    };
}

export default async function AboutPage() {
    const site = await getSite();

    return (
        <section className="pt-28 pb-24">
            <Container>
                <p className="text-sm font-medium text-[var(--accent)]">About</p>
                <h1 className="mt-2 text-4xl font-bold text-[var(--text)] lg:text-5xl">
                    {site.name}
                </h1>
                <p className="mt-2 text-xl text-[var(--text-muted)]">{site.title}</p>

                <div className="mt-12 grid gap-12 lg:grid-cols-[280px_1fr]">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-[var(--border)]">
                        <Image
                            src="/images/hero/portrait.webp"
                            alt={site.name}
                            fill
                            className="object-cover object-top"
                            sizes="280px"
                        />
                    </div>

                    <div>
                        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                            I&apos;m a designer focused on building brands that feel clear, confident,
                            and human. From strategy to final assets, I help teams tell one consistent
                            story across packaging, campaigns, and digital touchpoints.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)]">
                            Based in {site.location}. I collaborate with startups and established
                            brands on identity systems, launch campaigns, and creative direction.
                        </p>

                        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                            Skills
                        </h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {site.skills.map((skill) => (
                                <li
                                    key={skill}
                                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/contact"
                            className="mt-10 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Get in touch
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}