"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MediaTile from "@/components/MediaTile";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/queries";

const INITIAL = 4;

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL);

  return (
    <div className="container-wide space-y-12 sm:space-y-16">
      {visible.map((p, i) => {
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
                <h2 className="font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
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

      {!showAll && projects.length > INITIAL && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-colors duration-300"
          >
            <span className="pointer-events-none absolute bottom-0 left-1/2 z-0 aspect-square w-[135%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-emerald-400 transition-transform duration-500 ease-out group-hover:scale-100" />
            <span className="relative z-10">View all projects</span>
          </button>
        </div>
      )}
    </div>
  );
}
