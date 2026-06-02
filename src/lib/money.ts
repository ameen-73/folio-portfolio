export function formatInr(value: number): string {
    const safe = Number.isFinite(value) ? value : 0;
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(safe);
}

