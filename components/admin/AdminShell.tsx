"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Image as ImageIcon,
  Wrench,
  Sparkles,
  Users,
  BarChart3,
  Upload,
  Instagram,
  ExternalLink,
  LogOut
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Film },
  { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Originals", href: "/admin/originals", icon: Sparkles },
  { label: "Instagram", href: "/admin/instagram", icon: Instagram },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Stats", href: "/admin/stats", icon: BarChart3 },
  { label: "Upload", href: "/admin/upload", icon: Upload }
];

export default function AdminShell({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-brand-surface/70 backdrop-blur lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="font-display text-lg font-extrabold tracking-tight">
            FPS <span className="text-white">Admin</span>
          </span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-gold/15 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <n.icon size={18} className="shrink-0" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 transition hover:text-white"
          >
            <ExternalLink size={18} /> View site
          </Link>
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white/70 transition hover:text-red-300">
              <LogOut size={18} /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="no-scrollbar sticky top-0 z-40 flex items-center gap-4 overflow-x-auto border-b border-white/10 bg-brand-surface/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="mr-1 font-display font-extrabold">
          FPS<span className="text-white">Â·</span>
        </span>
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`whitespace-nowrap text-sm ${
              isActive(n.href) ? "text-white" : "text-white/70"
            }`}
          >
            {n.label}
          </Link>
        ))}
        <form action={logoutAction}>
          <button className="whitespace-nowrap text-sm text-white/50">Logout</button>
        </form>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}
