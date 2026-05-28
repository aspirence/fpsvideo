"use client";

import { useState } from "react";
import Link from "next/link";
import type { Site } from "@/lib/queries";
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock4,
  Rocket,
  ArrowUpRight
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Tell us your idea",
    body: "Share your brief — concept, timeline, references. Anything that helps us understand the vibe you're going for."
  },
  {
    icon: Clock4,
    title: "2. We reply within 24 hours",
    body: "You'll hear back with a clear plan, scope and quote — usually the same working day."
  },
  {
    icon: Rocket,
    title: "3. Kickoff & craft",
    body: "Once you're in, we lock the schedule and roll into pre-production. From there it's all about the craft."
  }
];

export default function Contact({ site }: { site: Site }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formEl).entries());
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {
      /* still show success */
    }
    formEl.reset();
    setSent(true);
    setSubmitting(false);
  }

  return (
    <section id="contact" className="py-12 sm:py-28">
      <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* LEFT — Form */}
        <div>
          <h2 className="text-4xl font-bold leading-[1.1] sm:text-5xl">
            Start a project
          </h2>
          <p className="mt-4 text-brand-muted leading-relaxed">
            Fill out the form and we'll get back within a day with a clear
            plan, scope and quote.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 border border-white/10 bg-brand-surface p-6 sm:p-8"
          >
            {sent ? (
              <div className="grid place-items-center py-10 text-center">
                <div>
                  <CheckCircle2 className="mx-auto text-white" size={48} />
                  <h3 className="mt-4 text-2xl font-bold">Message received</h3>
                  <p className="mt-2 text-sm text-brand-muted">
                    Thanks for reaching out. We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn-ghost mt-6"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    name="name"
                    placeholder="John Smith"
                    required
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    placeholder="+91 999 999 9999"
                  />
                  <SelectField
                    label="Service"
                    name="service"
                    options={[
                      "Video Production",
                      "Video Editing",
                      "Graphic Design",
                      "Audio Production",
                      "Photography",
                      "Other"
                    ]}
                  />
                </div>
                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
                    Message / Project Brief
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project — goals, references, timeline…"
                    className="mt-2 w-full resize-none border border-white/10 bg-black/40 px-4 py-3 text-sm transition focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-7 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send a Message"}{" "}
                  <Send size={16} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* RIGHT — What's next + studio + direct email */}
        <div>
          <span className="eyebrow">What happens next</span>
          <h2 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">
            Three steps to&nbsp;rolling.
          </h2>

          <ul className="mt-8 space-y-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className="flex gap-4 border border-white/10 bg-brand-surface p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/10 bg-white/[0.04] text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Studio image card */}
          <div className="mt-8 overflow-hidden border border-white/10">
            <div className="relative aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                alt="Inside the FPS studio"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                  Inside the studio
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  See how we craft, frame by frame
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 bg-brand-surface p-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-sm text-white transition hover:text-white/70"
              >
                <Mail size={16} className="shrink-0" /> {site.contact.email}
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white transition hover:text-white/70"
              >
                View our work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
        {label}
        {required && <span className="ml-1 text-white/50">*</span>}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm transition focus:border-brand-gold focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm transition focus:border-brand-gold focus:outline-none"
      >
        <option value="" disabled>
          Select a service
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-brand-bg">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
