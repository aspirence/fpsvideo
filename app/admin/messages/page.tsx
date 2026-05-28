import AdminShell from "@/components/admin/AdminShell";
import { getMessages } from "@/lib/queries";
import { deleteMessageAction } from "@/app/admin/actions";
import { Mail, Phone, Briefcase, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

export default function AdminMessages() {
  const messages = getMessages();

  return (
    <AdminShell title="Contact Messages">
      <p className="mb-6 text-sm text-brand-muted">
        Submissions from the contact form on{" "}
        <a href="/contact" className="text-white underline" target="_blank">
          /contact
        </a>
        . Newest first.
      </p>

      {messages.length === 0 ? (
        <div className="border border-dashed border-white/15 bg-brand-surface p-10 text-center">
          <p className="text-sm text-brand-muted">
            No messages yet. Submissions will appear here.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className="border border-white/10 bg-brand-surface p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">
                    {m.name || "Unnamed"}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 text-xs text-white/60">
                    <Clock size={12} /> {formatDate(m.received_at)}
                  </p>
                </div>
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="text-xs text-red-400 transition hover:text-red-300">
                    Delete
                  </button>
                </form>
              </div>

              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-2 text-white/85 transition hover:text-white"
                  >
                    <Mail size={14} className="shrink-0" /> {m.email}
                  </a>
                )}
                {m.phone && (
                  <a
                    href={`tel:${m.phone}`}
                    className="inline-flex items-center gap-2 text-white/85 transition hover:text-white"
                  >
                    <Phone size={14} className="shrink-0" /> {m.phone}
                  </a>
                )}
                {m.service && (
                  <span className="inline-flex items-center gap-2 text-white/85">
                    <Briefcase size={14} className="shrink-0" /> {m.service}
                  </span>
                )}
              </div>

              {m.message && (
                <p className="mt-4 whitespace-pre-wrap border-l-2 border-white/15 bg-black/30 p-4 text-sm leading-relaxed text-brand-muted">
                  {m.message}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
