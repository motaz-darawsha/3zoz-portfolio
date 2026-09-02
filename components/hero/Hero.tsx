import { profile } from "@/content/profile";
import { Probe } from "./Probe";
import { HeadlineReveal } from "./HeadlineReveal";

/**
 * The schematic layer sits directly behind the display headline and fills the
 * same box, so probing anywhere over the sentence reveals the mechanism that
 * produced it: the same words as a wireframe, on a measured grid.
 */
function Schematic() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex h-full flex-col justify-center gap-4">
        <p className="eyebrow text-ember">Under the surface</p>
        <p className="font-mono text-[clamp(0.9375rem,2.2vw,1.75rem)] leading-[1.6] text-text">
          <span className="text-ember">while</span> (curious) {"{"}
          <br />
          <span className="pl-[2ch] text-muted">build(thing);</span>
          <br />
          <span className="pl-[2ch] text-muted">read(errors);</span>
          <br />
          <span className="pl-[2ch] text-muted">change(one_variable);</span>
          <br />
          {"}"}
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="substrate relative border-b border-line px-6 pt-32 pb-20 sm:px-10 sm:pt-40 sm:pb-28 lg:px-16">
      <span className="substrate-grain" aria-hidden />

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="eyebrow">{profile.origin} · Developer</p>
          <span className="hidden h-px w-16 bg-line sm:block" aria-hidden />
          <p className="eyebrow">Bots · Infrastructure · Integrations</p>
        </div>

        <Probe schematic={<Schematic />}>
          <h1 className="display-wide max-w-[22ch] text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.035em]">
            <HeadlineReveal />
          </h1>
        </Probe>

        {/* Real evidence stays permanently visible — never gated behind the probe. */}
        <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8 font-mono text-sm">
          <div>
            <dt className="eyebrow mb-2">Built</dt>
            <dd data-numeric className="text-text">
              6 projects
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Deployed</dt>
            <dd data-numeric className="text-text">
              100+ servers
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Still running</dt>
            <dd data-numeric className="text-text">
              1
            </dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl">
            {profile.summary}
          </p>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <a
              href="#work"
              className="group inline-flex items-baseline gap-3 font-mono text-sm text-text transition-colors duration-200 hover:text-ember"
            >
              <span className="border-b border-line pb-1 transition-colors duration-200 group-hover:border-ember">
                Read the case studies
              </span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <p className="eyebrow lg:text-right">Two working · one paused · three archived</p>
          </div>
        </div>
      </div>
    </section>
  );
}
