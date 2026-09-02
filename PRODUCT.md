# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technically sophisticated visitors evaluating Motaz Darawsha as a builder: people offering
internships, freelance work, collaboration, and developers deciding whether he is worth talking to.
They arrive skeptical, skim first, and are looking for evidence of real capability before they
read anything.

## Product Purpose

A personal portfolio that proves Motaz can actually build things. Success is the visitor moving
through three reactions in order: "this is unusually well designed" → "he actually built these
things" → "I want to see how he built them."

## Positioning

"I build things to understand how they work." Motaz is not presenting as a corporate engineer with
years of employment. He is a technically curious builder who learns by taking systems apart:
Discord bots, game-server infrastructure, and the integrations between them. His strongest
differentiator is research speed and precise investigation.

## Operating Context

Single-page marketing-style portfolio, no auth, no CMS, no database, no backend. Read on desktop
and phone by people scanning quickly. Motaz cares more about design and animation craft than about
adding content.

## Capabilities and Constraints

- Next.js App Router + React + TypeScript (strict) + Tailwind v4, GSAP for motion. Static only.
- Must remain fundamentally 2D. No Three.js, WebGL scenes, or 3D as core experience.
- Every animation must respect `prefers-reduced-motion`; keyboard focus visible everywhere.
- Performance is part of the design: a premium site that feels slow is not premium.
- Real content is fixed and lives in `content/`. Nothing may be invented (see Evidence on Hand).

## Brand Commitments

- Name: Motaz Darawsha. Palestinian. Age 16 — mentioned at most once, never the selling point, and
  never framed as a "teen portfolio."
- Voice: concise, intelligent, confident, technical when necessary, human. Banned phrases:
  "passionate developer," "code enthusiast," "innovative visionary," "let's build something
  amazing," and similar filler.
- Social: GitHub `Motaz-Darawsha`, X `@MotaxXa`, Discord `@91jq`. No other accounts exist.
- Visual reference supplied by the user: the AuthKit "Night Sky" design language (dark, cinematic,
  soft electric-blue accents, glow over shadow, pill actions, spacious centered composition). This
  is binding as a *design language*, explicitly not as a layout or concept to copy.

## Evidence on Hand

Everything below is user-supplied fact. Nothing else may be claimed.

- **0xMUSIC** — working. Discord music bot: Node.js, Discord.js, NodeLink primary audio node,
  Lavalink as emergency fallback. Hardest part was configuring the Lavalink client integration.
  Around seven people have used it and liked it. No other metrics were ever measured.
- **Haweah / Identity Bot** — paused. Generated in-game identity cards for FiveM/SA-MP from a
  character record. Not a finished platform; no users; no deployment.
- **Store bot** — stopped. Reached 100+ Discord servers. Rewrote words to evade simple keyword
  filters (a technique not to be endorsed). Stopped because Discord verification could not be
  completed. This is the single strongest piece of real evidence on the site.
- **Earlier builds** — archived: X3 Bot, Minecraft–Discord bridge, Ticket bot.
- **Infrastructure** — Minecraft Java and Bedrock server setup/config/mods/world management,
  FiveM and SA-MP communities, Discord-connected systems.
- **No assets exist**: no screenshots, logos, photographs, product captures, testimonials,
  customers, stars, downloads, awards, or certifications. Absent evidence must be designed around,
  never fabricated, and generated visuals must never be presented as real screenshots.

## Accessibility

WCAG AA contrast for all text, visible keyboard focus on every interactive element, semantic
heading order, reduced-motion parity, and no information conveyed by pointer or motion alone.
