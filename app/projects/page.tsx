import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectsList from "@/components/ProjectsList";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects — FPS",
  description:
    "Selected case studies from FPS — brand films, music videos, comedy, reels, design and documentary work."
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Projects we're proud of."
        subtitle="A closer look at the work — the brief, the craft and the result. Six pieces across film, music, comedy, social, design and documentary."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        image="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 sm:py-28">
        <ProjectsList projects={projects} />
      </section>

      <Reveal>
        <CTABanner />
      </Reveal>
    </>
  );
}
