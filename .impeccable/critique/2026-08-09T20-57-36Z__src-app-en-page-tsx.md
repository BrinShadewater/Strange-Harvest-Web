---
target: Strange Harvest Web site-wide (EN home anchor)
total_score: 22
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
timestamp: 2026-08-09T20-57-36Z
slug: src-app-en-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector/browser-evidence sub-agent)

Scope: strangeharvestmovie.com — EN home, /es, /bts.html, /press.html. Report-only; no
files edited (a parallel session is active in this repo).

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | All six watch tiles look identical — nothing separates "included with your subscription" from "pay $20 to own" |
| 2 | Match System / Real World | 3 | "RESTRICTED" (home) vs "R" (press); genre gains "Found Footage" between the two pages |
| 3 | User Control and Freedom | 2 | press.html and bts.html have no persistent nav; only route back is a link at 97% scroll depth |
| 4 | Consistency and Standards | 1 | A/B theme recolours `/` but not the static pages — half of visitors get a blue home and red subpages |
| 5 | Error Prevention | 2 | `products.length === 0` is treated as failure, so an empty catalogue reports "Something broke on our end" |
| 6 | Recognition Rather Than Recall | 3 | 28 carousel dots with duplicate accessible names (Paste ×3, Decider ×3) |
| 7 | Flexibility and Efficiency | 3 | Real accelerators (skip link, hash CTAs, edge geo, ES routes); geo silently drops Hulu with no acknowledgement |
| 8 | Aesthetic and Minimalist Design | 2 | White merch grid is the brightest mass on the page; 30 cast + 14 crew land as one wall |
| 9 | Error Recovery | 3 | Reworked merch failure is genuinely good; docked only for the false-positive empty case |
| 10 | Help and Documentation | n/a | Persuade marketing surface; transcript and press kit already have dedicated pages |
| **Total** | | **22/36** | **Acceptable/Good boundary (61%)** |

Trend: 22/36 on 2026-07-31, 22/36 now. The flat total hides real churn — both prior
P0s (ES serving English at SSR, accent-stripped Spanish) are gone, the press-carousel
P1 is genuinely fixed, and two new P0s arrived with the new surfaces.

# Design Specificity Verdict

**Authored for this product — with one large new section that could belong to any Shopify store.**

Strip the logo and most of the site is still unmistakably Strange Harvest: the About
block is the Evidence Table executed literally — two-column synopsis, blood-red-ruled
pull quote attributed in-world to Detective Joe Kirby, four crime-scene stills arranged
as exhibits, and four stat chips where *only* the content warning is coloured. That one
restraint is what makes the warning read as a warning instead of styling, and it is the
clearest evidence the token system is used rather than merely documented.

The exception is the merch grid. Twelve cards of pure-white ghost-mannequin vendor
photography on a 4%-lightness ground, titles pasted unedited out of Shopify. It is the
loudest thing on the page and the least authored.

**Deterministic scan: 79 findings (exit 2), 75 advisory.** Down from 200 on 2026-07-31 —
but the drop is scope, not only repair: this run scanned `src/components src/app
public/*.html`, and `src/components` + `src/app` returned **zero findings** across 19
files. All 79 are in the four legacy static `public/*.html` pages. Non-advisory: one
`layout-transition` (`bts.html:881`, `transition: width`), one `dark-glow`
(`bts.html:451`), two `side-tab` (`press.html:331`, `transcript.html:208`). The two
`side-tab` hits are the same blood-red pull-quote convention already waived for
`src/main.css` — waivable, not defects; the existing waiver is just file-scoped and does
not reach them. Advisory volume is 65 colour + 10 radius literals, the real signal being
20+ different `rgba(255,255,255,α)` alphas rather than any single value.

Verified independently by me, not taken on the agents' word: the A/B wiring is real
(`sh_ab_theme_v1` cookie read in both page routes, `festival-theme` class toggled in
`Hero.tsx:123`); `press.html` contains **zero** `mailto:` links; the prior stale-served-CSS
P1 is **fixed** (`public/styles/main.css` now carries the `scaleX` fix, same mtime as source).

# Priority Issues

- **[P0] The press kit dead-ends — no contact, nothing downloadable.** `press.html`'s
  contact section is a heading, one sentence, and three social links. Zero `mailto:`
  (verified). The six "Press Images ... available for editorial use" are bare `<img>`
  tags with no anchor and no `download` attribute. Worse, the seven elements *named*
  `.download-btn` are outbound links to Rotten Tomatoes, Letterboxd, Wikipedia and Hulu —
  the class name is a lie. PRODUCT.md names press and distribution as the secondary
  audience needing "stills and press material fast"; this is their terminal step and a
  journalist on deadline cannot reach a human or obtain one usable file.
  Fix: real `mailto:`, wrap each still in `<a download>` with pixel dimensions and a
  credit line. Command: `/impeccable harden`
- **[P0] The A/B theme stops at the page boundary.** Cookie `sh_ab_theme_v1=blue` sets
  `body.festival-theme` on `/`, overriding `--primary` to `210 88% 42%` plus seven glow
  tokens. `press.html` and `bts.html` are static and always render blood red, so a
  blue-arm visitor watches the brand change colour on navigation. The test is also
  measuring a confound: the blue arm varies poster art, global `--primary`, seven glows
  *and* the content-warning colour at once, so a win is uninterpretable. Fix: scope the
  test to the hero poster alone, or set the variant class server-side on the static pages.
  Command: `/impeccable harden`
- **[P1] Contrast failures on decision-critical text, blue arm only.** Measured, composited
  up the ancestor chain: `.merchCardPrice` **2.62:1** (20px/600 — the single most
  decision-relevant text on a commerce card), `.castCharacterName` ×32 and `.crewRole` ×4
  at **3.54:1**, `.highlight` at **3.74:1**. All fail AA 1.4.3. `.highlight` is a `<strong>`
  styled in link-blue with `cursor: auto` — a false affordance on top of a contrast failure.
  Separately, `body.festival-theme .statValueWarning` routes around the `--alarm` token
  DESIGN.md created precisely so warnings stay legible, making the one real alarm on the
  page the same blue as the Buy Now buttons. Note: A and B disagreed on the merch price
  figure (3.54 vs 2.62); B's number is the corrected-compositing measurement and is the
  one to trust. Red arm is unaffected — `--primary` red is surface-only there.
  Command: `/impeccable colorize`
- **[P1] The merch grid inverts the conversion hierarchy.** Twelve filled `.cta.primary`
  Buy Now buttons; the Watch section has **zero** primary buttons. PRODUCT.md principle 2
  says watch paths are the conversion and everything else exists to earn that click — the
  button hierarchy states the opposite. The white product boxes are also the "sanded-off
  unease" the brief forbids: they float above the evidence table instead of lying on it.
  Fix: composite shots onto card-black, demote Buy Now to outline, promote the streaming
  card, show 6 with "see all 12 in the shop". Command: `/impeccable layout`
- **[P2] Watch renders as a 450px orphan grid.** `.watchGridRent` computes to `218px 218px`
  at 1440 (148px at 390), a 450px island in a 1200px column holding 5 items, leaving Sony
  Pictures Core alone on row three. The click the site exists to earn is the raggedest block
  on the page. Fix: `repeat(auto-fit, minmax(180px, 1fr))`; fold the standalone Home Video
  section into RENT/OWN, removing ~660px of divider whitespace and one of three competing
  commerce blocks. Command: `/impeccable layout`

# Accessibility evidence (measured, not inferred)

Strong: zero unlabelled controls across 434 controls on four surfaces; zero missing alt
across 125 images; zero heading-level jumps; one `h1` per surface; no horizontal scroll at
390px anywhere; zero console errors. The press carousel's `inert` discipline is correct —
27 inactive cards all inert, zero tabbable descendants, which closes last run's P1. Focus
rings on `/` are gold at **9.31:1** with no `outline: none` anywhere.

Weak: `bts.html` and `press.html` have **zero** `:focus-visible` rules and compute
`color-scheme: normal` on a near-black page, so every control falls back to a UA ring
measured at `rgb(16,16,16)` on `rgb(10,10,10)` — effectively invisible. The 64 BTS gallery
dots are **10×10px** with no padding, the largest target defect measured. `press.html` has
one landmark total (a header) — no `nav`, `main`, or `footer`, and all six sections unlabelled.

# Minor Observations

- Footer reads "© 2024" 15px below "(2025)". Confirmed correct by Alex, but the adjacency
  is what makes it read as a bug to visitors.
- `/es`: nav `aria-label="Site navigation"` is English on the Spanish page; all 12 merch
  titles, prices and image alts are English/USD; the ES `watch` block is missing the
  `streaming` key so "STREAMING" renders in English above "ALQUILER / COMPRA".
- `formatPrice` maps USD, CAD and AUD all to a bare `$` — a Canadian buyer cannot tell which.
- Merch titles carry three different dash characters, a double space in "Gone  11oz", and a
  repeated "Official Strange Harvest" prefix pushing real names to line 2–3 (row heights 500 vs 523px).
- Home Video card ships `strange-harvest-official-movie-poster.webp` at 1368×1824 with no
  `srcset`, displayed at 280px. The `-640w`/`-960w` variants already exist. One-line fix.
- `.merchComingSoon` / `.comingSoonContent` class names survive on what is now an error state.
- `press.html` uses `?lang=es` while the app uses `(es)` route groups — two i18n mechanisms.
- Unused-preload console warnings on `/` (poster) and `/es` (poster + occult icon).
- A reports the blue-arm hero poster is stamped "COMING SOON" while Paramount+ is live two
  sections below. This is baked into the artwork, not code — I could not verify it by grep and
  asset changes need Alex's approval.

# Coverage gaps in this run

- No performance trace: LCP/CLS/INP were not re-measured this pass (INP was measured at
  118 ms earlier in the session).
- The browser reported `prefers-reduced-motion: reduce`, so all motion was observed on the
  reduced branch. The `layout-transition` finding at `bts.html:881` was neither confirmed
  nor refuted live.
- The open mobile nav drawer's focus trapping was not inspected.
- Accessibility findings came from computed-style/DOM queries rather than Chrome's AX tree —
  precise numbers, but a real AX pass could surface naming edge cases.

# Questions

1. The blue arm rewrites `--primary`, seven glow tokens, the synopsis rule, hover states and
   the content-warning colour simultaneously. If blue wins, what will you have learned? Right
   now the result is uninterpretable — and the arm ships four AA contrast failures the red arm
   does not.
2. Twelve merch cards get twelve primary buttons; the watch paths get none. Which document is
   lying — PRODUCT.md, or the page?
3. Press and distribution are a named audience and their page has no email on it. Was the press
   kit built for press, or so the site could say it has one?
