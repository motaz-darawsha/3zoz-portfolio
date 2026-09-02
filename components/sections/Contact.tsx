import { links, profile } from "@/content/profile";
import { CopyHandle } from "./CopyHandle";
import { ButtonLink } from "@/components/ui/Button";

/**
 * No contact form: there is no backend, and the brief forbids overbuilding.
 * Discord has no URL for a handle, so that row gets a copy control instead of
 * a dead link — the honest affordance for an identifier you cannot navigate to.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="halo relative border-t border-border/60 px-gutter py-xl sm:px-md"
    >
      <span
        aria-hidden
        className="halo-source bottom-[-18vh] left-1/2 h-[62vh] w-[110vw] max-w-[1200px] -translate-x-1/2"
      />

      <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
        <h2 className="type-display max-w-[18ch] text-on-surface">
          If you are building something harder than this, I want to see it.
        </h2>
        <p className="type-body-lg mt-md max-w-[44ch] text-secondary">
          Open to internships, freelance work and collaboration.
        </p>

        <ul className="mt-lg flex w-full max-w-[30rem] flex-col gap-sm">
          {links.map((link) =>
            link.href ? (
              <li key={link.label}>
                <ButtonLink
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  className="w-full justify-between"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="type-overline text-dim">{link.label}</span>
                    <span className="type-label text-on-surface">{link.handle}</span>
                  </span>
                  <span aria-hidden className="text-dim">
                    ↗
                  </span>
                </ButtonLink>
              </li>
            ) : (
              <li key={link.label}>
                <CopyHandle value={link.handle} label={link.label} />
              </li>
            ),
          )}
        </ul>
      </div>

      <footer className="mx-auto mt-xl flex max-w-[72rem] flex-col items-center gap-2 border-t border-border/60 pt-lg text-center">
        <p className="type-body-sm text-dim">{profile.name}</p>
        <p className="type-body-sm text-dim">Built with Next.js and GSAP.</p>
      </footer>
    </section>
  );
}
