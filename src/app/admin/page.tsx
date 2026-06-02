import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminDashboardPage() {
    return (
        <section className="mx-auto max-w-2xl px-6 py-24">
            <h1 className="text-3xl font-bold text-[var(--text)]">Admin</h1>
            <p className="mt-2 text-[var(--text-muted)]">Manage your portfolio content.</p>

            <ul className="mt-10 space-y-4">
                <li>
                    <Link
                        href="/admin/settings"
                        className="block rounded-xl border border-[var(--border)] px-6 py-4 hover:ring-1 hover:ring-[var(--accent)]"
                    >
                        Site settings (name, address, contact)
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/testimonials"
                        className="block rounded-xl border border-[var(--border)] px-6 py-4 hover:ring-1 hover:ring-[var(--accent)]"
                    >
                        Testimonials
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/impact-stats"
                        className="block rounded-xl border border-[var(--border)] px-6 py-4 hover:ring-1 hover:ring-[var(--accent)]"
                    >
                        Impact stats (above Behind the Designs)
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/projects"
                        className="block rounded-xl border border-[var(--border)] px-6 py-4 hover:ring-1 hover:ring-[var(--accent)]"
                    >
                        Projects
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/trust-logos"
                        className="block rounded-xl border border-[var(--border)] px-6 py-4 hover:ring-1 hover:ring-[var(--accent)]"
                    >
                        Trusted by logos (marquee)
                    </Link>
                </li>
            </ul>

            <LogoutButton />
        </section>
    );
}