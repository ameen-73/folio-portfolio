import Link from "next/link";
import { ReactNode } from "react";

type Variant = "light" | "accent";

type Props = {
    href: string;
    children: ReactNode;
    variant?: Variant;
};

export function Button({ href, children, variant = "light" }: Props) {
    const isLight = variant === "light";

    return (
        <Link
            href={href}
            className={
                isLight
                    ? "inline-flex items-center gap-3 rounded-full bg-[var(--bg-elevated)] py-2 pl-6 pr-2 text-sm font-medium text-[var(--text)] shadow-lg"
                    : "inline-flex items-center gap-3 rounded-full bg-[var(--accent)] py-2 pl-6 pr-2 text-sm font-medium text-white shadow-lg"
            }
        >
            {children}
            <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${isLight ? "bg-[var(--accent)] text-white" : "bg-white text-[var(--accent)]"
                    }`}
                aria-hidden
            >
                →
            </span>
        </Link>
    );
}