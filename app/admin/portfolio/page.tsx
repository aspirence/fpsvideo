import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getPortfolio, type PortfolioItem } from "@/lib/queries";
import { savePortfolioAction, deletePortfolioAction } from "@/app/admin/actions";

const inp =
  "w-full border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

function PFForm({ p }: { p?: PortfolioItem }) {
  return (
    <form action={savePortfolioAction} className="grid gap-2 border border-white/10 bg-brand-surface p-4">
      {p && <input type="hidden" name="id" value={p.id} />}
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="title" defaultValue={p?.title} placeholder="Title" className={inp} />
        <input name="category" defaultValue={p?.category} placeholder="Category" className={inp} />
      </div>
      <input name="image" defaultValue={p?.image} placeholder="Image path/URL (use Upload)" className={inp} />
      <input name="video" defaultValue={p?.video ?? ""} placeholder="Video path/URL (optional)" className={inp} />
      <div className="pt-1">
        <button className="btn-primary">{p ? "Save" : "Add item"}</button>
      </div>
    </form>
  );
}

export default function AdminPortfolio() {
  const items = getPortfolio();
  return (
    <AdminShell title="Portfolio">
      <p className="mb-5 text-sm text-brand-muted">
        Tip: upload media on the{" "}
        <Link href="/admin/upload" className="text-brand-gold">
          Upload page
        </Link>{" "}
        and paste the path here.
      </p>
      <div className="grid gap-6">
        <div>
          <h2 className="mb-2 text-xs uppercase tracking-widest text-brand-gold">Add new</h2>
          <PFForm />
        </div>
        {items.map((p) => (
          <div key={p.id}>
            <PFForm p={p} />
            <form action={deletePortfolioAction} className="mt-1">
              <input type="hidden" name="id" value={p.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
