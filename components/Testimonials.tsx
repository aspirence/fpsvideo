import { testimonials } from "@/lib/data";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title mt-4">
            Loved by <span className="gradient-text">creators</span>
          </h2>
          <p className="mt-4 text-brand-muted">
            We've partnered with some of India's top creators. Here's what they
            say about working with us.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="rounded-3xl border border-white/5 bg-brand-card p-6 flex flex-col"
            >
              <Quote className="text-white" size={28} />
              <blockquote className="mt-4 text-sm leading-relaxed text-white/90 flex-1">
                {t.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover border border-white/10"
                  />
                )}
                <div>
                  <figcaption className="font-semibold text-sm">{t.name}</figcaption>
                  <p className="text-xs text-brand-muted">{t.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
