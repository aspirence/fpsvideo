import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import MediaTile from "@/components/MediaTile";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — FPS",
  description:
    "Selected case studies from FPS — brand films, music videos, comedy, reels, design and documentary work."
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Projects we're proud of."
        subtitle="A closer look at the work — the brief, the craft and the result. Six pieces across film, music, comedy, social, design and documentary."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        image="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 sm:py-28">
        <div className="container-wide space-y-12 sm:space-y-16">
          {projects.map((p, i) => {
            const mediaLeft = i % 2 === 0;
            return (
              <Reveal key={p.id}>
                <article
                  className={`grid items-center gap-6 border border-white/10 bg-brand-surface p-4 sm:gap-8 sm:p-6 lg:gap-10 lg:p-8 ${
                    mediaLeft
                      ? "lg:grid-cols-[1.6fr_1fr]"
                      : "lg:grid-cols-[1fr_1.6fr]"
                  }`}
                >
                  {/* Media */}
                  <Link
                    href={`/projects/${p.slug}`}
                    className={`group relative block aspect-video overflow-hidden border border-white/10 ${
                      mediaLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <MediaTile
                      image={p.image}
                      video={p.video}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 border border-white/15 bg-black/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold shadow-lg backdrop-blur">
                      {p.category}
                    </span>
                  </Link>

                  {/* Details */}
                  <div className={mediaLeft ? "lg:order-2" : "lg:order-1"}>
                    <span className="font-condensed text-5xl leading-none text-white/15 sm:text-6xl">
                      {p.number}
                    </span>
                    <h2 className="mt-2 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brand-gold/80">
                      For {p.client} &middot; {p.year}
                    </p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
                      {p.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/projects/${p.slug}`}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-gold"
                    >
                      View project <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal>
        <CTABanner />
      </Reveal>
    </>
  );
}
