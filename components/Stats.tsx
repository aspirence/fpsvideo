"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/queries";

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, visible);
  return (
    <div ref={ref} className="rounded-3xl border border-white/5 bg-brand-card p-4 sm:p-8 text-center">
      <div className="font-display text-3xl sm:text-5xl font-extrabold text-white">
        {n}
        {suffix}
      </div>
      <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-brand-muted">{label}</div>
    </div>
  );
}

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-transparent via-brand-gold/5 to-transparent">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="section-title">
            Numbers that <span className="gradient-text">speak</span>
          </h2>
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
