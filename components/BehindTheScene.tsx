import { getBts } from "@/lib/queries";
import MediaTile from "@/components/MediaTile";

export default function BehindTheScene() {
  const bts = getBts();
  return (
    <section className="py-20 sm:py-28 bg-brand-surface/40 border-y border-white/5">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Behind The Scene</span>
          <h2 className="section-title mt-4">
            Categories we <span className="gradient-text">love</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bts.map((b) => (
            <div
              key={b.id}
              className="group relative overflow-hidden rounded-3xl aspect-square border border-white/5"
            >
              <MediaTile
                image={b.image}
                video={b.video}
                alt={b.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <h3 className="font-display text-2xl font-bold">{b.title}</h3>
                <div className="mt-1 h-0.5 w-10 bg-brand-gold group-hover:w-20 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
