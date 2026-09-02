"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const sections = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Section tracking uses IntersectionObserver rather than a scroll handler, so
 * nothing reads layout on every frame. The active indicator is a border on the
 * link itself — no morphing pill, which would be motion for its own sake.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [condensed, setCondensed] = useState(false);
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
    const observer = new IntersectionObserver(
      ([entry]) => setCondensed(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Normal-flow sentinel at the top of the document: once it scrolls out,
          the fixed header needs its own background to stay legible. */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      <a
        href="#work"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:border focus-visible:border-ember focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-xs"
      >
        Skip to work
      </a>

      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
          condensed ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
        >
          <a
            href="#top"
            className="font-display text-sm tracking-tight text-text transition-colors duration-200 hover:text-ember"
          >
            {profile.name.split(" ")[0]}
            <span className="text-dim">.</span>
          </a>

          <ul className="flex items-center gap-1 sm:gap-2">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`inline-block border-b px-2.5 py-1.5 font-mono text-xs transition-colors duration-200 sm:px-3 ${
                    active === id
                      ? "border-ember text-text"
                      : "border-transparent text-dim hover:text-text"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
