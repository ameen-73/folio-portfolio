"use client";

import Link from "next/link";
import { useEffect, useState, ChangeEvent } from "react";
import type { Testimonial } from "@/lib/site";

function slugify(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

const emptyTestimonial = (): Testimonial => ({
    id: `testimonial-${Date.now()}`,
    quote: "",
    author: "",
    role: "",
    avatar: "",
});

export default function AdminTestimonialsPage() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/admin/testimonials")
            .then((res) => {
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return [];
                }
                return res.json();
            })
            .then((data: Testimonial[]) => {
                setItems(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    function updateItem(index: number, patch: Partial<Testimonial>) {
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
        );
    }

    function addItem() {
        setItems((prev) => [...prev, emptyTestimonial()]);
    }

    function removeItem(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }

    function moveItem(index: number, direction: -1 | 1) {
        const next = index + direction;
        if (next < 0 || next >= items.length) return;
        setItems((prev) => {
            const copy = [...prev];
            [copy[index], copy[next]] = [copy[next], copy[index]];
            return copy;
        });
    }

    async function handleSave() {
        setSaving(true);
        setMessage("");

        const cleaned = items.map((item, index) => {
            const author = item.author.trim();
            const id =
                item.id.trim() ||
                slugify(author) ||
                `testimonial-${index + 1}-${Date.now()}`;
            return {
                id: slugify(id) || id,
                quote: item.quote.trim(),
                author,
                role: item.role.trim(),
                avatar: item.avatar.trim(),
            };
        });

        const invalid = cleaned.find((t) => !t.quote || !t.author);
        if (invalid) {
            setSaving(false);
            setMessage("Each testimonial needs a quote and author name.");
            return;
        }

        const res = await fetch("/api/admin/testimonials", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleaned),
        });

        setSaving(false);
        if (res.ok) {
            setItems(cleaned);
            setMessage("Testimonials saved.");
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
            <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">Testimonials</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
                Manage client quotes shown on the homepage before the contact section.
            </p>

            <div className="mt-10 space-y-8">
                {items.map((item, index) => (
                    <article
                        key={item.id}
                        className="rounded-xl border border-[var(--border)] p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-sm font-semibold text-[var(--text)]">
                                Testimonial {index + 1}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => moveItem(index, -1)}
                                    disabled={index === 0}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move up"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveItem(index, 1)}
                                    disabled={index === items.length - 1}
                                    className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-40"
                                    aria-label="Move down"
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        <Textarea
                            label="Quote"
                            value={item.quote}
                            onChange={(v) => updateItem(index, { quote: v })}
                            rows={4}
                        />
                        <Input
                            label="Author name"
                            value={item.author}
                            onChange={(v) => updateItem(index, { author: v })}
                        />
                        <Input
                            label="Role / company"
                            value={item.role}
                            onChange={(v) => updateItem(index, { role: v })}
                            placeholder="Founder, Acme Inc."
                        />
                        <AvatarUpload
                            value={item.avatar}
                            onChange={(v) => updateItem(index, { avatar: v })}
                        />
                    </article>
                ))}
            </div>

            <button
                type="button"
                onClick={addItem}
                className="mt-8 rounded-full border border-dashed border-[var(--border)] px-6 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
                + Add testimonial
            </button>

            <div className="mt-10">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save all testimonials"}
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

function Textarea({
    label,
    value,
    onChange,
    rows = 3,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                {label}
            </label>
            <textarea
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
            />
        </div>
    );
}

function AvatarUpload({
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

        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "projects");

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error ?? "Failed to upload image");
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
                Avatar (optional)
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-4">
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={value}
                        alt="Avatar preview"
                        className="h-14 w-14 rounded-full object-cover ring-1 ring-[var(--border)]"
                    />
                ) : null}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Image URL (optional)"
                    className="min-w-[200px] flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
                />
                <label className="cursor-pointer inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium text-[var(--text)] hover:bg-[var(--border)]">
                    {uploading ? "Uploading…" : "Upload"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        </div>
    );
}
