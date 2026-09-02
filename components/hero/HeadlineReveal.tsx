"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, SplitText } from "@/lib/motion";

/**
 * Level 4 motion — the one page-load moment. Lines rise into place behind a
 * clip, then the operative word settles last so the sentence lands on
 * "work". `gsap.matchMedia` gives reduced-motion users the finished state
 * with no tween at all.
 */
export function HeadlineReveal() {
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

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from(split.lines, {
            yPercent: 118,
            duration: 1.1,
            stagger: 0.085,
          })
          .from(
            "[data-headline-accent]",
            { opacity: 0, duration: 0.7, ease: "power2.inOut" },
            "-=0.45",
          );

        return () => split.revert();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(target, { opacity: 1 });
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <span ref={containerRef}>
      I build things to{" "}
      <span className="italic" style={{ fontFamily: "var(--font-sans)" }}>
        understand
      </span>{" "}
      how they{" "}
      <span data-headline-accent className="text-ember">
        work.
      </span>
    </span>
  );
}
