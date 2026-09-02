import { capabilities } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";

/**
 * No percentage bars — the brief rejects them, and they encode self-assessment
 * rather than competence. Each group carries a short note about *where* the
 * knowledge came from, which is the honest version of a proficiency claim.
 */
export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-[52ch]">
          <p className="eyebrow mb-5">What I work with</p>
          <h2 className="display-wide text-[clamp(1.75rem,4vw,3rem)] leading-[1.05]">
            Grouped by what I actually use it for.
          </h2>
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group) => (
            <Reveal key={group.id} className="bg-ink p-6 sm:p-7">
              <h3 className="mb-1 font-mono text-sm text-ember">{group.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-dim">{group.note}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5 text-[0.9375rem] text-text">
                    <span className="size-1 shrink-0 bg-line-strong" aria-hidden />
                    {item}
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
