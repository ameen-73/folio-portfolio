"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/site";

type Props = {
    testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = testimonials[activeIndex];

    if (!active) return null;

    return (
        <div className="mt-10">
            <figure className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 md:p-10">
                <blockquote className="text-lg leading-relaxed text-[var(--text)] md:text-xl">
                    &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                    {active.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={active.avatar}
                            alt=""
                            className="h-12 w-12 rounded-full object-cover ring-1 ring-[var(--border)]"
                        />
                    ) : (
                        <span
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-sm font-bold text-[var(--accent)]"
                            aria-hidden
                        >
                            {active.author.charAt(0)}
                        </span>
                    )}
                    <div>
                        <p className="font-semibold text-[var(--text)]">{active.author}</p>
                        {active.role && (
                            <p className="text-sm text-[var(--text-muted)]">{active.role}</p>
                        )}
                    </div>
                </figcaption>
            </figure>

            {testimonials.length > 1 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {testimonials.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show testimonial from ${item.author}`}
                            aria-current={index === activeIndex}
                            className={`h-2.5 rounded-full transition ${
                                index === activeIndex
                                    ? "w-8 bg-[var(--accent)]"
                                    : "w-2.5 bg-[var(--border)] hover:bg-[var(--text-muted)]"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
