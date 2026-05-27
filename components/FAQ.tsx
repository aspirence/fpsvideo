"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How do I start a project with FPS?",
    a: "Just hit “Start a project” or drop us a message on the contact page. Tell us your idea, timeline and budget — we’ll get back within a day with a clear plan and quote."
  },
  {
    q: "What services do you offer?",
    a: "We’re a full-service media production house — video production, video editing, graphic design, audio production and photography. Everything from the first concept to the final delivery, under one roof."
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "We’re based in Agra, India, and work with creators and brands across the country — on-location shoots as well as fully remote edit, design and audio projects."
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A set of reels can turn around in a few days; a full brand film usually takes a couple of weeks. We share a clear timeline before we begin so there are no surprises."
  },
  {
    q: "Do you handle both shooting and editing?",
    a: "Yes — we cover the entire pipeline: pre-production and scripting, the shoot, edit, sound design, colour grade and final delivery. You deal with one team, start to finish."
  },
  {
    q: "Can I use the final work commercially?",
    a: "Absolutely. Everything we deliver is yours to use across your campaigns, social platforms and websites."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-3">
            Questions, <span className="gradient-text">answered</span>
          </h2>
        </div>

        <ul className="border-t border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-lg font-semibold text-white sm:text-xl">
                    {f.q}
                  </span>
                  {isOpen ? (
                    <Minus size={26} className="shrink-0 text-brand-gold" />
                  ) : (
                    <Plus
                      size={26}
                      className="shrink-0 text-brand-gold transition group-hover:text-brand-gold"
                    />
                  )}
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm leading-relaxed text-brand-muted sm:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
