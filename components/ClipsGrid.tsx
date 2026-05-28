"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";

type Clip = { title: string; src: string };

export default function ClipsGrid({
  clips,
  poster
}: {
  clips: Clip[];
  poster: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pauseAllExcept = (except: Element | Window | null) => {
      container.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
        if (v !== except) v.pause();
      });
      container.querySelectorAll<HTMLIFrameElement>("iframe").forEach((f) => {
        if (f === except) return;
        if (f.contentWindow === except) return;
        f.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
          "*"
        );
      });
    };

    const onPlay = (e: Event) => {
      const t = e.target as Element;
      if (t.tagName === "VIDEO") pauseAllExcept(t);
    };
    container.addEventListener("play", onPlay, true);

    const registerIframes = () => {
      container.querySelectorAll<HTMLIFrameElement>("iframe").forEach((f) => {
        f.contentWindow?.postMessage(
          JSON.stringify({ event: "listening", id: f.src }),
          "*"
        );
      });
    };
    const t1 = setTimeout(registerIframes, 1500);
    const t2 = setTimeout(registerIframes, 4000);

    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      let data: any;
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data?.info?.playerState === 1) {
        pauseAllExcept(e.source as Window);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      container.removeEventListener("play", onPlay, true);
      window.removeEventListener("message", onMessage);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [clips]);

  return (
    <div
      ref={containerRef}
      className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {clips.map((clip, i) => (
        <Reveal key={`${clip.title}-${i}`}>
          <figure>
            <VideoEmbed src={clip.src} title={clip.title} poster={poster} />
            <figcaption className="mt-3 text-sm font-medium text-white/90">
              {clip.title}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
