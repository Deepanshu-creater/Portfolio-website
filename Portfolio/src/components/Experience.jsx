import { experience, experienceStats, experienceStack, experienceSticker } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { Reveal } from "../utils/motion";

/**
 * Experience: left-aligned timeline card + sticky right sidebar
 * (by-the-numbers stats, stack chips, sticker) so the screen stays balanced.
 */
export default function Experience() {
  return (
    <Section id="experience" title="Experience" label="02 // Where I've Built" from="right">
      <div className="grid items-start gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        {/* LEFT — timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[3px] bg-ink" aria-hidden="true" />

          {experience.map((job, i) => (
            <div key={job.company} className="relative pb-10 last:pb-0">
              <span
                className="absolute left-4 top-6 z-10 h-5 w-5 -translate-x-1/2 border-[3px] border-ink bg-sun"
                aria-hidden="true"
              />

              <Reveal from="left" className="pl-12">
                <Card rotate={i % 2 === 0 ? "-rotate-1" : "rotate-1"} className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border-2 border-ink bg-hot px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
                      {job.period}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wide opacity-70">
                      {job.location}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight md:text-3xl">{job.role}</h3>
                  <p className="mt-1 inline-block bg-ink px-2 py-0.5 font-mono text-sm font-bold uppercase tracking-wide text-sun">
                    {job.company}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-ink bg-sun" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          ))}
        </div>

        {/* RIGHT — sticky sidebar */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <Reveal from="right">
            <Card tone="ink" rotate="rotate-1" className="p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-sun">
                BY THE NUMBERS
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-6">
                {experienceStats.map((stat, i) => (
                  <div key={stat.label}>
                    <p className={`font-display text-4xl leading-none ${i % 2 ? "text-hot" : "text-sun"}`}>
                      {stat.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cream/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal from="right" delay={0.1}>
            <Card tone="sun" rotate="-rotate-1" className="p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest">STACK ON THIS JOB</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {experienceStack.map((tech) => (
                  <span
                    key={tech}
                    className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal from="right" delay={0.2} className="flex justify-center lg:justify-end">
            <span className="inline-block -rotate-2 border-[3px] border-ink bg-electric px-4 py-2 font-display text-lg uppercase text-white shadow-hard">
              {experienceSticker}
            </span>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
