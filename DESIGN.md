# Design

<!-- impeccable:design-schema 1 -->

## Visual world

**AuthKit Night Sky**, applied to a portfolio rather than an auth product.

The user supplied this world as a binding design language, explicitly not as a layout to copy. So
the tokens, temperature, glow-over-shadow depth model, pill geometry and spacious composition are
inherited exactly; the *concept* is ours: a portfolio where the night sky is not decoration but the
subject. Motaz's work is infrastructure — things that run in the dark, unattended, that you only
see when you go looking. The site treats each project as a body in that sky: it emits light or it
does not, and the page is the instrument you read it with.

This replaces the V1/V2 "warm ash" world entirely. That world is anti-reference now.

## Palette

Taken verbatim from the brief. Rust, amber and every warm hue are removed — the brief forbids warm
or saturated colour except for error.

| Token | Value | Use |
| --- | --- | --- |
| `neutral` | `#05060f` | Page ground. The deep-space anchor. |
| `surface` | `#0b1020` | Raised panels, inputs, chips, icon treatments. |
| `primary` | `#c2ccff` | Pale electric blue. Brand accent, primary buttons, hero glow. |
| `primary-60` | `#9fb0ff` | Primary hover. |
| `primary-70` | `#7f94ff` | Deeper accent, focus ring. |
| `secondary` | `#d8ecf8` | Icy blue. Links and supporting emphasis. |
| `tertiary` | `#d1e4fa` | Soft near-white blue. Button text, high-level highlights. |
| `on-surface` | `#ffffff` | Highest-contrast text where readability must be absolute. |
| `border` | `#374151` | Muted slate hairlines and card borders. |
| `glow` | `#bacef7` | Translucent blue for inner and outer light. |
| `error` | `#ff6b7a` | Restrained warm signal. Sparingly. |

Two derived text tints, because the brief's palette has no body-text step and grey would violate the
craft floor: `muted` and `dim` are desaturated from `secondary`, keeping the cool hue. Both are
verified ≥4.5:1 on `neutral` and `surface`.

## Typography

Untitled Sans and Aeonik Pro are commercial and not available here. Substituting on **character**,
not on convenience:

- **Display — Instrument Sans.** Untitled Sans is a neutral-but-warm grotesque with slightly
  humanist terminals; Instrument Sans is the closest open counterpart in proportion and tone, and
  it is genuinely a different voice from Inter (which the craft floor treats as the AI tell).
- **Body — Instrument Sans**, same family at lower weights, matching the brief's "one family for
  most UI".
- **Data — IBM Plex Mono**, used only for measurements, identifiers and counts. Never as a
  "technical" costume.

Scale is the brief's own ramp, converted to a fluid rem scale so it holds from 360px to 2560px:
display 44px, headline-lg 34px, headline-md 27px, headline-sm 21px, body-lg 18/28, body 16/24,
body-sm 14/20, label 14–16/600, overline 12/0.08em. Sentence case throughout — the brief says
uppercase must not dominate.

## Depth

Glow and tonal layering, never heavy shadow. The hero's backlit halo is the primary depth cue.
Emphasis is added with a border, an inset glow, or a lighter surface tone — not elevation.

## Shape

Pills (`999px`) for buttons, chips and icon buttons. 8px for content containers. 4px for tight
details. Nothing over-rounded; the fullest radius is reserved for interactive affordances.

## Signature

**The observation instrument.** A fixed, faint celestial grid underlies the page. Each project is a
body plotted on it, its brightness set by real status: working bodies emit a live glow, paused ones
are dim, archived ones are outline only. The hero headline is backlit by the halo. Scrolling moves
through the field rather than past sections.

This is how the site solves its hardest constraint — there are no screenshots, logos, or photographs
and none may be invented. Instead of apologising for missing imagery, the absence becomes the
concept: you are looking at systems in the dark, and the only honest thing to show is their signal.

## Breakpoints

Named, explicit, and used everywhere. No ad-hoc widths.

| Name | Min width | Intent |
| --- | --- | --- |
| `xs` | 360px | Small phone. Single column, largest tap targets. |
| `sm` | 640px | Large phone / small tablet. |
| `md` | 768px | Tablet portrait. Two-column data. |
| `lg` | 1024px | Laptop. Full composition appears. |
| `xl` | 1440px | Desktop. Reference width for the design. |
| `2xl` | 1920px | Large desktop. |
| `3xl` | 2560px | Ultrawide — content stops growing, gutters absorb the rest. |

Content max-width is capped so ultrawide screens gain margin, not line length. Body measure stays
65–75ch at every step.

## Bans carried from the craft floor

No eyebrow/kicker labels above headings. No decorative section numbers. No cards-in-cards. No
gradient text. No glass as decoration. No monospace as costume. No unicode glyphs standing in for
icons. No hero-metric template.
