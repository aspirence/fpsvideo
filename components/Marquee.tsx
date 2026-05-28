const tags = [
  "Video Production",
  "Graphic Design",
  "Audio Production",
  "Photography",
  "Video Editing",
  "Brand Films",
  "Reels & Shorts",
  "Color Grading",
  "Motion Graphics"
];

export default function Marquee() {
  const row = [...tags, ...tags];
  return (
    <section className="py-10 border-y border-white/5 bg-black/40 overflow-hidden">
      <div className="flex w-max gap-12 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-2xl sm:text-3xl font-bold text-white/40"
          >
            {t} <span className="text-white">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
