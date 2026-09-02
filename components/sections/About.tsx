import { Reveal } from "@/components/motion/Reveal";

/**
 * The one place age is mentioned. It appears once, in a metadata row, stated
 * flatly and after the work — never as the selling point.
 */
const traits = [
  {
    label: "How I learn",
    body: "By building the thing badly first, then reading until I understand why it was bad. Documentation makes sense to me after I have already hit the problem it describes.",
  },
  {
    label: "What I am good at",
    body: "Research speed. Give me an unfamiliar library, a protocol I have not used or an error with no obvious cause, and I will narrow it down faster than most people expect. That is the skill I would actually put forward.",
  },
  {
    label: "What I want next",
    body: "Harder systems and other people’s code. Most of what I have built, I built alone — the next useful step is working somewhere the problems are bigger than my own projects.",
  },
] as const;

export function About() {
  return (
    <section id="about" className="border-b border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">About</p>
            <Reveal>
              <h2 className="display-wide max-w-[16ch] text-[clamp(2rem,5vw,3.75rem)] leading-[0.98]">
                I investigate before I build.
              </h2>
            </Reveal>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 font-mono text-sm">
              <div>
                <dt className="eyebrow mb-2">Based</dt>
                <dd className="text-text">Palestine</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Age</dt>
                <dd className="text-text" data-numeric>
                  16
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Working since</dt>
                <dd className="text-text">Discord bots</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Open to</dt>
                <dd className="text-text">Internships · collaboration</dd>
              </div>
            </dl>
          </div>

          <dl className="space-y-11 lg:pt-16">
            {traits.map((trait) => (
              <Reveal key={trait.label} as="div" className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="eyebrow sm:pt-1.5">{trait.label}</dt>
                <dd className="max-w-[58ch] text-[1.0625rem] leading-[1.7] text-muted">
                  {trait.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
