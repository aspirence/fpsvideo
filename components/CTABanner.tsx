import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner({
  title = "Got a project in mind?",
  subtitle = "Tell us about your idea — we'll get back within a day.",
  ctaLabel = "Start a project",
  ctaHref = "/contact"
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-12 sm:py-24">
      <div className="container-wide">
        <div className="relative overflow-hidden border border-white/10 bg-brand-surface p-8 sm:p-14 text-center">
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto">
              {title}
            </h2>
            <p className="mt-4 text-brand-muted max-w-xl mx-auto">{subtitle}</p>
            <Link href={ctaHref} className="btn-primary mt-8 inline-flex">
              {ctaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
