import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSite } from "@/lib/data";

export async function HomeContactSection() {
    const site = await getSite();

    const hasAddress = Boolean(site.address?.trim());
    const hasContact =
        site.email ||
        site.phone ||
        site.location ||
        hasAddress ||
        site.social.linkedin ||
        site.social.behance ||
        site.social.instagram;

    if (!hasContact) {
        return null;
    }

    return (
        <section className="border-t border-[var(--border)] py-20 md:py-24">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="text-sm font-medium text-[var(--accent)]">Contact</p>
                        <h2 className="mt-2 text-3xl font-bold text-[var(--text)] lg:text-4xl">
                            Let&apos;s build something meaningful
                        </h2>
                        <p className="mt-4 text-lg text-[var(--text-muted)]">
                            Reach out for brand, packaging, or campaign work. I usually reply
                            within 1–2 business days.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button href="/contact" variant="accent">
                                Full contact page
                            </Button>
                            <WhatsAppButton />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        <dl className="space-y-6">
                            {hasAddress && (
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                                        Address
                                    </dt>
                                    <dd className="mt-2 whitespace-pre-line text-[var(--text)]">
                                        {site.address}
                                    </dd>
                                </div>
                            )}
                            {site.location && (
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                                        Location
                                    </dt>
                                    <dd className="mt-2 text-[var(--text)]">{site.location}</dd>
                                </div>
                            )}
                            {site.email && (
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                                        Email
                                    </dt>
                                    <dd className="mt-2">
                                        <a
                                            href={`mailto:${site.email}`}
                                            className="font-medium text-[var(--text)] underline decoration-[var(--accent)] underline-offset-4 hover:opacity-80"
                                        >
                                            {site.email}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            {site.phone && (
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                                        Phone
                                    </dt>
                                    <dd className="mt-2">
                                        <a
                                            href={site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : "#"}
                                            className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                                        >
                                            {site.phone}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            {(site.social.linkedin ||
                                site.social.behance ||
                                site.social.instagram) && (
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                                        Social
                                    </dt>
                                    <dd className="mt-2 flex flex-col gap-2">
                                        {site.social.linkedin && (
                                            <Link
                                                href={site.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--text)] hover:text-[var(--accent)]"
                                            >
                                                LinkedIn →
                                            </Link>
                                        )}
                                        {site.social.behance && (
                                            <Link
                                                href={site.social.behance}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--text)] hover:text-[var(--accent)]"
                                            >
                                                Behance →
                                            </Link>
                                        )}
                                        {site.social.instagram && (
                                            <Link
                                                href={site.social.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--text)] hover:text-[var(--accent)]"
                                            >
                                                Instagram →
                                            </Link>
                                        )}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </Container>
        </section>
    );
}
