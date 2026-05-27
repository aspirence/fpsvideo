"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bts } from "@/lib/data";
import MediaTile from "@/components/MediaTile";

export default function CharacterShowcase() {
  const [active, setActive] = useState(0);
  const items = bts;
  if (!items.length) return null;
  const current = items[active];

  return (
    <section className="cinematic-bg relative overflow-hidden py-20 sm:py-28">
      <div className="container-wide relative z-10">
        <span className="eyebrow">FPS Originals</span>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Left: details for the active original */}
          <div className="order-2 max-w-md lg:order-1 lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold/90">
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
            <Link
              href="/portfolio"
              className="mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-gold hover:bg-brand-gold hover:text-black"
            >
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

          {/* Right: vertical thumbnail selector (desktop) */}
          <div className="order-3 hidden flex-col gap-3 lg:col-span-2 lg:flex">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={item.title}
                className={`relative aspect-video overflow-hidden border transition ${
                  i === active
                    ? "border-brand-gold opacity-100"
                    : "border-white/10 opacity-50 hover:opacity-90"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: circular avatar selectors */}
        <div className="mt-12 flex justify-center gap-4">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.title}
              className={`relative h-14 w-14 overflow-hidden rounded-full border-2 transition sm:h-16 sm:w-16 ${
                i === active
                  ? "scale-110 border-brand-gold"
                  : "border-white/15 opacity-55 hover:opacity-100"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
