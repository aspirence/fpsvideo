import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FPS - Where Creativity Meets Results",
  description:
    "Full-Service Media Production, Video Editing & Graphic Design house based in Agra, India.",
  keywords: [
    "FPS",
    "Video Production",
    "Graphic Design",
    "Audio Production",
    "Photography",
    "Video Editing",
    "Agra"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-text">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
