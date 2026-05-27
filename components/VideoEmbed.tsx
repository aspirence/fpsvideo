/**
 * VideoEmbed — drop any video source and it figures out how to play it.
 *
 * Supported `src` values:
 *   - YouTube:    https://youtu.be/ID  |  https://www.youtube.com/watch?v=ID  |  /shorts/ID  |  /embed/ID
 *   - Instagram:  https://www.instagram.com/reel/CODE/  |  /p/CODE/  |  /tv/CODE/
 *   - Facebook:   https://www.facebook.com/.../videos/...  |  https://fb.watch/CODE/
 *   - Local file: /videos/clip.mp4  (anything ending in .mp4/.webm/.mov)
 *
 * To change a clip, just edit its `src` in data/projects.json — paste a
 * YouTube / Instagram / Facebook link and it embeds automatically.
 */

type Props = {
  src: string;
  title?: string;
  poster?: string;
};

function resolve(src: string): { kind: "iframe" | "video"; url: string } {
  const s = src.trim();

  // YouTube (watch, youtu.be, shorts, embed)
  const yt = s.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return { kind: "iframe", url: `https://www.youtube.com/embed/${yt[1]}` };

  // Instagram (reel / post / tv)
  const ig = s.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/);
  if (ig) return { kind: "iframe", url: `https://www.instagram.com/p/${ig[1]}/embed` };

  // Facebook (full watch URL or fb.watch short link)
  if (/facebook\.com\/.+\/videos\/|fb\.watch\//.test(s)) {
    return {
      kind: "iframe",
      url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        s
      )}&show_text=false`
    };
  }

  // Fallback: treat as a direct/local video file
  return { kind: "video", url: s };
}

export default function VideoEmbed({ src, title, poster }: Props) {
  const { kind, url } = resolve(src);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
      {kind === "iframe" ? (
        <iframe
          src={url}
          title={title ?? "Video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <video
          src={url}
          poster={poster}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title ?? "Video"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
