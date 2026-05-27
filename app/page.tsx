import Hero from "@/components/Hero";
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
import {
  getProjects,
  getPortfolio,
  getStats,
  getBts
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const projects = getProjects();
  const portfolio = getPortfolio();
  const stats = getStats();
  const bts = getBts();
  return (
    <>
      <Hero />
      <Showcase portfolio={portfolio} />
      <Reveal><Stats stats={stats} /></Reveal>
      <Reveal><Clients /></Reveal>
      <Reveal><AboutTeaser /></Reveal>
      <WhatWeDeliver />
      <Reveal><CharacterShowcase bts={bts} /></Reveal>
      <ProjectsCarousel projects={projects} />
      <Reveal><PortfolioTeaser /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
