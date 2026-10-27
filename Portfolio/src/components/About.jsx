import { about } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { Reveal, Stagger, StaggerItem } from "../utils/motion";

const TONES = { sun: "sun", hot: "hot", electric: "electric" };
const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2"];

/** About: summary paragraphs + CGPA / GATE / production-apps stat blocks. */
export default function About() {
  return (
    <Section id="about" title="About" label="01 // Who I Am" from="left">
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal from="left">
          <Card className="h-full p-6 md:p-8">
            {about.paragraphs.map((para, i) => (
              <p key={i} className={`text-base leading-relaxed sm:text-lg ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </p>
            ))}
            <p className="mt-6 inline-block border-[3px] border-ink bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-sun">
              Ship fast · Break nothing · Sleep sometimes
            </p>
          </Card>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {about.stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <Card
                tone={TONES[stat.color] ?? "sun"}
                rotate={ROTATIONS[i % ROTATIONS.length]}
                className="flex h-full flex-col justify-between p-5"
              >
                <p className="font-display text-4xl uppercase leading-none md:text-5xl">{stat.value}</p>
                <div className="mt-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-70">{stat.note}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
