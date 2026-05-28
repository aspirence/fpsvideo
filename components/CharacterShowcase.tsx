"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Bts } from "@/lib/queries";
import MediaTile from "@/components/MediaTile";

export default function CharacterShowcase({ bts }: { bts: Bts[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const items = bts;
  if (!items.length) return null;
  const displayIndex = hovered ?? active;
  const current = items[displayIndex];

  return (
    <section className="cinematic-bg relative overflow-hidden py-12 sm:py-28">
      <div className="container-wide relative z-10">
        <span className="eyebrow">FPS Originals</span>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Left: details for the active original */}
          <div className="order-2 max-w-md lg:order-1 lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-white/90">
              {current.label}
            </span>
            <h2
              key={`title-${current.id}`}
              className="mt-4 animate-fade-in font-serif text-5xl font-medium leading-none text-white sm:text-6xl"
            >
              {current.title}
            </h2>
            <p
              key={`desc-${current.id}`}
              className="mt-6 animate-fade-in text-sm leading-relaxed text-brand-muted"
            >
              {current.description}
            </p>
            <Link href="/portfolio" className="btn-primary mt-8">
              View originals
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Center: big visual for the active original */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden sm:aspect-[16/11] sm:max-w-none">
              <MediaTile
                key={current.id}
                image={current.image}
                video={current.video}
                alt={current.title}
                className="absolute inset-0 h-full w-full animate-fade-in object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>

          {/* Thumbnail selector — horizontal on mobile, vertical column on desktop */}
          <div className="no-scrollbar order-3 flex gap-3 overflow-x-auto lg:col-span-2 lg:flex-col lg:overflow-visible">
            {items.map((item, i) => {
              const isShown = displayIndex === i;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  aria-label={item.title}
                  className={`relative aspect-video w-28 shrink-0 overflow-hidden border transition lg:w-auto ${
                    isShown
                      ? "border-brand-gold opacity-100"
                      : "border-white/10 opacity-50 hover:opacity-90"
                  }`}
                >
                  <MediaTile
                    image={item.image}
                    video={item.video}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
