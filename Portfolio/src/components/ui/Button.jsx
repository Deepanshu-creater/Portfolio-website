const VARIANTS = {
  sun: "bg-sun text-ink",
  hot: "bg-hot text-ink",
  electric: "bg-electric text-white",
  violet: "bg-violet text-white",
  ink: "bg-ink text-cream",
  paper: "bg-paper text-ink",
};

/**
 * Brutalist button. Renders <a> when `href` is given, else <button>.
 * Physically presses in on hover/active (CSS .btn-press).
 */
export default function Button({
  children,
  href,
  variant = "sun",
  className = "",
  download,
  ...rest
}) {
  const cls = `btn-press inline-flex items-center justify-center gap-2 border-[3px] border-ink px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide shadow-hard ${VARIANTS[variant] ?? VARIANTS.sun} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} download={download} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
