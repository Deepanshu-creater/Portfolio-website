/**
 * Continuously scrolling brutalist marquee strip.
 * Duplicated content for a seamless loop; pauses on hover.
 * aria-hidden since it is decorative (content is repeated).
 */
export default function Marquee({ items, tone = "ink", reverse = false, speed = 28 }) {
  const tones = {
    ink: "bg-ink text-sun",
    sun: "bg-sun text-ink",
    hot: "bg-hot text-ink",
    electric: "bg-electric text-white",
  };

  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 whitespace-nowrap font-display text-lg uppercase md:text-2xl">
          {item}
          <span className="text-xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-wrap overflow-hidden border-y-[3px] border-ink py-3 md:py-4 ${tones[tone] ?? tones.ink}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        aria-hidden="true"
      >
        {row}
        {row}
      </div>
    </div>
  );
}
