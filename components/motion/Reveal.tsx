"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, ScrollTrigger } from "@/lib/motion";

/**
 * Level 2/3 motion: the single scroll-entrance primitive for the whole site.
 * One implementation means one behaviour to tune and one reduced-motion path.
 * Only transform and opacity are animated, and `once` keeps each trigger from
 * living past its reveal.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(element, {
          opacity: 0,
          y: 26,
          duration: 0.8,
          delay,
          ease: "power3.out",
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
    { scope: ref, dependencies: [delay] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
