import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import AboutTeaser from "@/components/AboutTeaser";
import WhatWeDeliver from "@/components/WhatWeDeliver";
import CharacterShowcase from "@/components/CharacterShowcase";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import PortfolioTeaser from "@/components/PortfolioTeaser";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Showcase />
      <Reveal><Stats /></Reveal>
      <Reveal><Clients /></Reveal>
      <Reveal><AboutTeaser /></Reveal>
      <WhatWeDeliver />
      <Reveal><CharacterShowcase /></Reveal>
      <ProjectsCarousel />
      <Reveal><PortfolioTeaser /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
