import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getProjects } from "@/lib/queries";
import { deleteProjectAction } from "@/app/admin/actions";

export default function AdminProjects() {
  const projects = getProjects();
  return (
    <AdminShell title="Projects">
      <div className="mb-6">
        <Link href="/admin/projects/new" className="btn-primary">
          + New project
        </Link>
      </div>

      <ul className="divide-y divide-white/10 border-y border-white/10">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 py-4"
          >
            <div>
              <span className="font-semibold text-white">{p.title}</span>
              <span className="ml-2 text-xs text-brand-muted">
                /{p.slug} &middot; {p.category} &middot; {p.clips.length} clips
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/admin/projects/${p.id}`}
                className="font-semibold text-brand-gold"
              >
                Edit
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-red-400 hover:text-red-300">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {projects.length === 0 && (
          <li className="py-6 text-sm text-brand-muted">No projects yet.</li>
        )}
      </ul>
    </AdminShell>
  );
}
