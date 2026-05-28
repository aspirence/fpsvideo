import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import Studio from "@/components/Studio";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services — FPS",
  description:
    "Video Production, Video Editing, Graphic Design, Audio Production and Photography services from FPS."
};

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we offer"
        title="Services built around your story."
        subtitle="From concept and pre-production to shoot, edit, sound and final delivery — everything you need under one roof."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1920&q=80"
      />
      <Reveal><Services /></Reveal>
      <Reveal><Studio /></Reveal>
      <Reveal><CTABanner ctaLabel="Get a quote" /></Reveal>
    </>
  );
}
