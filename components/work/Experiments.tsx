import { experiments } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The archive. Deliberately the quietest block on the page: a hairline-divided
 * list, no cards, no hover theatre. These are kept for what each one taught,
 * not presented as achievements, and the composition says so.
 */
export function Experiments() {
  return (
    <section className="border-t border-border/60 px-gutter py-xl sm:px-md">
      <div className="mx-auto max-w-[52rem]">
        <h2 className="type-headline-md text-center text-on-surface">Earlier builds</h2>
        <p className="type-body-sm mx-auto mt-sm max-w-[46ch] text-center text-dim">
          Archived. Listed for what each one taught, not as achievements.
        </p>

        <ul className="mt-lg">
          {experiments.map((experiment) => (
            <Reveal
              key={experiment.name}
              as="li"
              tier="micro"
              className="grid gap-1.5 border-t border-border/60 py-md md:grid-cols-[13rem_1fr] md:gap-md"
            >
              <h3 className="type-label text-on-surface">{experiment.name}</h3>
              <div>
                <p className="text-muted">{experiment.what}</p>
                <p className="type-body-sm mt-1.5 text-dim">{experiment.learned}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
