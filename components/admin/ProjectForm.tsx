"use client";

import { useState } from "react";
import { saveProjectAction, uploadMediaAction } from "@/app/admin/actions";
import type { Project } from "@/lib/queries";

export default function ProjectForm({ project }: { project?: Project }) {
  const [image, setImage] = useState(project?.image ?? "");
  const [video, setVideo] = useState(project?.video ?? "");
  const [busy, setBusy] = useState<string | null>(null);

  async function upload(file: File, set: (v: string) => void, kind: string) {
    setBusy(kind);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadMediaAction(fd);
    if (res.url) set(res.url);
    else if (res.error) alert(res.error);
    setBusy(null);
  }

  const [clips, setClips] = useState<{ title: string; src: string }[]>(
    project?.clips?.length
      ? project.clips.map((c) => ({ title: c.title, src: c.src }))
      : [{ title: "", src: "" }]
  );
  const updateClip = (i: number, k: "title" | "src", v: string) =>
    setClips((p) => p.map((c, idx) => (idx === i ? { ...c, [k]: v } : c)));
  const addClip = () => setClips((p) => [...p, { title: "", src: "" }]);
  const removeClip = (i: number) =>
    setClips((p) => (p.length > 1 ? p.filter((_, idx) => idx !== i) : p));
  const clipsSerialized = clips
    .filter((c) => c.title.trim() || c.src.trim())
    .map((c) => `${c.title} | ${c.src}`)
    .join("\n");

  const delivText = (project?.deliverables ?? []).join("\n");

  return (
    <form action={saveProjectAction} className="grid max-w-2xl gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Field name="title" label="Title" def={project?.title} required />
      <Field name="slug" label="Slug (url)" def={project?.slug} required />
      <div className="grid grid-cols-2 gap-4">
        <Field name="number" label="Number" def={project?.number} />
        <Field name="year" label="Year" def={project?.year} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field name="client" label="Client" def={project?.client} />
        <Field name="category" label="Category" def={project?.category} />
      </div>
      <Area name="description" label="Description" def={project?.description} />
      <Area
        name="deliverables"
        label="Deliverables (one per line)"
        def={delivText}
      />

      <Media
        label="Thumbnail image"
        name="image"
        value={image}
        setValue={setImage}
        onFile={(f) => upload(f, setImage, "image")}
        busy={busy === "image"}
      />
      <Media
        label="Hero video"
        name="video"
        value={video}
        setValue={setVideo}
        onFile={(f) => upload(f, setVideo, "video")}
        busy={busy === "video"}
      />

      {/* Clips — add a YouTube / Instagram / Facebook link or a local /videos path */}
      <div>
        <span className="mb-1 block text-xs uppercase tracking-widest text-brand-muted">
          Clips
        </span>
        <p className="mb-3 text-xs text-brand-muted">
          Paste a YouTube, Instagram or Facebook link — or a /videos/x.mp4 path.
          Each clip appears in the project&apos;s “Clips” grid.
        </p>
        <div className="space-y-2">
          {clips.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <input
                value={c.title}
                onChange={(e) => updateClip(i, "title", e.target.value)}
                placeholder="Title"
                className="w-36 border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
              />
              <input
                value={c.src}
                onChange={(e) => updateClip(i, "src", e.target.value)}
                placeholder="https://youtu.be/…   or   /videos/clip.mp4"
                className="min-w-0 flex-1 border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeClip(i)}
                aria-label="Remove clip"
                className="px-2 text-red-400 transition hover:text-red-300"
              >
                âœ•
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addClip}
          className="mt-3 inline-flex items-center gap-1 border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-brand-gold hover:text-white"
        >
          + Add clip
        </button>
        <input type="hidden" name="clips" value={clipsSerialized} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">
          Save project
        </button>
        <a href="/admin/projects" className="btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  def,
  required
}: {
  name: string;
  label: string;
  def?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-brand-muted">
        {label}
      </span>
      <input
        name={name}
        defaultValue={def}
        required={required}
        className="w-full border border-white/10 bg-black/40 px-3 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
      />
    </label>
  );
}

function Area({
  name,
  label,
  def,
  rows = 3
}: {
  name: string;
  label: string;
  def?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-brand-muted">
        {label}
      </span>
      <textarea
        name={name}
        defaultValue={def}
        rows={rows}
        className="w-full resize-y border border-white/10 bg-black/40 px-3 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
      />
    </label>
  );
}

function Media({
  name,
  label,
  value,
  setValue,
  onFile,
  busy
}: {
  name: string;
  label: string;
  value: string;
  setValue: (v: string) => void;
  onFile: (f: File) => void;
  busy: boolean;
}) {
  return (
    <div>
      <span className="mb-1 block text-xs uppercase tracking-widest text-brand-muted">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/uploads/... or paste a URL"
          className="min-w-0 flex-1 border border-white/10 bg-black/40 px-3 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
        />
        <label className="cursor-pointer whitespace-nowrap border border-white/15 px-4 py-2.5 text-sm text-white/80 transition hover:border-brand-gold hover:text-white">
          {busy ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </label>
      </div>
      {value && (
        <p className="mt-1 truncate text-xs text-brand-muted">{value}</p>
      )}
    </div>
  );
}
