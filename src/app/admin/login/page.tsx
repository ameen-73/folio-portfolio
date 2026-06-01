"use client";

import { useState } from "react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        setLoading(false);

        if (res.ok) {
            window.location.href = "/admin";
            return;
        }

        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
    }

    return (
        <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-24">
            <h1 className="text-2xl font-bold text-[var(--text)]">Admin login</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
                Enter your admin password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text)]"
                    required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[var(--accent)] py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </section>
    );
}