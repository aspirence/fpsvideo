import AdminShell from "@/components/admin/AdminShell";
import { getStats, type Stat } from "@/lib/queries";
import { saveStatAction, deleteStatAction } from "@/app/admin/actions";

const inp =
  "w-full border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

function StatForm({ s }: { s?: Stat }) {
  return (
    <form action={saveStatAction} className="flex flex-wrap items-end gap-2 border border-white/10 bg-brand-surface p-3">
      {s && <input type="hidden" name="id" value={s.id} />}
      <label className="w-24">
        <span className="mb-1 block text-[10px] uppercase tracking-widest text-brand-muted">Value</span>
        <input name="value" type="number" defaultValue={s?.value ?? 0} className={inp} />
      </label>
      <label className="w-20">
        <span className="mb-1 block text-[10px] uppercase tracking-widest text-brand-muted">Suffix</span>
        <input name="suffix" defaultValue={s?.suffix} placeholder="+" className={inp} />
      </label>
      <label className="min-w-[10rem] flex-1">
        <span className="mb-1 block text-[10px] uppercase tracking-widest text-brand-muted">Label</span>
        <input name="label" defaultValue={s?.label} placeholder="Videos Created" className={inp} />
      </label>
      <button className="btn-primary">{s ? "Save" : "Add"}</button>
    </form>
  );
}

export default function AdminStats() {
  const stats = getStats();
  return (
    <AdminShell title="Stats">
      <div className="grid max-w-2xl gap-3">
        <StatForm />
        {stats.map((s) => (
          <div key={s.id}>
            <StatForm s={s} />
            <form action={deleteStatAction} className="mt-1">
              <input type="hidden" name="id" value={s.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
