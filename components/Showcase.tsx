"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/queries";
import MediaTile from "@/components/MediaTile";

export default function Showcase({ portfolio }: { portfolio: PortfolioItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="cinematic-bg relative overflow-hidden py-14 sm:py-32">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 sm:gap-8 lg:grid-cols-[minmax(280px,32%)_1fr] lg:items-start lg:gap-10 lg:px-8">
        {/* Heading */}
        <h2 className="order-1 text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:order-none lg:col-start-1 lg:row-start-1">
          Work that <span className="text-white/80">lingers</span>
        </h2>

        {/* Carousel — between heading and paragraph on mobile; right column on desktop spanning rows */}
        <div className="order-2 relative min-w-0 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3">
          <div
            ref={trackRef}
            className="no-scrollbar -mx-4 flex min-w-0 snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          >
          {portfolio.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              data-card
              className="group relative aspect-[3/4] w-[260px] shrink-0 snap-start overflow-hidden sm:w-[300px]"
            >
              <MediaTile
                image={item.image}
                video={item.video}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-brand-gold/40" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl font-medium leading-tight text-white">
                  {item.title}
                </h3>
                <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-white/80">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
          </div>

          {/* Edge fades so the peeking next card dissolves into the dark
              instead of a hard cut. Scroll-snap brings each card fully into view. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060606] via-[#060606]/70 to-transparent sm:w-28" />
        </div>

        {/* Paragraph */}
        <p className="order-3 text-sm leading-relaxed text-brand-muted lg:order-none lg:col-start-1 lg:row-start-2">
          Every frame tells a story. Films, edits, design and photography —
          each project is crafted in detail so it stays with the viewer long
          after. Slide through the cards to explore.
        </p>

        {/* Arrows */}
        <div className="order-4 flex items-center gap-3 lg:order-none lg:col-start-1 lg:row-start-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="grid h-16 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white shadow-xl backdrop-blur-md transition hover:bg-white/15"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="grid h-16 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white shadow-xl backdrop-blur-md transition hover:bg-white/15"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
