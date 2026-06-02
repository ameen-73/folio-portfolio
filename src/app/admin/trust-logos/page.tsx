"use client";

import Link from "next/link";
import { useEffect, useState, ChangeEvent } from "react";
import type { TrustLogo } from "@/lib/site";

function slugify(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

const emptyLogo = (): TrustLogo => ({
    id: `logo-${Date.now()}`,
    name: "",
    image: "",
    alt: "",
    href: "",
});

export default function AdminTrustLogosPage() {
    const [logos, setLogos] = useState<TrustLogo[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/admin/trust-logos")
            .then((res) => {
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return [];
                }
                return res.json();
            })
            .then((data: TrustLogo[]) => {
                setLogos(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    function updateLogo(index: number, patch: Partial<TrustLogo>) {
        setLogos((prev) =>
            prev.map((logo, i) => (i === index ? { ...logo, ...patch } : logo))
        );
    }

    function addLogo() {
        setLogos((prev) => [...prev, emptyLogo()]);
    }

    function removeLogo(index: number) {
        setLogos((prev) => prev.filter((_, i) => i !== index));
    }

    function moveLogo(index: number, direction: -1 | 1) {
        const next = index + direction;
        if (next < 0 || next >= logos.length) return;
        setLogos((prev) => {
            const copy = [...prev];
            [copy[index], copy[next]] = [copy[next], copy[index]];
            return copy;
        });
    }

    async function handleSave() {
        setSaving(true);
        setMessage("");

        const cleaned = logos.map((logo, index) => {
            const name = logo.name.trim();
            const id =
                logo.id.trim() ||
                slugify(name) ||
                `logo-${index + 1}-${Date.now()}`;
            return {
                ...logo,
                id: slugify(id) || id,
                name,
                image: logo.image.trim(),
                alt: logo.alt.trim() || name,
                href: logo.href.trim(),
            };
        });

        const invalid = cleaned.find((l) => !l.name || !l.image);
        if (invalid) {
            setSaving(false);
            setMessage("Each logo needs a name and an image (PNG or SVG).");
            return;
        }

        const res = await fetch("/api/admin/trust-logos", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleaned),
        });

        setSaving(false);
        if (res.ok) {
            setLogos(cleaned);
            setMessage("Trust logos saved.");
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
                Trusted by logos
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
                Upload PNG or SVG brand logos for the auto-scrolling marquee on the
                homepage. Logos appear grey until hovered or tapped, then show in
                full color.
            </p>

            <div className="mt-10 space-y-8">
                {logos.map((logo, index) => (
                    <article
                        key={logo.id}
                        className="rounded-xl border border-[var(--border)] p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-sm font-semibold text-[var(--text)]">
                                Logo {index + 1}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => moveLogo(index, -1)}
                                    disabled={index === 0}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move up"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveLogo(index, 1)}
                                    disabled={index === logos.length - 1}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move down"
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeLogo(index)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        <Input
                            label="Brand name"
                            value={logo.name}
                            onChange={(v) => updateLogo(index, { name: v })}
                        />
                        <LogoUpload
                            value={logo.image}
                            onChange={(v) => updateLogo(index, { image: v })}
                        />
                        <Input
                            label="Alt text (optional)"
                            value={logo.alt}
                            onChange={(v) => updateLogo(index, { alt: v })}
                        />
                        <Input
                            label="Link URL (optional)"
                            value={logo.href}
                            onChange={(v) => updateLogo(index, { href: v })}
                            placeholder="https://example.com"
                        />
                    </article>
                ))}
            </div>

            <button
                type="button"
                onClick={addLogo}
                className="mt-8 rounded-full border border-dashed border-[var(--border)] px-6 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
                + Add logo
            </button>

            <div className="mt-10">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save all logos"}
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

function LogoUpload({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isImage =
            file.type.startsWith("image/") ||
            file.name.toLowerCase().endsWith(".svg");
        if (!isImage) {
            setError("Please upload a PNG or SVG image.");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "trust-logos");

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error ?? "Failed to upload logo");
            }

            const data = await res.json();
            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                Logo file (PNG or SVG)
            </label>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative flex h-16 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={value}
                            alt="Logo preview"
                            className="max-h-12 w-full object-contain"
                        />
                    ) : (
                        <span className="text-[10px] text-[var(--text-muted)]">
                            No logo
                        </span>
                    )}
                </div>
                <div className="flex-1 space-y-2 w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Upload or paste image URL"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                    />
                    <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text)] hover:bg-[var(--border)] transition">
                            {uploading ? "Uploading…" : "Upload PNG / SVG"}
                            <input
                                type="file"
                                accept="image/png,image/svg+xml,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </label>
                        {error && (
                            <span className="text-xs text-red-500 font-medium">
                                {error}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
