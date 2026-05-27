"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" }
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // On the homepage keep the bar transparent over the full-screen video hero,
    // and only turn it solid once you scroll past the hero. Other pages switch
    // to solid almost immediately for readability.
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.85 : 20;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-brand-bg/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-16 sm:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            F<span className="gradient-text">PS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(item.href)
                  ? "text-brand-gold"
                  : "text-white/80 hover:text-brand-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary">
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5">
          <div className="container-wide py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 transition ${
                  isActive(item.href)
                    ? "text-brand-gold"
                    : "text-white/90 hover:text-brand-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-3 w-fit">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
