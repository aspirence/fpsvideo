import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MediaTile from "@/components/MediaTile";
import VideoEmbed from "@/components/VideoEmbed";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return { title: "Project — FPS" };
  return { title: `${p.title} — FPS`, description: p.description };
}

export default function ProjectDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Intro + center thumbnail */}
      <section className="pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="container-wide">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-brand-muted transition hover:text-brand-gold"
          >
            <ArrowLeft size={16} /> All projects
          </Link>

          <div className="mt-8 text-center">
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
        </div>

        {/* Full-width thumbnail */}
        <div className="relative mt-10 h-[55vh] w-full overflow-hidden border-y border-white/10 sm:h-[72vh]">
          <MediaTile
            image={project.image}
            video={project.video}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        <div className="container-wide">
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="leading-relaxed text-brand-muted">
              {project.description}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
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
