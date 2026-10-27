import { motion, useReducedMotion } from "framer-motion";
import { profile, hero } from "../data/data";
import Button from "./ui/Button";
import FlipCard from "./ui/FlipCard";
import { SPRING } from "../utils/constants";

/* slide-in-then-hold props for load animations */
const line = (i, reduced, from = "left") => ({
  initial: reduced ? { opacity: 0 } : { x: from === "left" ? -120 : 120, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: reduced ? { duration: 0.25, delay: i * 0.05 } : { ...SPRING, delay: 0.1 + i * 0.12 },
});

const rise = (i, reduced) => ({
  initial: reduced ? { opacity: 0 } : { y: 70, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: reduced ? { duration: 0.25, delay: i * 0.05 } : { ...SPRING, delay: 0.55 + i * 0.12 },
});

/**
 * Hero — editorial brutalist layout:
 * 1) tagline + availability strip
 * 2) giant edge-to-edge name
 * 3) three-column band: flip card | summary + CTAs | quick facts
 */
export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="px-5 pb-16 pt-10 md:px-10 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* 1 — strip: role tag left, status sticker right */}
        <motion.div
          {...line(0, reduced)}
          className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink pb-4"
        >
          <span className="inline-block -rotate-1 border-[3px] border-ink bg-sun px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest shadow-hard-sm sm:text-sm">
            {hero.tagline}
          </span>
          <span className="inline-block rotate-1 border-[3px] border-ink bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-cream shadow-hard-sm">
            {hero.statusSticker}
          </span>
        </motion.div>

        {/* 2 — giant name, full width */}
        <h1 className="mt-8 font-display uppercase leading-[0.85] tracking-tight">
          <motion.span {...line(1, reduced)} className="block text-[clamp(2.75rem,12vw,8.5rem)]">
            {profile.firstName}
          </motion.span>
          <motion.span
            {...line(2, reduced, "right")}
            className="block text-right text-hot text-[clamp(2.75rem,12vw,8.5rem)] [text-shadow:6px_6px_0_#0a0a0a]"
          >
            {profile.lastName}
          </motion.span>
        </h1>

        {/* 3 — three-column band */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.95fr_1.15fr_0.9fr] lg:gap-8">
          {/* flip card */}
          <motion.div {...rise(0, reduced)} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <span className="absolute -left-3 -top-5 z-10 -rotate-6 border-[3px] border-ink bg-hot px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide shadow-hard-sm">
              {hero.gateSticker}
            </span>
            <FlipCard
              photo={profile.photo}
              alt={`${profile.name}, ${profile.role}`}
              backTitle={hero.flipBackTitle}
              backStack={hero.flipBackStack}
            />
          </motion.div>

          {/* summary + CTAs */}
          <motion.div {...rise(1, reduced)}>
            <p className="border-l-[3px] border-ink pl-4 text-base font-medium leading-relaxed sm:text-lg">
              {profile.summary}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide">
              <span aria-hidden="true">📍</span> {hero.location}
            </span>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#projects" variant="sun">
                View Projects →
              </Button>
              <Button href={profile.resume} variant="paper" download>
                ↓ Resume
              </Button>
              <Button href="#contact" variant="electric">
                Contact
              </Button>
            </div>
          </motion.div>

          {/* quick facts panel */}
          <motion.div {...rise(2, reduced)}>
            <div className="rotate-1 border-[3px] border-ink bg-paper p-5 shadow-hard">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest">QUICK FACTS</p>
              <div className="mt-3 h-[3px] w-14 bg-hot" aria-hidden="true" />
              <dl className="mt-3 divide-y-2 divide-ink/10">
                {hero.quickFacts.map((fact) => (
                  <div key={fact.k} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">{fact.k}</dt>
                    <dd className="text-right font-mono text-sm font-bold uppercase">{fact.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press border-[3px] border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide shadow-hard-sm"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press border-[3px] border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide shadow-hard-sm"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
