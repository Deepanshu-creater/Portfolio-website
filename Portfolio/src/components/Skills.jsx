import { skills } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { Reveal, Stagger, StaggerItem } from "../utils/motion";

const TONES = { sun: "sun", hot: "hot", electric: "electric", ink: "ink" };

/** Skills: grouped chip grids inside loud colored boxes; chips slide in staggered. */
export default function Skills() {
  return (
    <Section id="skills" title="Skills" label="04 // The Toolbox" from="right">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} from={i % 2 === 0 ? "left" : "right"}>
            <Card
              tone={TONES[group.color] ?? "paper"}
              rotate={i % 2 === 0 ? "-rotate-1" : "rotate-1"}
              className="h-full p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-wide md:text-xl">{group.group}</h3>
              <div className="mt-1 h-[3px] w-16 bg-ink" aria-hidden="true" />

              <Stagger className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <StaggerItem key={skill}>
                    <span className="inline-block border-2 border-ink bg-paper px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wide text-ink">
                      {skill}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
