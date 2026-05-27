import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getBts, type Bts } from "@/lib/queries";
import { saveBtsAction, deleteBtsAction } from "@/app/admin/actions";

const inp =
  "w-full border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

function BtsForm({ b }: { b?: Bts }) {
  return (
    <form action={saveBtsAction} className="grid gap-2 border border-white/10 bg-brand-surface p-4">
      {b && <input type="hidden" name="id" value={b.id} />}
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="title" defaultValue={b?.title} placeholder="Title (e.g. Song)" className={inp} />
        <input name="label" defaultValue={b?.label} placeholder="Label (e.g. Music Videos)" className={inp} />
      </div>
      <textarea name="description" defaultValue={b?.description} placeholder="Description" rows={2} className={inp} />
      <input name="image" defaultValue={b?.image} placeholder="Image path/URL (use Upload)" className={inp} />
      <input name="video" defaultValue={b?.video ?? ""} placeholder="Video path/URL (optional)" className={inp} />
      <div className="pt-1">
        <button className="btn-primary">{b ? "Save" : "Add original"}</button>
      </div>
    </form>
  );
}

export default function AdminOriginals() {
  const items = getBts();
  return (
    <AdminShell title="FPS Originals">
      <p className="mb-5 text-sm text-brand-muted">
        Upload media on the{" "}
        <Link href="/admin/upload" className="text-brand-gold">
          Upload page
        </Link>{" "}
        and paste the path here.
      </p>
      <div className="grid gap-6">
        <div>
          <h2 className="mb-2 text-xs uppercase tracking-widest text-brand-gold">Add new</h2>
          <BtsForm />
        </div>
        {items.map((b) => (
          <div key={b.id}>
            <BtsForm b={b} />
            <form action={deleteBtsAction} className="mt-1">
              <input type="hidden" name="id" value={b.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
