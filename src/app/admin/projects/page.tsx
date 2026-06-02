"use client";

import Link from "next/link";
import { useEffect, useState, ChangeEvent } from "react";
import type { Project } from "@/lib/site";
import { PROJECT_CATEGORIES } from "@/lib/content";

const emptyProject = (): Project => ({
    slug: "",
    title: "",
    image: "/images/projects/project-1.webp",
    alt: "",
    role: "",
    year: new Date().getFullYear().toString(),
    category: PROJECT_CATEGORIES[0],
    featured: false,
    tags: [],
    summary: "",
    problem: "",
    solution: "",
    outcome: "",
});

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/admin/projects")
            .then((res) => {
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return [];
                }
                return res.json();
            })
            .then((data: Project[]) => {
                setProjects(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    function updateProject(index: number, patch: Partial<Project>) {
        setProjects((prev) =>
            prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
        );
    }

    function addProject() {
        setProjects((prev) => [...prev, emptyProject()]);
    }

    function removeProject(index: number) {
        setProjects((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSave() {
        setSaving(true);
        setMessage("");

        const cleaned = projects.map((p) => ({
            ...p,
            slug: p.slug.trim().toLowerCase().replace(/\s+/g, "-"),
            category: p.category.trim() || PROJECT_CATEGORIES[0],
            featured: Boolean(p.featured),
            tags: Array.isArray(p.tags)
                ? p.tags
                : String(p.tags)
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
        }));

        const res = await fetch("/api/admin/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleaned),
        });

        setSaving(false);
        if (res.ok) {
            setProjects(cleaned);
            setMessage("Projects saved.");
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
            <Link href="/admin" className="text-sm text-[var(--accent)]">
                ← Back to admin
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">Projects</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
                Edit projects, then click Save all. Slug = URL path (/work/your-slug).
            </p>

            <div className="mt-8 space-y-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-[var(--border)] p-6 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-[var(--text)]">
                                Project {index + 1}
                            </h2>
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="text-sm text-red-500"
                            >
                                Remove
                            </button>
                        </div>

                        <Input
                            label="Slug"
                            value={project.slug}
                            onChange={(v) => updateProject(index, { slug: v })}
                        />
                        <Input
                            label="Title"
                            value={project.title}
                            onChange={(v) => updateProject(index, { title: v })}
                        />
                        <ImageUpload
                            label="Project Image"
                            value={project.image}
                            onChange={(v) => updateProject(index, { image: v })}
                        />
                        <Input
                            label="Alt text"
                            value={project.alt}
                            onChange={(v) => updateProject(index, { alt: v })}
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                                label="Role"
                                value={project.role}
                                onChange={(v) => updateProject(index, { role: v })}
                            />
                            <Input
                                label="Year"
                                value={project.year}
                                onChange={(v) => updateProject(index, { year: v })}
                            />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Select
                                label="Category"
                                value={project.category}
                                options={[...PROJECT_CATEGORIES]}
                                onChange={(v) => updateProject(index, { category: v })}
                            />
                            <Checkbox
                                label="Featured on homepage"
                                checked={project.featured}
                                onChange={(v) => updateProject(index, { featured: v })}
                            />
                        </div>
                        <Input
                            label="Tags (comma-separated)"
                            value={
                                Array.isArray(project.tags) ? project.tags.join(", ") : ""
                            }
                            onChange={(v) =>
                                updateProject(index, {
                                    tags: v.split(",").map((t) => t.trim()).filter(Boolean),
                                })
                            }
                        />
                        <Textarea
                            label="Summary"
                            value={project.summary}
                            onChange={(v) => updateProject(index, { summary: v })}
                        />
                        <Textarea
                            label="Problem"
                            value={project.problem}
                            onChange={(v) => updateProject(index, { problem: v })}
                        />
                        <Textarea
                            label="Solution"
                            value={project.solution}
                            onChange={(v) => updateProject(index, { solution: v })}
                        />
                        <Textarea
                            label="Outcome"
                            value={project.outcome}
                            onChange={(v) => updateProject(index, { outcome: v })}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
                <button
                    type="button"
                    onClick={addProject}
                    className="rounded-full border border-[var(--border)] px-5 py-2 text-sm text-[var(--text)]"
                >
                    + Add project
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save all projects"}
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
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
            />
        </div>
    );
}

function Select({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Checkbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="flex items-end gap-2 pb-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--text)]">{label}</span>
        </label>
    );
}

function Textarea({
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
            <label className="block text-xs font-medium text-[var(--text-muted)]">
                {label}
            </label>
            <textarea
                rows={3}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
            />
        </div>
    );
}

function ImageUpload({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // basic validation
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

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
                {label}
            </label>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={value}
                            alt="Project preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-[10px] text-[var(--text-muted)]">No image</span>
                    )}
                </div>
                <div className="flex-1 space-y-2 w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="/images/projects/placeholder.webp"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                    />
                    <div className="flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text)] hover:bg-[var(--border)] transition">
                            {uploading ? "Uploading..." : "Upload Image"}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </label>
                        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}