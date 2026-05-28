import Link from "next/link";
import {
  Film,
  Image as ImageIcon,
  Wrench,
  Sparkles,
  Users,
  BarChart3,
  ArrowUpRight,
  Plus,
  Upload
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { countAll } from "@/lib/queries";

export default function AdminDashboard() {
  const c = countAll();

  const cards = [
    { label: "Projects", n: c.projects, href: "/admin/projects", icon: Film },
    { label: "Portfolio", n: c.portfolio, href: "/admin/portfolio", icon: ImageIcon },
    { label: "Services", n: c.services, href: "/admin/services", icon: Wrench },
    { label: "Originals", n: c.bts, href: "/admin/originals", icon: Sparkles },
    { label: "Clients", n: c.clients, href: "/admin/clients", icon: Users },
    { label: "Stats", n: c.stats, href: "/admin/stats", icon: BarChart3 }
  ];

  return (
    <AdminShell title="Dashboard">
      <p className="-mt-4 mb-8 text-sm text-brand-muted">
        Manage everything on your site. All content is stored in SQLite and
        rendered live.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group border border-white/10 bg-brand-surface p-6 transition hover:border-brand-gold/40 hover:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center border border-white/10 bg-brand-gold/10 text-white">
                <card.icon size={20} />
              </span>
              <ArrowUpRight
                size={18}
                className="text-white/25 transition group-hover:text-white"
              />
            </div>
            <div className="mt-5 text-4xl font-bold tabular-nums text-white">
              {card.n}
            </div>
            <div className="mt-1 text-sm text-brand-muted">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-muted">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 border border-white/15 bg-brand-surface px-5 py-3 text-sm font-medium transition hover:border-brand-gold hover:text-white"
          >
            <Plus size={16} /> New project
          </Link>
          <Link
            href="/admin/upload"
            className="inline-flex items-center gap-2 border border-white/15 bg-brand-surface px-5 py-3 text-sm font-medium transition hover:border-brand-gold hover:text-white"
          >
            <Upload size={16} /> Upload media
          </Link>
        </div>
      </div>

      <p className="mt-10 max-w-2xl border-l-2 border-brand-gold/40 pl-4 text-sm text-brand-muted">
        After making changes, run <span className="text-white">git commit &amp; push</span> so
        your database and uploaded media are saved with the repo.
      </p>
    </AdminShell>
  );
}
