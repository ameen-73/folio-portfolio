"use client";

export function LogoutButton() {
    return (
        <button
            type="button"
            className="mt-10 text-sm text-[var(--text-muted)] underline"
            onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
            }}
        >
            Log out
        </button>
    );
}