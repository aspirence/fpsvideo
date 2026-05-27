"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FastForward, Eye, type LucideIcon } from "lucide-react";

type Solid = {
  kind: "solid";
  color: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};
type Image = {
  kind: "image";
  image: string;
  title: string;
  desc: string;
};
type Card = Solid | Image;

const cards: Card[] = [
  {
    kind: "solid",
    color: "bg-brand-gold",
    icon: FastForward,
    title: "Cinematic Video",
    desc: "Photorealistic, high-end video output — concept to final grade in one seamless pipeline."
  },
  {
    kind: "image",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
    title: "Sound & Audio",
    desc: "Original music, voice-over, sound design and mixing that gives your story its soul."
  },
  {
    kind: "solid",
    color: "bg-sky-300",
    icon: Eye,
    title: "Creative Direction",
    desc: "Detailed direction on lighting, framing, movement and tone — every shot intentional."
  },
  {
    kind: "image",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
    title: "End-to-End Workflow",
    desc: "Moodboards, storyboards, shoot, edit and delivery — all crafted under one roof."
  }
];

export default function WhatWeDeliver() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="overflow-hidden pb-24 pt-8 sm:pb-32 sm:pt-12">
      <div className="container-wide text-center">
        <h2 className="font-condensed text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
          What is FPS?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
          FPS is a full-service media production house from Agra — turning ideas
          into films, design, sound and photography that move people. From the
          first concept to the final cut, every frame is crafted with intent.
        </p>

        <h3 className="mt-16 font-condensed text-3xl uppercase tracking-tight text-white sm:text-4xl">
          What We Deliver
        </h3>
      </div>

      <div
        ref={ref}
        className="container-wide mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ transitionDelay: `${i * 220}ms` }}
            className={`transition-all duration-[1100ms] ease-out will-change-transform ${
              shown
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            }`}
          >
            {card.kind === "solid" ? (
              <div
                className={`flex min-h-[420px] flex-col p-8 text-black ${card.color}`}
              >
                <card.icon size={56} strokeWidth={1.5} />
                <div className="mt-auto pt-10">
                  <h4 className="font-display text-2xl font-bold">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-black/75">
                    {card.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative min-h-[420px] overflow-hidden border border-white/10 lg:mt-10">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 border border-white/10 bg-black/55 p-5 backdrop-blur-md">
                  <h4 className="font-display text-xl font-bold text-white">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {card.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-colors duration-300"
        >
          {/* Green fill that rises from the bottom-center on hover */}
          <span className="pointer-events-none absolute bottom-0 left-1/2 z-0 aspect-square w-[135%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-emerald-400 transition-transform duration-500 ease-out group-hover:scale-100" />
          <span className="relative z-10">Let&apos;s work together</span>
        </Link>
      </div>
    </section>
  );
}
