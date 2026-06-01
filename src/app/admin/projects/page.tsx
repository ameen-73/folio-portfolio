"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/site";

const emptyProject = (): Project => ({
    slug: "",
    title: "",
    image: "/images/projects/project-1.webp",
    alt: "",
    role: "",
    year: new Date().getFullYear().toString(),
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
                        <Input
                            label="Image path"
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