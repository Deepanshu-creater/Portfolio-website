import { education, award } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { Reveal } from "../utils/motion";

/** Education & Awards: two cards + rotated GATE badge sticker. */
export default function Education() {
  return (
    <Section id="education" title="Education" label="05 // Papers & Proof" from="left">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.degree} from={i % 2 === 0 ? "left" : "bottom"}>
              <Card rotate={i % 2 === 0 ? "-rotate-1" : "rotate-1"} className="h-full p-6">
                <span className="border-2 border-ink bg-sun px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest">
                  {entry.year}
                </span>
                <h3 className="mt-3 font-display text-xl uppercase leading-tight md:text-2xl">{entry.degree}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed">{entry.school}</p>
                <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wide opacity-70">{entry.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* GATE badge / sticker */}
        <Reveal from="right" className="flex items-center justify-center">
          <div className="rotate-3 border-[3px] border-ink bg-hot p-6 text-center shadow-hard-lg sm:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest">AWARD</p>
            <p className="mt-2 font-display text-2xl uppercase leading-none text-ink sm:text-3xl">{award.title}</p>
            <p className="mt-1 font-display text-4xl uppercase leading-none text-cream [text-shadow:3px_3px_0_#0a0a0a] sm:text-5xl">
              {award.subtitle}
            </p>
            <p className="mt-3 border-t-[3px] border-ink pt-2 font-mono text-[10px] font-bold uppercase tracking-widest">
              {award.note}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
