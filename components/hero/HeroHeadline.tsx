"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, SplitText, duration, ease } from "@/lib/motion";

/**
 * The one authored motion moment on the page.
 *
 * Lines rise behind a mask while the whole headline resolves out of a blur —
 * the blur is the point: it reads as a light source coming into focus, which
 * is the night-sky world's own logic rather than a generic fade-up. The last
 * word brightens fractionally late so the sentence lands on "work".
 *
 * Under `prefers-reduced-motion` nothing is created at all: no SplitText DOM
 * mutation, no tween, just the finished headline.
 */
export function HeroHeadline() {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const target = containerRef.current;
      if (!target) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(target, {
          type: "lines",
          linesClass: "overflow-hidden [&>*]:block",
          mask: "lines",
          autoSplit: true,
        });

        const timeline = gsap.timeline({ defaults: { ease: ease.expo } });

        timeline
          .from(split.lines, {
            yPercent: 115,
            duration: duration.hero,
            stagger: 0.08,
          })
          .from(
            target,
            { filter: "blur(14px)", opacity: 0.45, duration: duration.hero, ease: ease.soft },
            0,
          )
          .from(
            "[data-headline-accent]",
            { opacity: 0.35, duration: 0.7, ease: ease.soft },
            "-=0.45",
          );

        return () => split.revert();
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <span ref={containerRef}>
      I build things to understand how they{" "}
      {/* The period is inside the accent span so it can never orphan onto its
          own line when the headline wraps. */}
      <span data-headline-accent className="text-primary">
        work.
      </span>
    </span>
  );
}
