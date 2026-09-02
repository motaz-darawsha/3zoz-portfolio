import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point. GSAP plugins must be registered once before use,
 * and doing it in a shared module keeps every client component from repeating
 * it. useGSAP is registered as a plugin so GSAP's own cleanup path knows about
 * it.
 */
let registered = false;

export function registerMotion() {
  if (registered) return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  registered = true;
}

/**
 * The V2 motion vocabulary. Durations and easings live here rather than in
 * components so timing stays consistent across the site and can be retuned in
 * one place.
 */
export const duration = {
  micro: 0.18,
  section: 0.62,
  reveal: 0.9,
  hero: 1.15,
} as const;

export const ease = {
  /** Entrances: exponential ease-out from an already-visible default. */
  expo: "expo.out",
  /** Bidirectional state changes. */
  soft: "power2.inOut",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
