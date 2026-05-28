import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MediaTile from "@/components/MediaTile";

const pillars = [
  {
    tag: "Studio",
    title: "The home of creative craft.",
    body: [
      "Backed by years of on-set experience, our full-service studio delivers branded films, music videos, ad campaigns and YouTube content for ambitious creators and growing brands.",
      "From the first concept call to the final colour grade — we build every piece around your audience and your goals."
    ],
    cta: "Explore our work",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    video: "/videos/v1.mp4",
    alt: "Cinematic film shoot"
  },
  {
    tag: "Originals",
    title: "Storytelling without limits.",
    body: [
      "FPS Originals is our in-house slate — a space where new voices and unconventional ideas get to breathe. Short films, music covers, comedy, vines and serialised content built to push craft.",
      "It's where we experiment with the formats and stories the brief doesn't always allow for."
    ],
    cta: "See originals",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",
    video: "/videos/visual-project.mp4",
    alt: "Behind the scenes creative work"
  }
];

export default function Studio() {
  return (
    <section className="py-12 sm:py-28">
      <div className="container-wide space-y-6 sm:space-y-8">
        {pillars.map((p, idx) => (
          <article
            key={p.tag}
            className="rounded-3xl border border-white/5 bg-brand-card/30 p-5 sm:p-8 lg:p-10 grid gap-8 lg:gap-10 lg:grid-cols-2 items-center"
          >
            <div className={`order-2 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
              <span className="inline-block rounded-md bg-black/60 border border-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.25em] text-white/80 uppercase">
                {p.tag}
              </span>

              <h2 className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight">
                {p.title}
              </h2>

              <div className="mt-5 space-y-4 text-brand-muted leading-relaxed text-sm sm:text-base max-w-xl">
                {p.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <Link href={p.href} className="btn-primary mt-8 group/cta">
                {p.cta}
                <ArrowUpRight
                  size={16}
                  className="transition group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </Link>
            </div>

            <div className={`order-1 ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
              <div className="relative aspect-video lg:aspect-[5/4] rounded-2xl overflow-hidden border border-white/5">
                <MediaTile
                  image={p.image}
                  video={p.video}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
