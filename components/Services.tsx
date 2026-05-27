import { getServices } from "@/lib/queries";
import { Palette, Video, Mic, Camera, Film, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Video,
  Mic,
  Camera,
  Film
};

export default function Services() {
  const services = getServices();
  return (
    <section id="services" className="py-20 sm:py-28 bg-brand-surface/40 border-y border-white/5">
      <div className="container-wide">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <span className="eyebrow">Our Services</span>
          <h2 className="section-title mt-4">
            What we do <span className="gradient-text">best</span>
          </h2>
          <p className="mt-4 text-brand-muted">
            Five core services, one creative engine — built to turn your idea
            into a finished, scroll-stopping piece of content.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = iconMap[s.icon] ?? Video;
            const isFeatured = idx === 1;
            return (
              <div
                key={s.id}
                className={`group rounded-3xl border p-6 transition relative overflow-hidden ${
                  isFeatured
                    ? "border-brand-gold/40 bg-gradient-to-br from-brand-gold/10 via-brand-card to-brand-card"
                    : "border-white/5 bg-brand-card hover:border-brand-gold/40"
                }`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-gold/80 mt-1">
                  {s.tagline}
                </p>
                <p className="mt-4 text-sm text-brand-muted leading-relaxed">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="rounded-3xl border border-dashed border-white/10 p-6 grid place-items-center text-center bg-brand-card/40">
            <div>
              <h3 className="font-display text-xl font-semibold">
                Need something <span className="gradient-text">custom?</span>
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Tell us about your project and we'll tailor a package for you.
              </p>
              <a href="#contact" className="btn-primary mt-5">
                Talk to us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
