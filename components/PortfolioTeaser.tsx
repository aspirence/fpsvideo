import Link from "next/link";
import { getPortfolio } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import MediaTile from "@/components/MediaTile";

export default function PortfolioTeaser() {
  const featured = getPortfolio().slice(0, 3);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Featured Work</span>
            <h2 className="section-title mt-4">
              A taste of our <span className="gradient-text">recent</span> projects
            </h2>
          </div>
          <Link href="/portfolio" className="btn-ghost">
            Browse all work <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-brand-card aspect-[4/5] block"
            >
              <MediaTile
                image={item.image}
                video={item.video}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <span className="text-xs uppercase tracking-widest text-brand-gold">
                  {item.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-brand-gold transition">
                  View project <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
