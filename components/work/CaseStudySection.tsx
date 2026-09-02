import type { CaseStudy } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";
import { SystemDiagram } from "./SystemDiagram";
import { Reveal } from "@/components/motion/Reveal";

const beats = [
  { key: "context", label: "Context" },
  { key: "system", label: "System" },
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "result", label: "Result" },
] as const;

/**
 * Case study as an asymmetric editorial spread: the narrative runs in a single
 * measured column, the architecture sticks alongside it on wide screens so the
 * diagram stays in view while the reader moves through the beats.
 */
export function CaseStudySection({ study }: { study: CaseStudy }) {
  return (
    <article className="border-b border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="eyebrow" data-numeric>
                {study.index}
              </span>
              <span className="h-px w-12 bg-line" aria-hidden />
              <StatusBadge status={study.status} />
            </div>
            <Reveal>
              <h2 className="display-wide text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
                {study.name}
              </h2>
              <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-muted">
                {study.kicker}
              </p>
            </Reveal>
          </div>

          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {study.stack.map((item) => (
              <li
                key={item}
                className="border border-line px-3 py-1.5 font-mono text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </header>

        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(340px,26rem)] lg:gap-20">
          <div>
            <dl className="space-y-12">
              {beats.map(({ key, label }) => (
                <Reveal key={key} as="div" className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <dt className="eyebrow sm:pt-1.5">{label}</dt>
                  <dd className="max-w-[62ch] text-[1.0625rem] leading-[1.7] text-muted">
                    {study.narrative[key]}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <p className="mt-14 border-l-2 border-ember-dim pl-5 font-mono text-sm leading-relaxed text-dim">
              {study.evidence}
            </p>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <SystemDiagram diagram={study.diagram} />
          </div>
        </div>
      </div>
    </article>
  );
}
