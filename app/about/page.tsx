import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import BehindTheScene from "@/components/BehindTheScene";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — FPS",
  description:
    "Learn about FPS — a media production house from Agra crafting stories that engage audiences and deliver results."
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About FPS"
        title="A small studio with big creative ambitions."
        subtitle="Built in Agra. Trusted by creators and brands across India. Crafting content that travels — from the first idea to the final frame."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <Reveal><About /></Reveal>
      <Reveal><BehindTheScene /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
