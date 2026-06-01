import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { featuredProjects } from "@/lib/projects";

export function ProjectGrid() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group overflow-hidden rounded-3xl bg-[var(--bg-elevated)] ring-1 ring-[var(--border)] transition hover:ring-[var(--accent)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}