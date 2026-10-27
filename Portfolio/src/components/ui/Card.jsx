/**
 * Card: thick black border + hard offset shadow.
 * `rotate` accepts Tailwind rotate classes for the intentional "unpolished" tilt.
 */
export default function Card({ children, className = "", tone = "paper", rotate = "", as: Tag = "div", ...rest }) {
  const tones = {
    paper: "bg-paper",
    cream: "bg-cream",
    sun: "bg-sun",
    hot: "bg-hot",
    electric: "bg-electric text-white",
    violet: "bg-violet text-white",
    ink: "bg-ink text-cream",
  };

  return (
    <Tag className={`border-[3px] border-ink shadow-hard ${tones[tone] ?? tones.paper} ${rotate} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
