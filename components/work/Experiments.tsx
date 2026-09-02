import { experiments } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Deliberately the quietest block on the page: a dense table, no cards, no
 * hover theatre. The brief asks for breadth without pretending these are
 * major achievements, so they get list weight, not case-study weight.
 */
export function Experiments() {
  return (
    <section className="border-b border-line px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Earlier builds</h2>
          <p className="eyebrow">Archived · kept for what each one taught</p>
        </div>

        <ul className="border-t border-line">
          {experiments.map((experiment) => (
            <Reveal
              key={experiment.name}
              as="li"
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[13rem_1fr_1fr] sm:gap-8 sm:py-7"
            >
              <h3 className="font-mono text-sm text-text">{experiment.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{experiment.what}</p>
              <p className="text-sm leading-relaxed text-dim sm:pl-4">{experiment.learned}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
