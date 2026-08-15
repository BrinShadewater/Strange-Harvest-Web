# Critique ignore list — adjudicated findings, do not re-raise

## Mobile hero: title and CTAs below the fold on phones

**Adjudicated by Alex, 2026-08-15. This is the intended design.**

The 2026-08-13 critique flagged this as a P0: at phone widths the first screen shows the
poster and the poster-toggle buttons, with "STRANGE HARVEST" and the CTA row below the
fold. A fix shipped on 2026-08-15 (poster height-capped at 36vh, padding and margins
trimmed) so title and CTAs cleared the fold — and Alex reviewed it live on his own phone
and reverted it the same day: **"way better the way it was before."**

The poster-dominant first screen is a deliberate trade: the poster is the film's face
(PRODUCT.md: "the image library is the film's face"), and shrinking it to fit the title
above the fold costs more than the scroll does. Do not re-flag the fold, re-propose the
cap, or score heuristic 1/8 down for it. If a future redesign revisits the hero, that is
Alex's call to reopen — not an audit finding.

The full arc, including the reverted values, is in the commit history and the decision
comments in `src/critical.css` / `src/main.css` at the hero block.
