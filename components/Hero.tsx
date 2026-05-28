import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] sm:min-h-screen bg-black flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/cars-hero.mp4" type="video/mp4" />
        <source src="/videos/cars-hero-alt.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      <div className="container-wide relative z-10 pt-48 sm:pt-64 pb-8 flex-1">
        <div className="max-w-3xl">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            A full-service production studio
          </span>

          <h1 className="hero-title mt-4 font-normal text-[clamp(2.25rem,8vw,6rem)] leading-[0.9] tracking-tight uppercase text-white">
            <span className="block">Creative</span>
            <span className="block gradient-text">Stories</span>
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-full bg-brand-gold text-white font-bold text-sm shrink-0">
              F
            </span>
            <p className="text-xs sm:text-sm text-white/85">
              FPS &middot; Production house
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide relative z-10 pb-10 sm:pb-14 text-center">
        <p className="text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          A full-service media production house — video, design, audio and
          photography for creators and brands that want to stand out.
        </p>

        <Link href="/contact" className="btn-primary mt-5 text-xs">
          Start your project <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}
