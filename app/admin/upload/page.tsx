import fs from "fs";
import path from "path";
import AdminShell from "@/components/admin/AdminShell";
import Uploader from "@/components/admin/Uploader";
import { deleteUploadAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function listUploads(): string[] {
  const dir = path.join(process.cwd(), "public", "uploads");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

export default function AdminUploadPage() {
  const files = listUploads();

  return (
    <AdminShell title="Upload media">
      <Uploader />

      <div className="mt-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted">
          Uploaded files ({files.length})
        </h2>

        {files.length === 0 ? (
          <p className="text-sm text-brand-muted">No uploads yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((f) => {
              const url = `/uploads/${f}`;
              const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(f);
              return (
                <div key={f} className="border border-white/10 bg-brand-surface">
                  <div className="aspect-video overflow-hidden bg-black">
                    {isVideo ? (
                      <video
                        src={url}
                        controls
                        preload="metadata"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={f} className="h-full w-full object-contain" />
                    )}
                  </div>
                  <div className="p-3">
                    <input
                      readOnly
                      value={url}
                      className="w-full border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-brand-gold"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted">
                        {isVideo ? "Video" : "Image"}
                      </span>
                      <form action={deleteUploadAction}>
                        <input type="hidden" name="name" value={f} />
                        <button className="text-xs text-red-400 transition hover:text-red-300">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 max-w-2xl text-xs text-brand-muted">
          Note: if a file is being used by a project/portfolio/originals item,
          deleting it will leave that media blank — update or remove the
          reference too.
        </p>
      </div>
    </AdminShell>
  );
}
