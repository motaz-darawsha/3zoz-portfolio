"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, registerMotion } from "@/lib/motion";

const PROBE_RADIUS = 190;

/**
 * The site's signature element. Two layers occupy the same box: the finished
 * headline, and the schematic that produced it. The probe is a circular mask
 * that reveals the schematic wherever the pointer is — the thesis "I build
 * things to understand how they work" made operable rather than written twice.
 *
 * Cost control: pointer position goes to CSS custom properties through a
 * quickSetter on one composited element. No React state per frame, no layout
 * reads in the move handler, nothing animating when the pointer is away.
 */
export function Probe({
  children,
  schematic,
}: {
  children: React.ReactNode;
  schematic: React.ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);
  const [probing, setProbing] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    registerMotion();
    // The probe is a pointer affordance. Without a fine pointer, or with
    // reduced motion requested, the schematic becomes a permanent block below
    // the headline instead — nothing here is pointer-only.
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setInteractive(pointer.matches && !motion.matches);
    sync();
    pointer.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      pointer.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const lens = lensRef.current;
    if (!interactive || pinned || !frame || !lens) return;

    const setX = gsap.quickSetter(lens, "--probe-x", "px");
    const setY = gsap.quickSetter(lens, "--probe-y", "px");
    const fade = gsap.quickTo(lens, "opacity", { duration: 0.3, ease: "power2.out" });

    let bounds = frame.getBoundingClientRect();
    const measure = () => {
      bounds = frame.getBoundingClientRect();
    };

    const move = (event: PointerEvent) => {
      setX(event.clientX - bounds.left);
      setY(event.clientY - bounds.top);
    };

    const enter = (event: PointerEvent) => {
      measure();
      // Position before fading in, so the lens never flashes at a stale spot.
      setX(event.clientX - bounds.left);
      setY(event.clientY - bounds.top);
      fade(1);
      setProbing(true);
    };

    const leave = () => {
      fade(0);
      setProbing(false);
    };

    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerenter", enter);
    frame.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      frame.removeEventListener("pointermove", move);
      frame.removeEventListener("pointerenter", enter);
      frame.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(lens);
    };
  }, [interactive, pinned]);

  const togglePinned = useCallback(() => setPinned((value) => !value), []);

  return (
    <div>
      <div ref={frameRef} className="relative">
        {children}

        {interactive ? (
          <div
            ref={lensRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={
              pinned
                ? { opacity: 1 }
                : ({
                    "--probe-x": "50%",
                    "--probe-y": "50%",
                    "--probe-r": `${PROBE_RADIUS}px`,
                    opacity: 0,
                    maskImage:
                      "radial-gradient(var(--probe-r) at var(--probe-x) var(--probe-y), #000 62%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(var(--probe-r) at var(--probe-x) var(--probe-y), #000 62%, transparent 100%)",
                    willChange: "mask-image",
                  } as React.CSSProperties)
            }
          >
            {schematic}
          </div>
        ) : null}
      </div>

      {interactive ? (
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="eyebrow flex items-center gap-2.5">
            <span
              className="size-1.5 rounded-full transition-colors duration-200"
              style={{ backgroundColor: probing || pinned ? "var(--color-ember)" : "var(--color-dim)" }}
            />
            {pinned
              ? "Showing the layer underneath"
              : probing
                ? "Reading the layer underneath"
                : "Move across the headline to look underneath"}
          </p>
          <button
            type="button"
            onClick={togglePinned}
            aria-expanded={pinned}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim underline decoration-line decoration-1 underline-offset-4 transition-colors duration-200 hover:text-text hover:decoration-ember"
          >
            {pinned ? "Show the headline" : "Keep it open"}
          </button>
        </div>
      ) : (
        <div className="relative mt-10 min-h-[17rem] border-t border-line pt-8 sm:min-h-[19rem]">
          {schematic}
        </div>
      )}
    </div>
  );
}
