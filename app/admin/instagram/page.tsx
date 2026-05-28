import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getInstagram, type Instagram } from "@/lib/queries";
import {
  saveInstagramAction,
  deleteInstagramAction
} from "@/app/admin/actions";

const inp =
  "w-full border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none";

function PostForm({ p }: { p?: Instagram }) {
  return (
    <form
      action={saveInstagramAction}
      className="grid gap-3 border border-white/10 bg-brand-surface p-4"
    >
      {p && <input type="hidden" name="id" value={p.id} />}
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
        {p?.image ? (
          <div className="relative aspect-square overflow-hidden border border-white/10 bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.alt || "Instagram thumbnail"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="grid aspect-square place-items-center border border-dashed border-white/15 bg-black/30 text-xs text-white/40">
            No image
          </div>
        )}

        <div className="grid gap-2">
          <input
            name="url"
            defaultValue={p?.url}
            placeholder="Instagram reel URL (https://www.instagram.com/reel/...)"
            className={inp}
          />
          <input
            name="image"
            defaultValue={p?.image}
            placeholder="Thumbnail image path/URL (use Upload page)"
            className={inp}
          />
          <input
            name="alt"
            defaultValue={p?.alt}
            placeholder="Caption / alt text (e.g. Brand film shoot)"
            className={inp}
          />
          <div className="flex items-center gap-3 pt-1">
            <button className="btn-primary">{p ? "Save" : "Add post"}</button>
            {p && (
              <form action={deleteInstagramAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-xs text-red-400 hover:text-red-300">
                  Delete
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default function AdminInstagram() {
  const items = getInstagram();
  return (
    <AdminShell title="Instagram Feed">
      <p className="mb-5 text-sm text-brand-muted">
        These 9 thumbnails appear on the homepage &quot;Latest from
        Instagram&quot; section. Paste a reel URL and a thumbnail image (use the{" "}
        <Link href="/admin/upload" className="text-white">
          Upload page
        </Link>{" "}
        to host the screenshot, then paste the returned path here).
      </p>

      <div className="grid gap-6">
        <div>
          <h2 className="mb-2 text-xs uppercase tracking-widest text-white">
            Add new
          </h2>
          <PostForm />
        </div>

        {items.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs uppercase tracking-widest text-white">
              {items.length} post{items.length === 1 ? "" : "s"}
            </h2>
            <div className="grid gap-4">
              {items.map((p) => (
                <PostForm key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
