"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
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
    a: "We work with creators and brands across India — on-location shoots as well as fully remote edit, design and audio projects."
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

type Props = {
  faqs?: FaqItem[];
  heading?: string;
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function FaqCard({
  item,
  index,
  isOpen,
  onToggle
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-white/[0.02]"
      >
        <span className="text-base font-semibold text-white sm:text-lg">
          {item.q}
        </span>
        <Plus
          size={22}
          className={`shrink-0 text-white/80 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-400 ease-out ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden px-6">
          <p className="text-sm leading-relaxed text-brand-muted sm:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FAQ({
  faqs = defaultFaqs,
  heading = "Everything you\nneed to know"
}: Props) {
  const [open, setOpen] = useState<number>(0);
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>();

  return (
    <section className="py-14 sm:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="whitespace-pre-line text-4xl font-bold leading-[1.1] sm:text-5xl">
            {heading}
          </h2>
        </div>

        <ul className="space-y-3">
          {faqs.map((f, i) => (
            <FaqCard
              key={i}
              item={f}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
