import { links, profile } from "@/content/profile";
import { CopyHandle } from "./CopyHandle";

/**
 * No contact form: there is no backend and the brief forbids overbuilding.
 * Discord has no URL for a handle, so it gets a copy control instead of a
 * dead link — the honest affordance for that identifier.
 */
export function Contact() {
  return (
    <section id="contact" className="substrate relative px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <span className="substrate-grain" aria-hidden />

      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-8">Contact</p>

        <h2 className="display-wide max-w-[24ch] text-[clamp(2.25rem,6.5vw,5.25rem)] leading-[0.94]">
          If you are building something harder than this, I want to see it.
        </h2>

        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted">
          Open to internships, freelance work and collaboration. Reaching me on any of these
          works.
        </p>

        <ul className="mt-16 border-t border-line">
          {links.map((link) =>
            link.href ? (
              <li key={link.label} className="border-b border-line">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-baseline justify-between gap-6 py-6 sm:py-7"
                >
                  <span className="flex items-baseline gap-5 sm:gap-8">
                    <span className="eyebrow w-20 shrink-0 sm:w-28">{link.label}</span>
                    <span className="font-display text-xl transition-colors duration-200 group-hover:text-ember sm:text-2xl">
                      {link.handle}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-sm text-dim transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-ember"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ) : (
              <li key={link.label} className="border-b border-line">
                <div className="flex items-baseline gap-5 py-6 sm:gap-8 sm:py-7">
                  <span className="eyebrow w-20 shrink-0 sm:w-28">{link.label}</span>
                  <CopyHandle value={link.handle} label={`${link.label} handle`} />
                </div>
              </li>
            ),
          )}
        </ul>

        <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-8">
          <p className="font-mono text-xs text-dim">{profile.name}</p>
          <p className="font-mono text-xs text-dim">
            Built with Next.js and GSAP. No template underneath.
          </p>
        </footer>
      </div>
    </section>
  );
}
