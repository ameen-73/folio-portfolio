import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSite } from "@/lib/data";

export async function generateMetadata() {
    const site = await getSite();
    return {
        title: `Contact — ${site.name}`,
        description: `Contact ${site.name} for brand and design projects.`,
    };
}

export default async function ContactPage() {
    const site = await getSite();

    return (
        <section className="pt-28 pb-24">
            <Container className="max-w-2xl">
                <p className="text-sm font-medium text-[var(--accent)]">Contact</p>
                <h1 className="mt-2 text-4xl font-bold text-[var(--text)] lg:text-5xl">
                    Let&apos;s work together
                </h1>
                <p className="mt-4 text-lg text-[var(--text-muted)]">
                    Have a project in mind? Send an email or message on WhatsApp — I usually reply
                    within 1–2 business days.
                </p>

                <div className="mt-10 space-y-6">
                    {site.address && (
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)]">Address</p>
                            <p className="mt-2 whitespace-pre-line text-lg text-[var(--text)]">
                                {site.address}
                            </p>
                        </div>
                    )}

                    {site.location && (
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)]">Location</p>
                            <p className="mt-1 text-lg text-[var(--text)]">{site.location}</p>
                        </div>
                    )}

                    <div>
                        <p className="text-sm font-medium text-[var(--text-muted)]">Email</p>
                        <a
                            href={`mailto:${site.email}`}
                            className="mt-1 block text-xl font-medium text-[var(--text)] underline decoration-[var(--accent)] underline-offset-4 transition hover:opacity-80"
                        >
                            {site.email}
                        </a>
                    </div>

                    {site.phone && (
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)]">Phone</p>
                            <a
                                href={`tel:${site.phone.replace(/\s/g, "")}`}
                                className="mt-1 block text-xl font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
                            >
                                {site.phone}
                            </a>
                        </div>
                    )}

                    <div>
                        <p className="text-sm font-medium text-[var(--text-muted)]">WhatsApp</p>
                        <div className="mt-3">
                            <WhatsAppButton />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-[var(--text-muted)]">Social</p>
                        <ul className="mt-2 flex flex-col gap-2">
                            <li>
                                <a
                                    href={site.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text)] transition hover:text-[var(--accent)]"
                                >
                                    LinkedIn →
                                </a>
                            </li>
                            <li>
                                <a
                                    href={site.social.behance}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text)] transition hover:text-[var(--accent)]"
                                >
                                    Behance →
                                </a>
                            </li>
                            <li>
                                <a
                                    href={site.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text)] transition hover:text-[var(--accent)]"
                                >
                                    Instagram →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Link
                    href="/work"
                    className="mt-12 inline-block text-sm text-[var(--accent)] hover:opacity-80"
                >
                    View my work →
                </Link>
            </Container>
        </section>
    );
}