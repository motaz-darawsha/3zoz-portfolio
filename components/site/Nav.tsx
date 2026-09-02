"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";

const sections = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Stack" },
  { id: "about", label: "About" },
] as const;

/**
 * Understated navigation in the brief's own terms: secondary blue links, no
 * loud accent, minimal chrome.
 *
 * Section tracking uses IntersectionObserver rather than a scroll handler, so
 * nothing reads layout per frame. Below `md` the links would crowd, so the nav
 * becomes a section readout plus the single action worth having on a phone —
 * responsive art direction rather than a shrunken desktop bar.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [lifted, setLifted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const activeLabel = sections.find((section) => section.id === active)?.label;

  return (
    <>
      {/* Normal-flow sentinel: once it scrolls out, the fixed bar needs its own
          ground to stay legible over content. */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      <a
        href="#work"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-pill focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:type-label focus-visible:text-neutral"
      >
        Skip to work
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-in-out-soft ${
          lifted
            ? "border-b border-border/60 bg-neutral/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[80rem] items-center justify-between gap-md px-gutter py-3.5 sm:px-md"
        >
          <a
            href="#top"
            className="type-label text-on-surface transition-colors duration-200 hover:text-primary"
          >
            {profile.name.split(" ")[0]}
          </a>

          <div className="flex items-center gap-sm">
            <p className="type-overline text-dim md:hidden" aria-live="polite">
              {activeLabel ?? "Top"}
            </p>

            <ul className="hidden items-center gap-md md:flex">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={`type-label transition-colors duration-200 ${
                      active === id ? "text-on-surface" : "text-secondary hover:text-on-surface"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ButtonLink href="#contact">Contact</ButtonLink>
          </div>
        </nav>
      </header>
    </>
  );
}
