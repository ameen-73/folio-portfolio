import type { TrustLogo } from "@/lib/site";
import { TrustLogoImage } from "@/components/home/TrustLogoImage";

type LogoMarqueeProps = {
    logos: TrustLogo[];
};

export function LogoMarquee({ logos }: LogoMarqueeProps) {
    const track = [...logos, ...logos];

    return (
        <div className="relative mt-8 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul
                className="flex w-max animate-trust-marquee items-center gap-14 py-2 motion-reduce:animate-none md:gap-20 hover:[animation-play-state:paused]"
                role="list"
                aria-label="Brand logos"
            >
                {track.map((logo, index) => (
                    <li key={`${logo.id}-${index}`} className="shrink-0">
                        <TrustLogoImage logo={logo} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
