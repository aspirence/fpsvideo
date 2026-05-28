import { Sparkles, Layers, Wallet } from "lucide-react";
import MediaTile from "@/components/MediaTile";

const pillars = [
  {
    icon: Sparkles,
    title: "Experience",
    desc: "From strategy to execution, our team of 4+ years delivers organic content that resonates and drives engagement."
  },
  {
    icon: Layers,
    title: "Unique Projects",
    desc: "Through our unique projects we've driven millions of views, partnering with top creators across India."
  },
  {
    icon: Wallet,
    title: "Cost-effective",
    desc: "Affordable for every creator — from one-time shoots to large-scale, ongoing content production."
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-wide grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="eyebrow">Who We Are</span>
          <h2 className="section-title mt-4">
            FPS — Where <span className="gradient-text">Creativity</span>{" "}
            Meets Results
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed">
            FPS is your one-stop destination for high-impact Video
            Production, Graphic Design, Audio Production, and Photography that
            transforms ideas into captivating visuals. We craft connectable
            stories that engage your audience and drive measurable outcomes.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/5 bg-brand-card p-5"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/10 text-white">
                  <p.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-lg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
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
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-black">
                Behind The Scene
              </div>
              <p className="mt-3 font-display text-2xl font-bold">
                Bringing stories to life, frame by frame.
              </p>
            </div>
          </div>
          <div className="hidden sm:block absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-brand-card p-4 w-48">
            <div className="text-3xl font-display font-bold text-white">
              50M+
            </div>
            <div className="text-xs text-brand-muted">Total views generated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
