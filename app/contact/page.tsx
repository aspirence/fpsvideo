import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { Clock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — FPS",
  description: "Get in touch with FPS — Agra-based media production house."
};

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Within a working day. Urgent project? Mention it in your message and we'll prioritize."
  },
  {
    q: "Do you work outside Agra?",
    a: "Yes — we travel across India for shoots, and we deliver editing/design work remotely worldwide."
  },
  {
    q: "Do you offer monthly retainers?",
    a: "Yes. For creators or brands needing consistent content, we set up custom monthly packages."
  },
  {
    q: "What's your typical turnaround?",
    a: "Short-form edits in 3–5 days; full productions vary by scope. We share a clear timeline upfront."
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's talk"
        title="Tell us about your project."
        subtitle="Whether it's a single edit, a brand campaign or an ongoing content engine — we'd love to hear from you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Reveal><Contact /></Reveal>

      <Reveal>
        <section className="py-16 sm:py-20 border-t border-white/5 bg-brand-surface/30">
          <div className="container-wide grid gap-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/5 bg-brand-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <Clock size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">Working hours</h3>
              <ul className="mt-3 text-sm text-brand-muted space-y-1">
                <li>Mon – Sat &nbsp; 10:00 – 19:00</li>
                <li>Sun &nbsp; By appointment</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/5 bg-brand-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <Globe size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">Working with us</h3>
              <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                Based in Agra. Available for shoots across India and remote editing,
                design and post-production globally.
              </p>
            </div>

            <div className="rounded-3xl border border-white/5 bg-brand-card p-6">
              <h3 className="font-display text-lg font-semibold">Find us on the map</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Visit our studio in Agra — drop by during working hours.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/search/Krishna+Vatika+Panchawati+Agra"
                className="btn-ghost mt-4 inline-flex"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20 sm:py-24">
          <div className="container-wide max-w-3xl">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title mt-4">
                Common <span className="gradient-text">questions</span>
              </h2>
            </div>

            <div className="mt-10 divide-y divide-white/5 rounded-3xl border border-white/5 bg-brand-card overflow-hidden">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <span className="font-display font-semibold">{f.q}</span>
                    <span className="text-brand-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
