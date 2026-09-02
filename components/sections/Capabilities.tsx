import { capabilities } from "@/content/profile";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/motion/Reveal";

/**
 * No percentage bars: they encode self-assessment rather than competence, and
 * the brief rejects them. Each group instead carries a line about where the
 * knowledge came from, which is the honest version of a proficiency claim.
 *
 * Laid out as hairline-separated rows rather than a card grid — same-size
 * cards of heading-plus-text are the page structure the craft floor bans.
 */
export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-border/60 px-gutter py-xl sm:px-md">
      <div className="mx-auto max-w-[62rem]">
        <h2 className="type-headline-md text-center text-on-surface">What I work with</h2>
        <p className="type-body-sm mx-auto mt-sm max-w-[42ch] text-center text-dim">
          Grouped by what I actually use it for.
        </p>

        <div className="mt-lg">
          {capabilities.map((group) => (
            <Reveal
              key={group.id}
              className="grid gap-sm border-t border-border/60 py-md lg:grid-cols-[16rem_1fr] lg:gap-lg"
            >
              <div>
                <h3 className="type-label text-primary">{group.title}</h3>
                <p className="type-body-sm mt-1.5 max-w-[34ch] text-dim">{group.note}</p>
              </div>
              <ul className="flex flex-wrap items-start gap-xs">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
