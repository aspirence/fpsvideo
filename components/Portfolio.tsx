"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import MediaTile from "@/components/MediaTile";

export default function Portfolio() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const items = active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-title mt-4">
              Our <span className="gradient-text">best</span> works
            </h2>
          </div>
          <p className="text-brand-muted max-w-md text-sm">
            A glimpse of our recent projects across video production, design,
            and content for creators.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                active === c
                  ? "bg-brand-gold text-black border-brand-gold"
                  : "border-white/10 text-white/80 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-brand-card aspect-[4/5]"
            >
              <MediaTile
                image={item.image}
                video={item.video}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <span className="text-xs uppercase tracking-widest text-brand-gold">
                  {item.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-brand-gold transition">
                  View project <ArrowUpRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/contact" className="btn-ghost">
            Browse all projects <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
