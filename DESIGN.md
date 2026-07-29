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
- **Harvest gold** (`--accent`) is the second signal, and the title's own colour.

## Typography

**Assistant** for both display and body — one family, deliberately. Headings carry
`letter-spacing: 0.02em`; the restraint is the point. Do not introduce a second
typeface to "add character"; character comes from the imagery and the copy.

## Layout

- Content max-width 1200px; breakpoints at 1200px and 900px.
- Next.js 15 App Router with `(en)` and `(es)` route groups — **every layout change
  must hold in both locales**; Spanish strings run longer.
- `critical.css` is inlined critical CSS and duplicates blocks from `main.css`.
  **Edit both, or the change only lands after hydration.** This is a real trap.

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

## Do's and Don'ts

- **Do** edit `main.css` and `critical.css` together for any shared block.
- **Do** verify changes in both `(en)` and `(es)`.
- **Do** keep the single Assistant family and the single dark theme.
- **Do** treat the image library as brand-critical; route new assets through the
  house webp pipeline.
- **Don't** animate layout properties — transform and opacity only.
- **Don't** sand off the unease to look more like a standard film site.
- **Don't** fabricate laurels, review quotes, or festival credits anywhere in the UI.
