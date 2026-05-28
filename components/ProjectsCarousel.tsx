"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/queries";
import MediaTile from "@/components/MediaTile";

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Heading + intro */}
      <div className="container-wide text-center">
        <h2 className="font-condensed text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
          Projects
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
          Brand films, music videos, comedy and campaigns — a closer look at
          what we create. Slide through to explore each project up close.
        </p>
      </div>

      {/* Varied-size carousel */}
      <div className="relative mt-14">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8"
        >
          {projects.map((p, i) => {
            const tall = i % 2 === 0;
            return (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                data-card
                className="group w-[280px] shrink-0 snap-start sm:w-[360px]"
              >
                <div
                  className={`relative w-full overflow-hidden border border-white/10 ${
                    tall ? "aspect-[4/5]" : "aspect-[5/4]"
                  }`}
                >
                  <MediaTile
                    image={p.image}
                    video={p.video}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-brand-gold/40" />
                </div>

                <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-white/80">
                  {p.category}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-brand-muted line-clamp-2">
                  {p.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
          className="absolute left-3 top-[32%] grid h-14 w-12 -translate-y-1/2 place-items-center rounded-[16px] border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="absolute right-3 top-[32%] grid h-14 w-12 -translate-y-1/2 place-items-center rounded-[16px] border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
