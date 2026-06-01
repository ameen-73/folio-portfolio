import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/content";

export function Hero() {
    return (
        <section
            className="relative overflow-hidden rounded-b-[3rem] pb-8"
            style={{ background: "var(--hero-gradient)" }}
        >
            <div className="absolute inset-0 bg-black/15 dark:bg-black/25" />

            <Container className="relative pt-32 pb-12 lg:pt-40">
                <div className="grid items-end gap-12 lg:grid-cols-2">
                    <div className="relative">
                        <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-7xl">
                            Hey, I&apos;m a{" "}
                            <span className="underline decoration-white/30 underline-offset-4">
                                Creative Director
                            </span>
                        </h1>

                        <div className="relative mx-auto mt-10 aspect-[3/4] max-w-sm lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:max-w-md">
                            <Image
                                src="/images/hero/portrait.webp"
                                alt="Portrait"
                                fill
                                priority
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        </div>
                    </div>

                    <div className="lg:pt-20">
                        <p className="text-2xl font-semibold text-white lg:text-3xl">
                            Great design should feel invisible
                        </p>
                        <p className="mt-4 max-w-md text-base text-white/85">
                            From logo to language, I build brands that connect and convert.
                        </p>
                    </div>
                </div>
            </Container>

            <Container>
                <div className="grid grid-cols-2 gap-6 border-t border-white/25 pt-8 lg:grid-cols-4">
                    {services.map((s) => (
                        <div key={s.num}>
                            <span className="text-sm text-white/60">{s.num}</span>
                            <p className="mt-1 font-medium text-white">{s.label}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}