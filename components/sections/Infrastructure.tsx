import { infrastructure } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Framed as operations experience, not a gaming résumé: the game names are
 * present because that is the truth of where the work happened, but the
 * headline and detail copy are about process supervision and config.
 */
export function Infrastructure() {
  return (
    <section className="substrate relative border-b border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <span className="substrate-grain" aria-hidden />

      <div className="mx-auto max-w-[1400px] grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mb-6">Infrastructure</p>
          <Reveal>
            <h2 className="display-wide max-w-[18ch] text-[clamp(2rem,5vw,3.75rem)] leading-[0.98]">
              {infrastructure.headline}
            </h2>
          </Reveal>
          <Reveal as="p" className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-muted">
            {infrastructure.body}
          </Reveal>
        </div>

        <dl className="border-t border-line">
          {infrastructure.domains.map((domain) => (
            <Reveal
              key={domain.id}
              as="div"
              className="grid gap-2 border-b border-line py-7 sm:grid-cols-[14rem_1fr] sm:gap-8"
            >
              <dt className="font-mono text-sm text-text">{domain.label}</dt>
              <dd className="max-w-[52ch] text-[0.9375rem] leading-[1.7] text-muted">
                {domain.detail}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
