import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single registration point. GSAP plugins must be registered once before use,
 * and doing it in a shared module keeps every client component from repeating it.
 */
let registered = false;

export function registerMotion() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

/** Motion hierarchy from the brief: L1 micro, L2 section, L3 reveal, L4 hero. */
export const duration = {
  micro: 0.18,
  section: 0.6,
  reveal: 0.9,
  hero: 1.1,
} as const;

export const ease = {
  quiet: "power3.out",
  inOut: "power2.inOut",
} as const;

export { gsap, ScrollTrigger, SplitText };
