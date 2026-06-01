"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/site";
import { defaultSite } from "@/lib/site";

export default function AdminSettingsPage() {
    const [site, setSite] = useState<SiteConfig>(defaultSite);
    const [skillsText, setSkillsText] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/admin/site")
            .then((res) => {
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return null;
                }
                return res.json();
            })
            .then((data: SiteConfig | null) => {
                if (data) {
                    setSite(data);
                    setSkillsText(data.skills.join(", "));
                }
                setLoading(false);
            });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        // Simple client-side validation for required fields
        if (!site.name.trim() || !site.title.trim() || !site.whatsapp.phone.trim()) {
            setMessage('Name, Title, and WhatsApp phone are required.');
            setSaving(false);
            return;
        }
        const payload: SiteConfig = {
            ...site,
            skills: skillsText
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        };

        const res = await fetch("/api/admin/site", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setSaving(false);
        if (res.ok) {
            setSite(payload);
            setMessage("Saved successfully.");
        } else {
            const err = await res.json().catch(() => ({}));
            setMessage(err.error ?? "Save failed.");
        }
    }

    if (loading) {
        return (
            <section className="mx-auto max-w-2xl px-6 py-24 text-[var(--text-muted)]">
                Loading…
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-2xl px-6 py-24">
            <Link href="/admin" className="text-sm text-[var(--accent)]">
                ← Back to admin
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">Site settings</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <Field label="Name" value={site.name} onChange={(v) => setSite({ ...site, name: v })} />
                <Field label="Title" value={site.title} onChange={(v) => setSite({ ...site, title: v })} />
                <Field label="Tagline" value={site.tagline} onChange={(v) => setSite({ ...site, tagline: v })} />
                <Field label="Email" value={site.email} onChange={(v) => setSite({ ...site, email: v })} />
                <Field label="Location" value={site.location} onChange={(v) => setSite({ ...site, location: v })} />

                <h2 className="pt-4 text-lg font-semibold text-[var(--text)]">WhatsApp</h2>
                <Field
                    label="Phone (country code, no +)"
                    value={site.whatsapp.phone}
                    onChange={(v) =>
                        setSite({ ...site, whatsapp: { ...site.whatsapp, phone: v } })
                    }
                />
                <Field
                    label="Default message"
                    value={site.whatsapp.defaultMessage}
                    onChange={(v) =>
                        setSite({ ...site, whatsapp: { ...site.whatsapp, defaultMessage: v } })
                    }
                />

                <h2 className="pt-4 text-lg font-semibold text-[var(--text)]">Social</h2>
                <Field
                    label="LinkedIn URL"
                    value={site.social.linkedin}
                    onChange={(v) => setSite({ ...site, social: { ...site.social, linkedin: v } })}
                />
                <Field
                    label="Behance URL"
                    value={site.social.behance}
                    onChange={(v) => setSite({ ...site, social: { ...site.social, behance: v } })}
                />
                <Field
                    label="Instagram URL"
                    value={site.social.instagram}
                    onChange={(v) => setSite({ ...site, social: { ...site.social, instagram: v } })}
                />

                <div>
                    <label className="block text-sm font-medium text-[var(--text-muted)]">
                        Skills (comma-separated)
                    </label>
                    <input
                        value={skillsText}
                        onChange={(e) => setSkillsText(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-[var(--text)]"
                    />
                </div>

                {message && <p className="text-sm text-[var(--accent)]">{message}</p>}

                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save settings"}
                </button>
            </form>
        </section>
    );
}

function Field({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-[var(--text-muted)]">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-[var(--text)]"
            />
        </div>
    );
}