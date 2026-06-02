"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildCategoryTabs } from "@/lib/categories";
import type { Project } from "@/lib/site";

type Slide = {
    category: string;
    project: Project;
};

type Props = {
    projects: Project[];
    className?: string;
};

function buildSlides(projects: Project[]): Slide[] {
    const categories = buildCategoryTabs(projects).filter((c) => c !== "All");
    const slides: Slide[] = [];

    for (const category of categories) {
        for (const project of projects.filter((p) => p.category === category)) {
            slides.push({ category, project });
        }
    }

    if (slides.length === 0 && projects[0]) {
        slides.push({ category: "All", project: projects[0] });
    }

    return slides;
}

export function CategoryHeroSlider({ projects, className = "" }: Props) {
    const slides = useMemo(() => buildSlides(projects), [projects]);
    const categories = useMemo(
        () => [...new Set(slides.map((s) => s.category))],
        [slides]
    );

    const [index, setIndex] = useState(0);
    const active = slides[index];

    const goTo = useCallback(
        (next: number) => {
            if (slides.length === 0) return;
            setIndex(((next % slides.length) + slides.length) % slides.length);
        },
        [slides.length]
    );

    const goToCategory = useCallback(
        (category: string) => {
            const i = slides.findIndex((s) => s.category === category);
            if (i >= 0) setIndex(i);
        },
        [slides]
    );

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = window.setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, [slides.length]);

    if (!active) {
        return null;
    }

    return (
        <div className={className}>
            <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-3xl ring-1 ring-[var(--border)] sm:min-h-[240px] md:aspect-[2.2/1]">
                {slides.map((slide, i) => (
                    <Link
                        key={`${slide.project.slug}-${i}`}
                        href={`/work/${slide.project.slug}`}
                        className={`absolute inset-0 block transition-opacity duration-700 ${
                            i === index ? "opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
                        }`}
                        aria-hidden={i !== index}
                    >
                        <Image
                            src={slide.project.image}
                            alt={slide.project.alt || slide.project.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    </Link>
                ))}

                <span className="absolute bottom-4 left-4 z-20 rounded-xl border border-white/30 bg-black/30 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md">
                    {active.category}
                </span>

                {slides.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(index - 1)}
                            aria-label="Previous slide"
                            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:border-white/55 active:border-white/55"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(index + 1)}
                            aria-label="Next slide"
                            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:border-white/55 active:border-white/55"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {categories.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {categories.map((category) => {
                        const isActive = active.category === category;
                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => goToCategory(category)}
                                aria-pressed={isActive}
                                className={[
                                    "rounded-xl border px-3.5 py-2 text-sm font-medium backdrop-blur-md transition-[border-color,background-color] duration-200",
                                    isActive
                                        ? "border-[var(--text-muted)] bg-[var(--bg-elevated)] text-[var(--text)]"
                                        : "border-[var(--border)] bg-[var(--bg-elevated)]/80 text-[var(--text-muted)] hover:border-[var(--text-muted)] active:border-[var(--text-muted)]",
                                ].join(" ")}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            )}

            {slides.length > 1 && (
                <div className="mt-3 flex justify-center gap-1.5">
                    {slides.map((slide, i) => (
                        <button
                            key={`dot-${slide.project.slug}-${i}`}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                                i === index
                                    ? "w-6 bg-[var(--accent)]"
                                    : "w-1.5 bg-[var(--border)] hover:bg-[var(--text-muted)]"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
