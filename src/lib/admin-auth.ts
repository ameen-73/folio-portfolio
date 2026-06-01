import { cookies } from "next/headers";

const COOKIE_NAME = "folio_admin";

export async function isAdmin(): Promise<boolean> {
    const store = await cookies();
    return store.get(COOKIE_NAME)?.value === "1";
}

export async function setAdminCookie(): Promise<void> {
    const store = await cookies();
    store.set(COOKIE_NAME, "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}

export async function clearAdminCookie(): Promise<void> {
    const store = await cookies();
    store.delete(COOKIE_NAME);
}