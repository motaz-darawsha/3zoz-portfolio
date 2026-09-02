import { distribution } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The 100+ servers fact is the strongest piece of evidence on the site, so it
 * gets its own full-bleed moment — but the copy is careful not to inflate it
 * or celebrate the filter-evasion technique.
 */
export function Distribution() {
  return (
    <section className="substrate relative border-b border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <span className="substrate-grain" aria-hidden />

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow" data-numeric>
            {distribution.index}
          </span>
          <span className="h-px w-12 bg-line" aria-hidden />
          <StatusBadge status={distribution.status} />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <Reveal>
            <h2 className="display-wide max-w-[20ch] text-[clamp(2rem,5.5vw,4rem)] leading-[0.98]">
              {distribution.headline}
            </h2>
          </Reveal>

          <div className="space-y-8 lg:pt-3">
            <Reveal as="p" className="max-w-[58ch] text-[1.0625rem] leading-[1.7] text-muted">
              {distribution.body}
            </Reveal>
            <Reveal as="p" className="max-w-[58ch] text-[1.0625rem] leading-[1.7] text-text">
              {distribution.lesson}
            </Reveal>
            <p className="border-l-2 border-ember-dim pl-5 font-mono text-sm leading-relaxed text-dim">
              {distribution.evidence}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
