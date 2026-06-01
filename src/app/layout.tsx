export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteProvider } from "@/contexts/SiteContext";
import { getSite } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
    const site = await getSite();
    return {
        title: `${site.name} — ${site.title}`,
        description: site.tagline,
    };
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const site = await getSite();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}
            >
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <SiteProvider site={site}>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <a
                            href={whatsappUrl(site)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition hover:scale-105"
                        >
                            💬
                        </a>
                    </SiteProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}