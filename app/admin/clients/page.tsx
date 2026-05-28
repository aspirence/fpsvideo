import AdminShell from "@/components/admin/AdminShell";
import { getClients } from "@/lib/queries";
import { saveClientAction, deleteClientAction } from "@/app/admin/actions";

const inp =
  "flex-1 border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

export default function AdminClients() {
  const clients = getClients();
  return (
    <AdminShell title="Clients">
      <div className="max-w-xl space-y-3">
        <form action={saveClientAction} className="flex gap-2">
          <input name="name" placeholder="New client name" className={inp} />
          <button className="btn-primary whitespace-nowrap">Add</button>
        </form>

        {clients.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <form action={saveClientAction} className="flex flex-1 gap-2">
              <input type="hidden" name="id" value={c.id} />
              <input name="name" defaultValue={c.name} className={inp} />
              <button className="border border-white/15 px-4 text-sm hover:border-brand-gold hover:text-white">
                Save
              </button>
            </form>
            <form action={deleteClientAction}>
              <input type="hidden" name="id" value={c.id} />
              <button className="px-2 text-sm text-red-400 hover:text-red-300">âœ•</button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
