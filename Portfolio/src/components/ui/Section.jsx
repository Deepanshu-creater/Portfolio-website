import { Reveal } from "../../utils/motion";

/**
 * Standard section shell: uppercase display title with an accent block,
 * generous padding, slides up into view on scroll.
 */
export default function Section({ id, title, label, children, className = "", from = "bottom" }) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-16 md:px-10 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">
        <Reveal from={from} className="mb-10 md:mb-14">
          <div className="flex flex-wrap items-end gap-4">
            <h2 className="font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h2>
            <span className="mb-1.5 border-[3px] border-ink bg-sun px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest shadow-hard-sm">
              {label}
            </span>
          </div>
          <div className="mt-4 h-[3px] w-full bg-ink" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
