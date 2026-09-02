import { infrastructure } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Framed as operations experience, not a gaming résumé. The game names are
 * present because that is truthfully where the work happened, but the headline
 * and detail copy are about supervision, configuration and diagnosis.
 */
export function Infrastructure() {
  return (
    <section id="infrastructure" className="border-t border-border/60 px-gutter py-xl sm:px-md">
      <div className="mx-auto max-w-[52rem]">
        <div className="text-center">
          <Reveal tier="primary">
            <h2 className="type-headline-lg mx-auto max-w-[16ch] text-on-surface">
              {infrastructure.headline}
            </h2>
          </Reveal>
          <Reveal as="p" className="type-body-lg mx-auto mt-md max-w-[58ch] text-secondary">
            {infrastructure.body}
          </Reveal>
        </div>

        <dl className="mt-xl">
          {infrastructure.domains.map((domain) => (
            <Reveal
              key={domain.id}
              as="div"
              tier="micro"
              className="grid gap-1.5 border-t border-border/60 py-md md:grid-cols-[14rem_1fr] md:gap-md"
            >
              <dt className="type-label text-on-surface">{domain.label}</dt>
              <dd className="max-w-[62ch] text-muted">{domain.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
