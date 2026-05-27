import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Portfolio from "@/components/Portfolio";
import BehindTheScene from "@/components/BehindTheScene";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Portfolio — FPS",
  description:
    "A showcase of recent FPS projects — videos, designs, audio, and photography for creators and brands."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Selected projects from the studio."
        subtitle="Real work from real partnerships. Use the filters below to explore by category."
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80"
      />
      <Reveal><Portfolio /></Reveal>
      <Reveal><BehindTheScene /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
