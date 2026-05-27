import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Wallet } from "lucide-react";
import MediaTile from "@/components/MediaTile";

const pillars = [
  { icon: Sparkles, title: "Experience" },
  { icon: Layers, title: "Unique projects" },
  { icon: Wallet, title: "Cost-effective" }
];

export default function AboutTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-wide grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="eyebrow">Who We Are</span>
          <h2 className="section-title mt-4">
            FPS — Where <span className="gradient-text">Creativity</span>{" "}
            Meets Results
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed">
            FPS is your one-stop destination for Video Production, Graphic
            Design, Audio Production and Photography that transforms ideas
            into captivating visuals.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {pillars.map((p) => (
              <span
                key={p.title}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80"
              >
                <p.icon size={14} className="text-brand-gold" /> {p.title}
              </span>
            ))}
          </div>

          <Link href="/about" className="btn-ghost mt-8 inline-flex">
            Learn more about us <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative">
            <MediaTile
              image="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80"
              video="/videos/v3.mp4"
              alt="Behind the scenes"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <p className="font-display text-2xl font-bold">
                Bringing stories to life, frame by frame.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
