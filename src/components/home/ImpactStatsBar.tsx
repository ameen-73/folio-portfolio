import { Container } from "@/components/ui/Container";
import { getImpactStats } from "@/lib/data";

export async function ImpactStatsBar() {
    const stats = await getImpactStats();

    if (stats.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16">
            <Container>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:px-8 md:py-10">
                    <ul className="grid grid-cols-2 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <li
                                key={stat.id}
                                className={[
                                    "flex flex-col items-center px-4 py-6 text-center md:py-4 md:px-6",
                                    index % 2 === 1 && "border-l border-[var(--border)]",
                                    index >= 2 && "border-t border-[var(--border)] md:border-t-0",
                                    index > 0 && "md:border-l md:border-[var(--border)]",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <p className="text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
                                    {stat.value}
                                </p>
                                <p className="mt-2 max-w-[12rem] text-[10px] font-medium uppercase leading-snug tracking-wider text-[var(--text-muted)] md:text-xs">
                                    {stat.label}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}
