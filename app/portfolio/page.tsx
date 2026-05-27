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
      />
      <Reveal><Portfolio /></Reveal>
      <Reveal><BehindTheScene /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
