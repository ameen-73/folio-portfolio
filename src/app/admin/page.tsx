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
                        Site settings (name, email, WhatsApp)
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
            </ul>

            <LogoutButton />
        </section>
    );
}