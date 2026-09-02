"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, duration, ease } from "@/lib/motion";
import type { CaseStudy } from "@/content/projects";

const extra = [
  { key: "context", label: "Why it exists" },
  { key: "system", label: "How it works" },
  { key: "result", label: "What actually happened" },
] as const;

/**
 * The depth the page no longer shows by default.
 *
 * A native <details> would animate poorly and a max-height transition guesses
 * at the content size, so this measures the panel and tweens its real height.
 * Under reduced motion the panel simply appears — the content is never gated
 * behind an animation.
 */
export function Dossier({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const panel = panelRef.current;
      if (!panel) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(panel, {
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          duration: duration.section,
          ease: ease.expo,
        });
        return () => tween.kill();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      });

      return () => media.revert();
    },
    { dependencies: [open] },
  );

  return (
    <div className="mt-lg border-t border-border/60 pt-md">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={`dossier-${study.slug}`}
        className="type-label flex items-center gap-2.5 text-secondary transition-colors duration-200 hover:text-on-surface"
      >
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-in-out-soft"
          style={{ transform: open ? "rotate(90deg)" : "none" }}
        >
          →
        </span>
        {open ? "Hide the full write-up" : "Read the full write-up"}
      </button>

      <div
        ref={panelRef}
        id={`dossier-${study.slug}`}
        className="h-0 overflow-hidden opacity-0"
        // Hidden content must not be reachable by keyboard or screen readers
        // while it is collapsed.
        inert={!open}
      >
        <dl className="mt-md grid gap-md md:grid-cols-3">
          {extra.map(({ key, label }) => (
            <div key={key}>
              <dt className="type-label text-on-surface">{label}</dt>
              <dd className="type-body-sm mt-2 text-muted">{study.narrative[key]}</dd>
            </div>
          ))}
        </dl>

        <p className="type-body-sm mt-md rounded-md bg-surface px-4 py-3.5 text-dim lit-edge">
          {study.evidence}
        </p>
      </div>
    </div>
  );
}
