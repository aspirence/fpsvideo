import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { site, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">
            F<span className="gradient-text">PS</span>
          </Link>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed">
            {site.description}. We craft stories that engage and drive results.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-brand-gold hover:text-black transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-brand-gold hover:text-black transition"
            >
              <Instagram size={16} />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-brand-gold hover:text-black transition"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/services" className="hover:text-brand-gold transition">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            <li><Link href="/about" className="hover:text-brand-gold transition">About Us</Link></li>
            <li><Link href="/portfolio" className="hover:text-brand-gold transition">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold transition">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li className="flex gap-3 items-center">
              <Mail size={16} className="shrink-0 text-brand-gold" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-brand-gold transition">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Crafted with passion in Agra, India.</p>
        </div>
      </div>
    </footer>
  );
}
