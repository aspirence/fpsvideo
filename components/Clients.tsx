import { getClients } from "@/lib/queries";

export default function Clients() {
  const clients = getClients();
  if (!clients.length) return null;
  return (
    <section className="py-16 sm:py-20 border-y border-white/5 bg-black/50">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Creators &amp; brands we've <span className="gradient-text">worked with</span>
            </h2>
          </div>
          <p className="text-sm text-brand-muted max-w-sm">
            From independent creators with millions of subscribers to growing
            regional brands — we ship work people remember.
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {clients.map((c) => (
            <li
              key={c.id}
              className="bg-brand-bg group grid place-items-center h-24 sm:h-28 transition hover:bg-brand-card"
            >
              <span className="font-display text-lg sm:text-xl font-semibold text-white/40 group-hover:text-white transition tracking-tight">
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
