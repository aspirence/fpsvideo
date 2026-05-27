import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Showcase from "@/components/Showcase";
import Clients from "@/components/Clients";
import AboutTeaser from "@/components/AboutTeaser";
import ServicesTeaser from "@/components/ServicesTeaser";
import PortfolioTeaser from "@/components/PortfolioTeaser";
import Studio from "@/components/Studio";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Showcase />
      <Reveal><Clients /></Reveal>
      <Reveal><AboutTeaser /></Reveal>
      <Reveal><ServicesTeaser /></Reveal>
      <Reveal><Studio /></Reveal>
      <Reveal><PortfolioTeaser /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}
