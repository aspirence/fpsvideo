import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Palette,
  Video,
  Mic,
  Camera,
  Film,
  type LucideIcon
} from "lucide-react";
import { services, portfolio } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Video,
  Mic,
  Camera,
  Film
};

// Use a real piece of work as each service's cover, matched by category.
const coverFor = (title: string) =>
  portfolio.find((p) => p.category === title)?.image ?? portfolio[0].image;

export default function ServicesTeaser() {
  return (
    <section className="starfield relative overflow-hidden py-24 sm:py-32">
      <div className="container-wide relative z-10">
        <div className="text-center">
          <span className="eyebrow">What we offer</span>
          <h2 className="mt-4 font-condensed text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
            Services
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-brand-muted">
            Ek hi chhat ke neeche — concept se final delivery tak. Apni zarurat
            ke hisaab se craft choose karo.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Palette;
            return (
              <article
                key={s.id}
                className="group flex flex-col border border-white/10 bg-brand-card/40 backdrop-blur-sm transition hover:border-brand-gold/50 hover:bg-brand-card/70"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={coverFor(s.title)}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale-[40%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center border border-white/15 bg-black/50 text-brand-gold backdrop-blur">
                    <Icon size={18} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold/90">
                      {s.tagline}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-brand-muted">
                    {s.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-white/85"
                      >
                        <Check size={15} className="shrink-0 text-brand-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center justify-center gap-2 border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-brand-gold hover:bg-brand-gold hover:text-black"
                  >
                    Start a project
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
