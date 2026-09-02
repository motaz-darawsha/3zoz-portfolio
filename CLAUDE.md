# 3zoz-portfolio — agent environment

Premium personal developer portfolio for Motaz Darawsha. Stack: Next.js (App Router) + React + TypeScript,
advanced 2D visual design, GSAP-driven motion, strict accessibility and Core Web Vitals budgets.

## Installed skills

Project skills live in `.claude/skills/` and are pinned in `skills-lock.json`
(update with `npx skills update -p -y`). All sources are first-party/official.

| Skill | Source | Owns |
| --- | --- | --- |
| `frontend-design` | Anthropic | visual direction, typography, composition, avoiding generic AI aesthetics |
| `web-design-guidelines` | Vercel | UI/UX + accessibility + responsive + visual-consistency audit (100+ rules) |
| `vercel-react-best-practices` | Vercel | React/Next.js performance, Server vs Client components, bundle/CWV |
| `vercel-composition-patterns` | Vercel | component architecture, compound components, React 19 APIs |
| `vercel-react-view-transitions` | Vercel | React `<ViewTransition>` / native view transitions |
| `gsap-core` | GreenSock | tweens, easing, stagger, `matchMedia`, reduced motion |
| `gsap-timeline` | GreenSock | sequencing and choreography |
| `gsap-scrolltrigger` | GreenSock | scroll-driven animation, pinning, scrub |
| `gsap-react` | GreenSock | `useGSAP`, refs, cleanup in React/Next.js |
| `gsap-plugins` | GreenSock | SplitText, Flip, Observer, ScrollSmoother, Draggable |
| `gsap-performance` | GreenSock | compositor-friendly animation, avoiding layout thrash |

## Conflict resolution (precedence)

These rules settle overlaps so the agent never loads contradictory guidance:

1. **Motion engine — GSAP is the default.** Use `vercel-react-view-transitions` only for
   route/page transitions and shared-element morphs where the native View Transition API is
   simpler; never drive the same element from both GSAP and a view transition.
2. **Animation correctness — GSAP skills win** over the generic animation rules in
   `web-design-guidelines`, except for `prefers-reduced-motion`, which is non-negotiable and is
   implemented via `gsap.matchMedia()`.
3. **Aesthetics vs. audit.** `frontend-design` decides the visual direction; `web-design-guidelines`
   only audits the result. If an audit rule blocks the design intent, fix the implementation, not the
   direction — unless the rule is accessibility, which always wins.
4. **Performance.** `vercel-react-best-practices` owns render/bundle/data-fetching performance;
   `gsap-performance` owns runtime animation performance. They do not overlap.
5. **Component design.** `vercel-composition-patterns` owns component APIs;
   `vercel-react-best-practices` owns where those components render (server vs client).

## Non-negotiables

- Every animation respects `prefers-reduced-motion`.
- Animate `transform` / `opacity`; never animate layout-triggering properties in scroll handlers.
- GSAP is free including all plugins (post-Webflow acquisition) — install from the public `gsap`
  package, no auth token or private registry.
- Keyboard focus visible on every interactive element; no motion-only affordances.
