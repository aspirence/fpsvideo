import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite, getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "FPS - Where Creativity Meets Results",
  description:
    "Full-Service Media Production, Video Editing & Graphic Design — crafting stories that move people.",
  keywords: [
    "FPS",
    "Video Production",
    "Graphic Design",
    "Audio Production",
    "Photography",
    "Video Editing",
    "Production House",
    "Brand Films"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const site = getSite();
  const services = getServices();
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-text">
        <Header />
        <main>{children}</main>
        <Footer site={site} services={services} />
      </body>
    </html>
  );
}
