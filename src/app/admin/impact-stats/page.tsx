"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ImpactStat } from "@/lib/site";

function slugify(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

const emptyStat = (): ImpactStat => ({
    id: `stat-${Date.now()}`,
    value: "",
    label: "",
});

export default function AdminImpactStatsPage() {
    const [stats, setStats] = useState<ImpactStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/admin/impact-stats")
            .then((res) => {
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return [];
                }
                return res.json();
            })
            .then((data: ImpactStat[]) => {
                setStats(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    function updateStat(index: number, patch: Partial<ImpactStat>) {
        setStats((prev) =>
            prev.map((stat, i) => (i === index ? { ...stat, ...patch } : stat))
        );
    }

    function addStat() {
        setStats((prev) => [...prev, emptyStat()]);
    }

    function removeStat(index: number) {
        setStats((prev) => prev.filter((_, i) => i !== index));
    }

    function moveStat(index: number, direction: -1 | 1) {
        const next = index + direction;
        if (next < 0 || next >= stats.length) return;
        setStats((prev) => {
            const copy = [...prev];
            [copy[index], copy[next]] = [copy[next], copy[index]];
            return copy;
        });
    }

    async function handleSave() {
        setSaving(true);
        setMessage("");

        const cleaned = stats.map((stat, index) => {
            const label = stat.label.trim();
            const value = stat.value.trim();
            const id =
                stat.id.trim() ||
                slugify(label) ||
                `stat-${index + 1}-${Date.now()}`;
            return {
                id: slugify(id) || id,
                value,
                label,
            };
        });

        const invalid = cleaned.find((s) => !s.value || !s.label);
        if (invalid) {
            setSaving(false);
            setMessage("Each stat needs a value and a label.");
            return;
        }

        const res = await fetch("/api/admin/impact-stats", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleaned),
        });

        setSaving(false);
        if (res.ok) {
            setStats(cleaned);
            setMessage("Impact stats saved.");
        } else {
            const err = await res.json().catch(() => ({}));
            setMessage(err.error ?? "Save failed.");
        }
    }

    if (loading) {
        return (
            <section className="mx-auto max-w-3xl px-6 py-24 text-[var(--text-muted)]">
                Loading…
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-3xl px-6 py-24">
            <Link
                href="/admin"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
                ← Admin
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">
                Impact stats
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
                Edit the numbers shown above the &ldquo;Behind the Designs&rdquo;
                section on the homepage. Use values like{" "}
                <span className="font-mono text-[var(--text)]">7+</span> or{" "}
                <span className="font-mono text-[var(--text)]">2,700+</span> and
                short labels such as{" "}
                <span className="font-mono text-[var(--text)]">
                    Years Experience
                </span>
                .
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Preview
                </p>
                <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
                    {stats.map((stat, index) => (
                        <li
                            key={`preview-${stat.id}-${index}`}
                            className={`text-center md:px-3 ${
                                index > 0 ? "md:border-l md:border-[var(--border)]" : ""
                            }`}
                        >
                            <p className="text-2xl font-bold text-[var(--text)]">
                                {stat.value || "—"}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                {stat.label || "Label"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-10 space-y-6">
                {stats.map((stat, index) => (
                    <article
                        key={stat.id}
                        className="rounded-xl border border-[var(--border)] p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-sm font-semibold text-[var(--text)]">
                                Stat {index + 1}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => moveStat(index, -1)}
                                    disabled={index === 0}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move left"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveStat(index, 1)}
                                    disabled={index === stats.length - 1}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move right"
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeStat(index)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <Input
                            label="Value"
                            value={stat.value}
                            onChange={(v) => updateStat(index, { value: v })}
                            placeholder="7+"
                        />
                        <Input
                            label="Label"
                            value={stat.label}
                            onChange={(v) => updateStat(index, { label: v })}
                            placeholder="Years Experience"
                        />
                    </article>
                ))}
            </div>

            <button
                type="button"
                onClick={addStat}
                className="mt-8 rounded-full border border-dashed border-[var(--border)] px-6 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
                + Add stat
            </button>

            <div className="mt-10">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save all stats"}
                </button>
            </div>

            {message && <p className="mt-4 text-sm text-[var(--accent)]">{message}</p>}
        </section>
    );
}

function Input({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                {label}
            </label>
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
            />
        </div>
    );
}
