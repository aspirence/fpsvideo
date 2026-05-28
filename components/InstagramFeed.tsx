import { Film, Instagram } from "lucide-react";
import { getInstagram, getSite } from "@/lib/queries";

export default function InstagramFeed() {
  const posts = getInstagram().slice(0, 9);
  const site = getSite();
  const profileUrl = site?.social?.instagram || "https://www.instagram.com/";

  if (posts.length === 0) return null;

  return (
    <section className="py-12 sm:py-28">
      <div className="container-wide">
        <div className="text-center">
          <span className="eyebrow inline-flex items-center gap-2">
            <Instagram size={14} /> Follow us
          </span>
          <h2 className="section-title mt-3">Latest from Instagram</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-brand-muted">
            Behind-the-scenes moments, finished cuts and quick reels — straight
            from our feed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {posts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={post.alt}
              className="group relative block aspect-square overflow-hidden border border-white/10 bg-brand-card"
            >
              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <span className="pointer-events-none absolute right-2 top-2 grid h-7 w-7 place-items-center bg-black/55 text-white backdrop-blur-sm">
                <Film size={14} strokeWidth={2} />
              </span>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram size={28} className="text-white drop-shadow-lg" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            <Instagram size={16} /> View our Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
