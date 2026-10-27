import { profile, footerNote } from "../data/data";
import { Reveal } from "../utils/motion";

/** Footer: bordered, with back-to-top button and social links. */
export default function Footer() {
  const year = new Date().getFullYear();

  function backToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <footer className="border-t-[3px] border-ink bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-10">
        <Reveal from="bottom">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-display text-3xl uppercase leading-none md:text-4xl">
                {profile.firstName} <span className="text-hot">{profile.lastName}</span>
              </p>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-sun">{profile.role}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cream/50">{profile.location}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press border-[3px] border-cream bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-cream shadow-[4px_4px_0_0_#ff4d8d] hover:bg-hot hover:text-ink"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press border-[3px] border-cream bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-cream shadow-[4px_4px_0_0_#ffe600] hover:bg-sun hover:text-ink"
              >
                GitHub ↗
              </a>
              <button
                type="button"
                onClick={backToTop}
                aria-label="Back to top"
                className="btn-press flex items-center gap-2 border-[3px] border-cream bg-sun px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink shadow-[4px_4px_0_0_#f4f0e6]"
              >
                ↑ Top
              </button>
            </div>
          </div>

          <div className="mt-10 border-t-2 border-cream/20 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
              © {year} {profile.name} — {footerNote}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
