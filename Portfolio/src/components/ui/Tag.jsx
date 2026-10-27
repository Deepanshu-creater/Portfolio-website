/** Small bordered tech-tag chip. */
export default function Tag({ children, tone = "paper", className = "" }) {
  const tones = {
    paper: "bg-paper text-ink",
    sun: "bg-sun text-ink",
    hot: "bg-hot text-ink",
    electric: "bg-electric text-white",
    violet: "bg-violet text-white",
    ink: "bg-ink text-cream",
  };

  return (
    <span
      className={`inline-block border-2 border-ink px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wide ${tones[tone] ?? tones.paper} ${className}`}
    >
      {children}
    </span>
  );
}
