import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { getSite } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact — FPS",
  description: "Get in touch with FPS — a full-service media production house."
};

export const dynamic = "force-dynamic";

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Within a working day. Urgent project? Mention it in your message and we'll prioritize."
  },
  {
    q: "Where do you work from?",
    a: "We travel across India for shoots, and we deliver editing, design and post-production work remotely worldwide."
  },
  {
    q: "Do you offer monthly retainers?",
    a: "Yes. For creators or brands needing consistent content, we set up custom monthly packages."
  },
  {
    q: "What's your typical turnaround?",
    a: "Short-form edits in 3–5 days; full productions vary by scope. We share a clear timeline upfront."
  }
];

export default function ContactPage() {
  const site = getSite();
  return (
    <>
      <PageHeader
        eyebrow="Let's talk"
        title="Tell us about your project."
        subtitle="Whether it's a single edit, a brand campaign or an ongoing content engine — we'd love to hear from you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80"
      />

      <Reveal><Contact site={site} /></Reveal>

      <FAQ faqs={faqs} heading={"Common\nquestions"} />
    </>
  );
}
