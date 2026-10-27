import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, navLinks } from "../data/data";
import Button from "./ui/Button";
import { SPRING } from "../utils/motion";

/** Sticky bordered navbar. Slides down on load; mobile menu slides open. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduced ? { opacity: 0 } : { y: -90 }}
      animate={reduced ? { opacity: 1 } : { y: 0 }}
      transition={reduced ? { duration: 0.25 } : SPRING}
      className={`sticky top-0 z-50 border-b-[3px] border-ink ${
        scrolled ? "shadow-hard-sm" : ""
      } bg-cream`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-10" aria-label="Main">
        <a
          href="#top"
          className="border-[3px] border-ink bg-ink px-3 py-1.5 font-display text-lg uppercase tracking-tight text-sun shadow-hard-sm"
        >
          DS<span className="text-hot">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block border-[3px] border-transparent px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wide transition-colors hover:border-ink hover:bg-sun"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="#contact" variant="hot" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Hire Me →
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-[3px] border-ink bg-sun shadow-hard-sm lg:hidden"
          >
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0.2 } : SPRING}
            className="overflow-hidden border-t-[3px] border-ink bg-paper lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 md:px-10">
              {navLinks.map((link, i) => (
                <li key={link.href} className={i > 0 ? "border-t-2 border-ink/20" : ""}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-mono text-sm font-bold uppercase tracking-wide hover:bg-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-t-2 border-ink/20 py-3">
                <Button href="#contact" variant="hot" onClick={() => setOpen(false)} className="w-full">
                  Hire Me →
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">{profile.name}</span>
    </motion.header>
  );
}
