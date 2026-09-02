import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { HeroHeadline } from "./HeroHeadline";
import { Instrument } from "./Instrument";

/**
 * The hero.
 *
 * The brief's composition rule is a single dominant focal point on a wide,
 * spacious canvas with a backlit halo as the depth cue — so the headline is
 * centred and the halo sits behind it, exactly as specified. What is ours is
 * the subject: the instrument below the fold line reads the field, which is
 * how a portfolio with no imagery still opens on something to look at.
 */
export function Hero() {
  return (
    <section className="halo relative px-gutter pt-[clamp(6rem,14vh,9rem)] pb-xl sm:px-md">
      {/* The backlit halo. Sized in viewport units so it scales with the
          headline instead of stranding it on large screens. */}
      <span
        aria-hidden
        className="halo-source top-[-14vh] left-1/2 h-[86vh] w-[130vw] max-w-[1600px] -translate-x-1/2 sm:h-[76vh] sm:w-[92vw]"
      />

      <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
        <h1 className="type-display max-w-[19ch] text-balance text-on-surface">
          <HeroHeadline />
        </h1>

        <p className="type-body-lg mt-md max-w-[46ch] text-secondary">{profile.summary}</p>

        <div className="mt-lg flex flex-wrap items-center justify-center gap-sm">
          <ButtonLink href="#work">See the work</ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>

      <Instrument />
    </section>
  );
}
