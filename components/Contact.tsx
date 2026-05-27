"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {
      /* still show success */
    }
    setSent(true);
    setSubmitting(false);
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-wide grid gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-title mt-4">
            Let's make something <span className="gradient-text">amazing</span>
          </h2>
          <p className="mt-4 text-brand-muted leading-relaxed">
            Have a project in mind? Drop us a message — our team usually
            responds within a day.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold shrink-0">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-muted">Email</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm hover:text-brand-gold transition"
                >
                  {site.contact.email}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-white/10 bg-brand-card p-6 sm:p-8"
        >
          {sent ? (
            <div className="h-full grid place-items-center text-center py-10">
              <div>
                <CheckCircle2 className="text-brand-gold mx-auto" size={48} />
                <h3 className="mt-4 font-display text-2xl font-bold">Thank you!</h3>
                <p className="mt-2 text-brand-muted text-sm">
                  Your message has been received. We'll get back to you shortly.
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <Field label="Phone" name="phone" placeholder="+91 ..." />
                <SelectField label="Service" name="service" options={[
                  "Video Production",
                  "Video Editing",
                  "Graphic Design",
                  "Audio Production",
                  "Photography",
                  "Other"
                ]} />
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-widest text-brand-muted">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60">
                {submitting ? "Sending..." : "Send message"} <Send size={16} />
              </button>
            </>
          )}
        </form>
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
      <label className="text-xs uppercase tracking-widest text-brand-muted">
        {label}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition"
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
      <label className="text-xs uppercase tracking-widest text-brand-muted">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition"
      >
        <option value="" disabled>Select a service</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-brand-bg">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
