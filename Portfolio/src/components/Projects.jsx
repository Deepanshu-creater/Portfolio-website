import { projects } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import Tag from "./ui/Tag";
import Button from "./ui/Button";
import { Reveal } from "../utils/motion";

const TONES = { sun: "sun", hot: "hot", electric: "electric" };

/** Projects: large bordered cards with highlights, tech tags, Live/GitHub links. */
export default function Projects() {
  return (
    <Section id="projects" title="Projects" label="03 // Things I've Shipped" from="left">
      <div className="space-y-12">
        {projects.map((project, i) => (
          <Reveal key={project.name} from={i % 2 === 0 ? "left" : "right"}>
            <Card
              rotate={i % 2 === 0 ? "-rotate-1" : "rotate-1"}
              className="overflow-hidden"
            >
              {/* top color bar + index */}
              <div
                className={`flex items-center justify-between border-b-[3px] border-ink px-5 py-3 ${
                  project.color === "hot" ? "bg-hot" : "bg-sun"
                }`}
              >
                <h3 className="font-display text-2xl uppercase leading-none md:text-3xl">{project.name}</h3>
                <span className="font-display text-2xl opacity-40 md:text-3xl">{project.index}</span>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
                    {project.subtitle}
                  </p>

                  <ul className="mt-4 space-y-3">
                    {project.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          className={`mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-ink ${
                            project.color === "hot" ? "bg-hot" : "bg-sun"
                          }`}
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag} tone={TONES[project.color] ?? "paper"}>
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.live && (
                      <Button href={project.live} variant="electric" target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </Button>
                    )}
                    <Button
                      href={project.github}
                      variant="ink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </Button>
                  </div>
                </div>

                {/* screenshot */}
                <div className="self-start border-[3px] border-ink bg-cream shadow-hard-sm">
                  <img
                    src={project.image}
                    alt={`${project.name} project screenshot`}
                    className="h-48 w-full object-cover md:h-56"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
