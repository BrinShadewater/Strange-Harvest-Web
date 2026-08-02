---
name: Strange Harvest Web
description: Official site for a cosmic-horror mockumentary — near-black ground, blood red, harvest gold
colors:
  void-black: "hsl(0 0% 4%)"
  card-black: "hsl(0 0% 7%)"
  muted-black: "hsl(0 0% 12%)"
  border-gray: "hsl(0 0% 18%)"
  bone-white: "hsl(40 20% 90%)"
  bone-white-muted: "hsl(40 10% 64%)"
  blood-red: "hsl(0 65% 35%)"
  harvest-gold: "hsl(45 70% 50%)"
typography:
  display:
    fontFamily: "Assistant, sans-serif"
    letterSpacing: "0.02em"
  body:
    fontFamily: "Assistant, sans-serif"
rounded:
  sm: "0.5rem"
  md: "12px"
  full: "50%"
components:
  synopsis-quote:
    backgroundColor: "{colors.card-black}"
    textColor: "{colors.bone-white}"
    rounded: "4px"
    padding: "16px"
---

# Strange Harvest Web — Design System

> Recorded 2026-07-29 in scan mode from `src/theme.css`, `src/main.css`,
> `src/critical.css`, and components, during impeccable rollout. North Star confirmed
> by Alex 2026-07-28; tokens and rules are extracted from shipped code.

## Overview

**Creative North Star: The Evidence Table.** The README's own framing —
"part official film destination, part evidence table, part cursed media shelf." A
darkened room where materials from the film have been laid out for examination:
near-black surfaces, a single overhead pool of light (the radial-gradient body wash),
stills and documents arranged for scrutiny, blood red where something went wrong and
harvest gold where the crop turned.

The tension this system has to hold: press-credible enough for distribution partners,
unsettling enough to be honest about the film. Polish that removes the unease is a
regression, not an improvement.

## Colors

HSL triplets in `src/theme.css` (`--background: 0 0% 4%`), consumed via
`hsl(var(--token))`. Single dark theme by design — no light mode.

- **Void black** (4%) is the ground, with a radial gradient washing to 10% at the top
  centre — a single light source over the table. **Card black** (7%) and **muted
  black** (12%) build the depth steps; **border gray** (18%) edges them.
- **Bone white** (40-hue, 90%) for text — warm, never pure white. Muted variant at 64%.
- **Blood red** (`--primary`) is the alarm colour: primary actions, the synopsis
  quote rule. Deliberately desaturated to 35% lightness — dried, not fresh.
  **It measures 2.32:1 against the void-black ground**, so it is a surface and
  emphasis colour only. Never use it for a focus ring, a border that carries
  meaning, or anything that must satisfy WCAG 1.4.11.
- **Harvest gold** (`--accent`) is the interaction signal. Until 2026-08-01 the
  sheet called it "the second signal" while it appeared nowhere on the home page
  — the accent existed only on paper. It now has one systematic job: **every
  focus ring on the site is harvest gold**, at 9.31:1 against the ground. It
  also carries the press-kit link hover. The resting page stays red-and-bone;
  gold is what the site does when you reach for it.
- Body text and ground read from `--foreground` and `--background`. They were
  hardcoded `#e9e9e9` on `#0e0f10` — a cold grey on a blue-tinted charcoal, and
  because `critical.css` and `main.css` disagreed, every load flashed from one
  ground to the other.

## Typography

**Assistant** for both display and body — one family, deliberately. Headings carry
`letter-spacing: 0.02em`; the restraint is the point. Do not introduce a second
typeface to "add character"; character comes from the imagery and the copy.

## Layout

- Content max-width 1200px; breakpoints at 1200px and 900px.
- `main` owns `--page-gutter` (120px → 60px → 20px across those breakpoints).
  Full-bleed sections must derive their bleed from it, never from a fixed value:
  `.hero` uses `--hero-bleed: min(50px, var(--page-gutter))` so it reaches the
  viewport edge and never past it. A flat `-50px` overhung mobile by 30px a side
  and was invisible only because `#root` sets `overflow-x: hidden`.
- Next.js App Router with `(en)` and `(es)` route groups — **every layout change
  must hold in both locales**; Spanish strings run longer. Copy comes from
  `useSitecopy()`, which reads the route-owned `LanguageContext`. **Never resolve
  language from `window.location`** — as a module-scope constant it evaluated to
  "en" on the server and shipped English HTML under `<html lang="es">`.

### The two-stylesheet pipeline — read this before touching CSS

Three files, and only one of them is a source:

- `src/main.css` — **the source of truth.** Imported by nothing.
- `public/styles/main.css` — **generated.** Never hand-edit. Written by
  `scripts/sync-css.mjs`, which runs on `predev`/`prebuild`. This is the file the
  browser actually loads, injected as a `<link>` by `<DeferredCSS />` after first
  paint so it never blocks rendering. A `<noscript>` link covers JS-off.
- `src/critical.css` — inlined above-fold subset, hand-maintained, and it
  duplicates blocks from `main.css`. **Edit both, or the rule only lands after
  hydration** — and since the deferred sheet loads last, a stale `main.css` rule
  will *override* a correct `critical.css` one.

Run `npm run check:css` to assert the generated file is current. If you invoke
`next build` directly instead of `npm run build`, the sync does not run and you
will be testing stale CSS.

## Elevation & Depth

- Mostly flat; several `box-shadow: none` declarations are deliberate resets.
- Real depth is reserved for interactive cards: `0 8px 24px rgba(0,0,0,0.3)` on hover,
  paired with a transform and border-colour transition.
- Radius scale: 0.5rem (`--radius`) default, 12px on larger panels, 50% for circular.

## Motion

- Interactive transitions 0.2s ease on transform / border-colour / box-shadow.
- The nav toggle morphs to an X via `transform` and `opacity` only. It previously
  animated `width`, which thrashes layout; that was replaced with `scaleX(0)` on
  2026-07-29. **Do not reintroduce width/height/padding/margin animation.**

## Components

- **synopsisQuote**: card-black pull-quote, italic, 3px blood-red left rule. The rule
  is a deliberate brand choice (waived from the `side-tab` detector rule in
  `.impeccable/config.json`) — it is a pull-quote convention here, not a card tab.
  Don't propagate the treatment to cards, list items, or alerts.
- **navToggle / navToggleBar**: three bars, transform-morphed to an X.
- **Cards**: card-black surface, border-gray edge, hover lifts with shadow.
- **Press carousel**: only the active card is interactive — inactive cards carry
  `inert`, since they sit at `opacity: 0` and were otherwise tabbable. The track
  has no `aria-live`; the `.carouselPosition` counter announces instead, and only
  while paused, so autoplay never interrupts a screen reader. Dots render 10px
  inside a 24px button (WCAG 2.5.8) and wrap rather than overflow.

## Do's and Don'ts

- **Do** edit `main.css` and `critical.css` together for any shared block, and
  let the sync script regenerate `public/styles/main.css`.
- **Do** verify changes in both `(en)` and `(es)`.
- **Do** keep the single Assistant family and the single dark theme.
- **Do** treat the image library as brand-critical; route new assets through the
  house webp pipeline.
- **Do** let the global `:focus-visible` rule handle focus. A component may set
  its own `outline-offset`; it may not pick a different colour.
- **Don't** animate layout properties — transform and opacity only.
- **Don't** sand off the unease to look more like a standard film site.
- **Don't** fabricate laurels, review quotes, or festival credits anywhere in the UI.
