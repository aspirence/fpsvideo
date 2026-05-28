import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
  image
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Lighter overlays — image is more visible while headline stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-brand-bg/40 to-brand-bg/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/50 via-transparent to-transparent" />
        </>
      )}

      {!image && <div className="absolute inset-0 hero-grid" />}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[360px] w-[700px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent)" }}
      />

      <div className="container-wide relative flex min-h-[46vh] flex-col justify-end pt-36 pb-14 sm:min-h-[54vh] sm:pt-44 sm:pb-16">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-brand-muted">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/60">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <span className="eyebrow mt-4 block">{eyebrow}</span>}

        <h1 className="mt-3 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-brand-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
