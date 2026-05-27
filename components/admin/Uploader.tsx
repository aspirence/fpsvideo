"use client";

import { useState } from "react";
import { uploadMediaAction } from "@/app/admin/actions";

export default function Uploader() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", f);
    const res = await uploadMediaAction(fd);
    if (res.url) setUrl(res.url);
    else if (res.error) alert(res.error);
    setBusy(false);
  }

  const isVideo = /\.(mp4|webm|mov)$/i.test(url);

  return (
    <div className="max-w-xl">
      <p className="mb-4 text-sm text-brand-muted">
        Upload an image or video, then copy the path and paste it into any
        media field (project / portfolio / originals).
      </p>
      <label className="inline-flex cursor-pointer items-center border border-white/15 px-5 py-3 text-sm text-white/80 transition hover:border-brand-gold hover:text-brand-gold">
        {busy ? "Uploading…" : "Choose a file"}
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={onChange}
        />
      </label>

      {url && (
        <div className="mt-5">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-brand-gold"
          />
          <div className="mt-3 max-w-sm overflow-hidden border border-white/10">
            {isVideo ? (
              <video src={url} controls muted className="w-full" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="upload preview" className="w-full" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
