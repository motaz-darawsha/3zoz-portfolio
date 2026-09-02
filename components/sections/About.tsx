import { Reveal } from "@/components/motion/Reveal";

/**
 * Age appears exactly once here, in a data row, after the work — never as the
 * selling point and never framed as a "teen portfolio".
 */
const traits = [
  {
    label: "How I learn",
    body: "By building the thing badly first, then reading until I understand why it was bad. Documentation makes sense to me after I have already hit the problem it describes.",
  },
  {
    label: "What I am good at",
    body: "Research speed. Give me an unfamiliar library, a protocol I have not used, or an error with no obvious cause, and I will narrow it down faster than most people expect. That is the skill I would actually put forward.",
  },
  {
    label: "What I want next",
    body: "Harder systems and other people's code. Most of what I have built, I built alone — the next useful step is working somewhere the problems are bigger than my own projects.",
  },
] as const;

const facts = [
  ["Based", "Palestine"],
  ["Age", "16"],
  ["Open to", "Internships, collaboration"],
] as const;

export function About() {
  return (
    <section id="about" className="border-t border-border/60 px-gutter py-xl sm:px-md">
      <div className="mx-auto max-w-[52rem]">
        <Reveal tier="primary">
          <h2 className="type-headline-lg mx-auto max-w-[18ch] text-center text-on-surface">
            I investigate before I build.
          </h2>
        </Reveal>

        <div className="mt-xl space-y-lg">
          {traits.map((trait) => (
            <Reveal key={trait.label} as="section">
              <h3 className="type-headline-sm text-on-surface">{trait.label}</h3>
              <p className="mt-sm max-w-[70ch] text-muted">{trait.body}</p>
            </Reveal>
          ))}
        </div>

        <dl className="mt-xl flex flex-wrap justify-center gap-x-lg gap-y-md border-t border-border/60 pt-lg text-center">
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt className="type-overline text-dim">{term}</dt>
              <dd className="type-label mt-1.5 text-on-surface" data-numeric={term === "Age" ? "" : undefined}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
