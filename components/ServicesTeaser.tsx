import Link from "next/link";
import { services } from "@/lib/data";
import { Palette, Video, Mic, Camera, Film, ArrowRight, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Video,
  Mic,
  Camera,
  Film
};

export default function ServicesTeaser() {
  const featured = services.slice(0, 3);
  return (
    <section className="py-20 sm:py-28 bg-brand-surface/40 border-y border-white/5">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Our Services</span>
            <h2 className="section-title mt-4">
              What we do <span className="gradient-text">best</span>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost">
            View all services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => {
            const Icon = iconMap[s.icon] ?? Video;
            return (
              <Link
                key={s.id}
                href="/services"
                className="group rounded-3xl border border-white/5 bg-brand-card p-6 hover:border-brand-gold/40 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-gold/80 mt-1">
                  {s.tagline}
                </p>
                <p className="mt-4 text-sm text-brand-muted leading-relaxed line-clamp-3">
                  {s.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-brand-gold transition">
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
