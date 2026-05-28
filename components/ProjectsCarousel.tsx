"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/queries";
import MediaTile from "@/components/MediaTile";

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntilRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    pausedUntilRef.current = Date.now() + 6000;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Detect mobile on mount — used to duplicate list for infinite loop autoplay
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // Mobile-only infinite autoplay: advance one card every 4s, instantly wrap
  // around at the halfway point (where duplicated list begins) so the slide
  // feels continuous. Pause for 6s after any user interaction.
  useEffect(() => {
    if (!isMobile) return;

    const el = trackRef.current;
    if (!el) return;

    const markPaused = () => {
      pausedUntilRef.current = Date.now() + 6000;
    };

    const intervalId = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
      const halfWidth = el.scrollWidth / 2;

      // If we've crossed into the duplicated copy, instantly jump back by
      // halfWidth — visually identical (same cards) so the loop is seamless.
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

      el.scrollBy({ left: amount, behavior: "smooth" });
    }, 4000);

    el.addEventListener("touchstart", markPaused, { passive: true });
    el.addEventListener("wheel", markPaused, { passive: true });
    el.addEventListener("mousedown", markPaused);

    return () => {
      window.clearInterval(intervalId);
      el.removeEventListener("touchstart", markPaused);
      el.removeEventListener("wheel", markPaused);
      el.removeEventListener("mousedown", markPaused);
    };
  }, [isMobile]);

  const displayProjects = isMobile ? [...projects, ...projects] : projects;

  return (
    <section className="relative overflow-hidden py-14 sm:py-32">
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
          {displayProjects.map((p, i) => {
            const tall = i % 2 === 0;
            return (
              <Link
                key={`${p.id}-${i}`}
                href={`/projects/${p.slug}`}
                data-card
                className="group w-[calc(100vw-2rem)] shrink-0 snap-center sm:w-[360px] sm:snap-start"
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

                <span className="mt-5 sm:mt-4 block text-xs uppercase tracking-[0.2em] text-white/80">
                  {p.category}
                </span>
                <h3 className="mt-2 sm:mt-1 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 sm:mt-2 max-w-[360px] text-sm leading-relaxed text-brand-muted line-clamp-3 sm:line-clamp-2">
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
          className="absolute left-3 top-[32%] grid h-16 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/5 text-white shadow-xl backdrop-blur-md transition hover:bg-white/15"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="absolute right-3 top-[32%] grid h-16 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/5 text-white shadow-xl backdrop-blur-md transition hover:bg-white/15"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
