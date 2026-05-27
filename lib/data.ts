import servicesJson from "@/data/services.json";
import portfolioJson from "@/data/portfolio.json";
import testimonialsJson from "@/data/testimonials.json";
import statsJson from "@/data/stats.json";
import btsJson from "@/data/bts.json";
import clientsJson from "@/data/clients.json";
import siteJson from "@/data/site.json";

export type Service = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
};

export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type Stat = {
  id: number;
  value: number;
  suffix: string;
  label: string;
};

export type Bts = {
  id: number;
  title: string;
  image: string;
  video?: string;
};

export type Client = {
  id: number;
  name: string;
};

export type Site = {
  name: string;
  tagline: string;
  description: string;
  contact: { address: string; phone: string; email: string };
  social: { facebook: string; instagram: string; youtube: string };
};

export const services = servicesJson as Service[];
export const portfolio = portfolioJson as PortfolioItem[];
export const testimonials = testimonialsJson as Testimonial[];
export const stats = statsJson as Stat[];
export const bts = btsJson as Bts[];
export const clients = clientsJson as Client[];
export const site = siteJson as Site;
