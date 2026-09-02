import { distribution } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The 100+ servers fact — the single strongest piece of real evidence on the
 * site, so it gets a focal composition of its own with nothing competing.
 * The copy still refuses to inflate it, and still declines to endorse the
 * filter-evasion technique it used.
 */
export function Distribution() {
  return (
    <section
      id="distribution"
      className="halo relative border-t border-border/60 px-gutter py-xl sm:px-md"
    >
      <span
        aria-hidden
        className="halo-source top-1/2 left-1/2 h-[52vh] w-[85vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
        <StatusBadge status={distribution.status} />

        <Reveal tier="primary">
          <h2 className="type-headline-lg mt-md max-w-[18ch] text-on-surface">
            {distribution.headline}
          </h2>
        </Reveal>

        <Reveal as="p" className="type-body-lg mt-md max-w-[58ch] text-secondary">
          {distribution.lesson}
        </Reveal>

        <Reveal as="p" className="mt-md max-w-[68ch] text-muted">
          {distribution.body}
        </Reveal>

        <p className="type-body-sm mt-lg rounded-md bg-surface px-4 py-3.5 text-dim lit-edge">
          {distribution.evidence}
        </p>
      </div>
    </section>
  );
}
