"use client";

type Props = {
    categories: string[];
    active: string;
    onChange: (category: string) => void;
    className?: string;
};

export function CategoryFilter({
    categories,
    active,
    onChange,
    className = "",
}: Props) {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {categories.map((category) => {
                const isActive = category === active;
                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onChange(category)}
                        aria-pressed={isActive}
                        className={[
                            "touch-manipulation rounded-xl border px-4 py-2.5 text-sm font-medium transition-[border-color,box-shadow] duration-200",
                            "bg-[var(--bg-elevated)] text-[var(--text)]",
                            isActive
                                ? "border-[var(--text-muted)] shadow-[0_0_0_1px_var(--border)]"
                                : "border-[var(--border)] hover:border-[var(--text-muted)] active:border-[var(--text-muted)] focus-visible:outline-none focus-visible:border-[var(--text-muted)]",
                        ].join(" ")}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}
