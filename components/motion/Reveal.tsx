"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, ScrollTrigger, duration, ease } from "@/lib/motion";

/**
 * V2 motion language, one primitive, three named tiers.
 *
 * V1 had a single fade-and-rise for everything, which made every section enter
 * identically. V2 keeps one implementation — so there is still one behaviour
 * to tune and one reduced-motion path — but exposes three tiers that differ in
 * *kind*, not just distance:
 *
 * - `primary`   a clip-path wipe plus rise, for section openers
 * - `secondary` the familiar rise, for supporting blocks
 * - `micro`     opacity only, for metadata that should not draw the eye
 *
 * Only transform, opacity and clip-path animate — all compositor-friendly.
 * `once: true` retires each trigger after it fires.
 */
export type RevealTier = "primary" | "secondary" | "micro";

const tiers: Record<RevealTier, gsap.TweenVars> = {
  primary: {
    opacity: 0,
    yPercent: 8,
    clipPath: "inset(0% 0% 100% 0%)",
    duration: duration.reveal,
    ease: ease.expo,
  },
  secondary: {
    opacity: 0,
    y: 24,
    duration: duration.section,
    ease: ease.expo,
  },
  micro: {
    opacity: 0,
    duration: duration.section,
    ease: ease.soft,
  },
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  tier = "secondary",
  stagger,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  tier?: RevealTier;
  /** Selector for children that should enter in sequence rather than as a block. */
  stagger?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? element.querySelectorAll(stagger) : element;
        const hasTargets = stagger ? (targets as NodeListOf<Element>).length > 0 : true;
        if (!hasTargets) return;

        const tween = gsap.from(targets, {
          ...tiers[tier],
          delay,
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => {
        media.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: ref, dependencies: [delay, tier, stagger] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
