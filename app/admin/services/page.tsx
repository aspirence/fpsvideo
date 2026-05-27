import AdminShell from "@/components/admin/AdminShell";
import { getServices, type Service } from "@/lib/queries";
import { saveServiceAction, deleteServiceAction } from "@/app/admin/actions";

const inp =
  "w-full border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

function ServiceForm({ s }: { s?: Service }) {
  return (
    <form action={saveServiceAction} className="grid gap-2 border border-white/10 bg-brand-surface p-4">
      {s && <input type="hidden" name="id" value={s.id} />}
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="title" defaultValue={s?.title} placeholder="Title" className={inp} />
        <input name="slug" defaultValue={s?.slug} placeholder="slug" className={inp} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="tagline" defaultValue={s?.tagline} placeholder="Tagline" className={inp} />
        <input
          name="icon"
          defaultValue={s?.icon ?? "Video"}
          placeholder="Icon: Palette / Video / Mic / Camera / Film"
          className={inp}
        />
      </div>
      <textarea name="description" defaultValue={s?.description} placeholder="Description" rows={2} className={inp} />
      <textarea
        name="features"
        defaultValue={(s?.features ?? []).join("\n")}
        placeholder="Features (one per line)"
        rows={3}
        className={inp}
      />
      <div className="flex items-center gap-3 pt-1">
        <button className="btn-primary">{s ? "Save" : "Add service"}</button>
      </div>
    </form>
  );
}

export default function AdminServices() {
  const services = getServices();
  return (
    <AdminShell title="Services">
      <div className="grid gap-6">
        <div>
          <h2 className="mb-2 text-xs uppercase tracking-widest text-brand-gold">Add new</h2>
          <ServiceForm />
        </div>
        {services.map((s) => (
          <div key={s.id}>
            <ServiceForm s={s} />
            <form action={deleteServiceAction} className="mt-1">
              <input type="hidden" name="id" value={s.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
