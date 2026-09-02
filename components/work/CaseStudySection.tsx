import type { CaseStudy } from "@/content/projects";
import { Chip } from "@/components/ui/Chip";
import { Body } from "@/components/sky/Body";
import { StatusBadge } from "./StatusBadge";
import { SystemDiagram } from "./SystemDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Dossier } from "./Dossier";

/**
 * A case study.
 *
 * The page previously showed five prose beats per project, which made it read
 * as an essay before it read as work. Now only the two beats that actually
 * prove capability — what was hard, and what he did about it — are visible by
 * default; the rest live in a dossier the reader opens if they want depth.
 * Skimmers get the proof, and people who want the detail can still reach it.
 */
export function CaseStudySection({ study }: { study: CaseStudy }) {
  return (
    <article className="border-t border-border/60 px-gutter py-xl sm:px-md">
      <div className="mx-auto max-w-[72rem]">
        <div className="grid items-center gap-lg lg:grid-cols-[1fr_1fr] lg:gap-xl">
          <div className="order-2 lg:order-1">
            <StatusBadge status={study.status} />

            <Reveal>
              <h2 className="type-headline-lg mt-sm text-on-surface">{study.name}</h2>
              <p className="type-body-lg mt-sm max-w-[38ch] text-secondary">{study.kicker}</p>
            </Reveal>

            <ul className="mt-md flex flex-wrap gap-xs">
              {study.stack.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </div>

          {/* The project's own body: the visual, and it moves when the system
              genuinely runs. */}
          <div className="order-1 mx-auto w-full max-w-[22rem] lg:order-2">
            <Body
              seed={study.slug}
              status={study.status}
              satellites={study.diagram.nodes.length}
              label={study.name}
            />
          </div>
        </div>

        <div className="mt-lg grid gap-lg md:grid-cols-2">
          <Reveal tier="primary">
            <h3 className="type-headline-sm text-on-surface">What was hard</h3>
            <p className="mt-sm max-w-[58ch] text-muted">{study.narrative.challenge}</p>
          </Reveal>
          <Reveal tier="primary">
            <h3 className="type-headline-sm text-on-surface">What I did</h3>
            <p className="mt-sm max-w-[58ch] text-muted">{study.narrative.solution}</p>
          </Reveal>
        </div>

        <Dossier study={study} />
      </div>

      <SystemDiagram diagram={study.diagram} />
    </article>
  );
}
