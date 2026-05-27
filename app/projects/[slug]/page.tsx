import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MediaTile from "@/components/MediaTile";
import VideoEmbed from "@/components/VideoEmbed";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const p = getProjectBySlug(params.slug);
  if (!p) return { title: "Project — FPS" };
  return { title: `${p.title} — FPS`, description: p.description };
}

export default function ProjectDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Solid navbar area on top, then the full-width thumbnail below it */}
      <section className="pt-16 sm:pt-20">
        <div className="relative h-[70vh] w-full overflow-hidden border-y border-white/10 sm:h-[82vh]">
          <MediaTile
            image={project.image}
            video={project.video}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/40" />
        </div>

        {/* Back link + heading + intro — below the video, left-aligned */}
        <div className="container-wide pb-16 pt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-brand-muted transition hover:text-brand-gold"
          >
            <ArrowLeft size={16} /> All projects
          </Link>

          <div className="mt-6">
            <span className="eyebrow">
              {project.category} &middot; {project.year}
            </span>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-none text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-brand-gold/80">
              For {project.client}
            </p>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="leading-relaxed text-brand-muted">
              {project.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Clips */}
      <section className="pb-20 sm:pb-28">
        <div className="container-wide">
          <div className="text-center">
            <span className="eyebrow">Clips</span>
            <h2 className="section-title mt-3">
              From the <span className="gradient-text">project</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.clips.map((clip, i) => (
              <Reveal key={`${clip.title}-${i}`}>
                <figure>
                  <VideoEmbed
                    src={clip.src}
                    title={clip.title}
                    poster={project.image}
                  />
                  <figcaption className="mt-3 text-sm font-medium text-white/90">
                    {clip.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <CTABanner />
      </Reveal>
    </>
  );
}
