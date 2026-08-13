---
target: Strange Harvest Web site-wide (EN home anchor)
total_score: 23
max_score: 36
na_heuristics: 10
p0_count: 3
p1_count: 2
timestamp: 2026-08-13T07-34-04Z
slug: src-app-en-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector/browser-evidence sub-agent)

Scope: strangeharvestmovie.com — EN home, /es, /press.html, /bts.html, /transcript.html,
/privacy.html. Live production, `main` @ `e148e5f`, clean tree. Report-only; no files edited.

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Geo silently changes which platforms you see; region stated only when detection *fails* |
| 2 | Match System / Real World | 3 | A control labelled "Festival Poster" repaints every accent colour on the site |
| 3 | User Control and Freedom | 3 | 105 of 121 links open new tabs with no visual or assistive signal |
| 4 | Consistency and Standards | 2 | `bts.html` carries full nav, `transcript.html` only a back link; `privacy.html` has no `<header>` at all; rating is "RESTRICTED" on home and "R" in the press kit |
| 5 | Error Prevention | 2 | Amazon deep-links only for the US; 7 other territories get a **search results** URL. Sony Pictures Core is a bare homepage |
| 6 | Recognition Rather Than Recall | 3 | 15 of 28 carousel dots share duplicate accessible names (Paste Magazine ×3) |
| 7 | Flexibility and Efficiency | 2 | Press on deadline get no bulk download, WebP-only stills, no PDF kit |
| 8 | Aesthetic and Minimalist Design | 3 | 28 press quotes and 12 white product shots dilute otherwise strong art direction |
| 9 | Error Recovery | 1 | The 404 is the raw Next.js default: 7,103 bytes, **zero anchors**, no site CSS |
| 10 | Help and Documentation | n/a | Persuade marketing surface; transcript and press kit are content, not docs |
| **Total** | | **23/36** | **64% — Acceptable** |

Trend: 22/36 (2026-07-31) → 22/36 (2026-08-09) → **23/36** now. The +1 understates real
progress: **all four contrast failures and every touch-target defect from the last run are
gone**, and two new defect classes were found that nobody had measured before.

# Design Specificity Verdict

**Authored for this product — with a clean seam between the narrative and transactional surfaces.**

Unmistakable and unliftable: `/transcript.html` written as an in-world artifact with
timestamped sound cues and dispatcher VO; the synopsis stat strip running the MPA card
(`RESTRICTED · Disturbing / Grisly Violent Content And Language`) as a design element; a
pull-quote attributed to **Detective Joe Kirby**, a fictional character, inside the real
synopsis; forensic alt text ("Blood stained knife labeled as forensic evidence"); the occult
symbol doing structural work as a 7× section divider; merch names carrying in-film dialogue.

Category-interchangeable: the merch grid (12-up image/title/price/Buy Now, pulled unedited
from Shopify), the Watch logo-tile grid, and Cast & Crew. The narrative surfaces are
excellent. The transactional surfaces were not given the same authorship.

**Deterministic scan: 259 findings deduped (exit 2), 3 non-advisory.** Raw count is 401, but
`public/styles/main.css` is byte-identical to `src/main.css` apart from a 4-line generated
banner — B diffed them and confirmed the 4-line offset in every line number. Deduped: 74
markup + 185 CSS. **`src/components` and `src/app` returned zero findings across every file** —
all markup hits are in the four hand-written static pages. The 3 warnings: two `side-tab`
(`press.html:355`, `transcript.html:259`) which are the *same* blood-red pull-quote convention
already waived in `.impeccable/config.json`, and one `dark-glow` (`bts.html:476`). The waiver
is file-scoped to `src/main.css` and does not reach the generated mirror or the static pages —
a scope artifact, not three defects. 349 of 401 advisories are `design-system-color`, dominated
by `#fff` and `rgba(255,255,255,α)` on an all-black site: low signal.

# Overall Impression

The site's craft floor has risen sharply. B measured **822 elements across six surfaces and
both A/B arms and found zero WCAG AA contrast failures**, zero unnamed controls, zero images
missing an `alt` attribute, zero `outline: none` anywhere, no horizontal scroll at 375 or
390px, and a clean console with every request 200 and no third-party origins contacted at all.
That is a genuinely strong baseline and it is the direct result of PRs #42–#46.

The remaining problems are not craft problems. They are **reach** problems: the first mobile
screen shows no title and no call to action, one gallery page ships 31.8 MB of images, the
404 is a dead end, and the site's most on-brand texture never renders at all.

The single biggest opportunity: **restoring the film grain would make the site more unsettling
and the merch photos more obviously wrong.** That is the rare fix that improves the brief and
exposes the next problem at the same time.

# What's Working

1. **The transcript is the best content on the site, and it is the accessibility artifact.**
   It satisfies the WCAG media-alternative requirement *and* extends the fiction. The
   compliance deliverable became the strongest piece of writing on the site.

2. **The press carousel is a genuinely WCAG-2.2.2-compliant carousel**, which is rare in
   production: `prefers-reduced-motion` starts it paused, an IntersectionObserver gates the
   timer and **fails open**, off-screen slides carry `inert` (verified live — zero tabbable
   descendants), `aria-live="polite"` announces position, and there is a real pause control at
   44×44.

3. **The focus system is disciplined token thinking.** One rule at `:where(...)` zero
   specificity, gold, 2px/3px offset, and `--accent` deliberately does **not** change between
   A/B arms (verified: `--primary` flips `0 65% 35%` → `210 88% 42%` while `--accent` holds at
   `45 70% 50%`). The experiment cannot accidentally break focus visibility. Minimum measured
   ring contrast across every composited backdrop on every surface: **6.54:1**.

# Priority Issues

- **[P0] `bts.html` ships 31.8 MB of images with one `srcset` and no lazy loading.**
  77 unique images resolve on disk: **16 over 500 KB, 8 over 1 MB, largest 3.44 MB**. The page
  contains exactly **1 `srcset` attribute** and **zero `loading="lazy"`**. B measured 2,223 KB
  encoded with only 10 of 75 images loaded — that is a floor, not a total. The gallery is
  JS-driven, so a visitor who scrolls pulls a large fraction of the full 31.8 MB.
  Worst single case: `strange-harvest-occult-symbol-horror-icon.webp` is **3000×3000, 100,036
  bytes**, served with no srcset and used five times at 36×36 and ~80×80 — an 83× oversize
  factor — while a **5,804-byte `-256w` variant already exists and the home page already uses
  it.** Four more eager images run 2.6×–4.4× oversize, one at 1.15 MB.
  *Why it matters:* BTS is the page press and fans browse longest, and it is the heaviest thing
  on the domain by an order of magnitude. On the mobile connections that already fail LCP, this
  is punishing.
  *Fix:* route every `bts.html` image through the house webp pipeline for responsive variants,
  add `loading="lazy"` below the fold, and swap the 3000×3000 icon for the existing `-256w`.
  Command: `/impeccable optimize`

- **[P0] The mobile hero buries the film's name and every CTA below the fold.**
  Measured at 375×812: poster spans y=108–611, toggle 630, kicker 705, **H1 at 757 with height
  81 — clipped by the 812 fold**, blurb 846, **CTA row at 955, i.e. 143px below the fold.** The
  first screen is header plus poster and nothing else. Real iOS Safari is worse, since the URL
  bar takes roughly 60px more.
  *Why it matters:* mobile dominates film-site traffic, and on a Persuade surface the first
  screen currently contains no title, no hook, and no way to act.
  *Fix:* cap the mobile poster at ~55vh, move the poster toggle into the poster frame, and lift
  kicker + H1 + blurb + CTA above 812.
  Command: `/impeccable adapt`

- **[P0] The first-load title flicker has no reduced-motion guard anywhere.**
  `.heroTitle.is-visible` runs `fluorescentFlickerOn 2s linear` — roughly four luminance
  reversals in the first 700ms, opacity 0→0.95→0.2→1→0.45→1 against brightness 0.1→2.2.
  **Independently verified: `prefers-reduced-motion` appears ZERO times in all three
  stylesheets.** The JS guard in `Hero.tsx` sits inside `handlePosterToggle` and only suppresses
  the *replay*; the initial animation is pure CSS on a server-rendered class and always plays.
  The keyframes are duplicated at `src/main.css:256` **and** `src/critical.css:253`, so a
  one-file fix leaves it live above the fold.
  *Why it matters:* vestibular-sensitive visitors get an unavoidable strobe on the largest
  element on the page. Not asserted as a WCAG 2.3.1 violation — flash area was not measured
  against the 25%/10° threshold — but it is the exact pattern the guard exists for.
  *Fix:* add `@media (prefers-reduced-motion: reduce)` to **both** `src/main.css` and
  `src/critical.css`.
  Command: `/impeccable animate`

- **[P1] The 404 is the raw Next.js default: no branding, no links, no way back.**
  Independently verified: `/this-page-does-not-exist` returns 7,103 bytes, title "404: This page
  could not be found.", **0 anchor elements**, zero references to the Assistant font, zero
  references to the site stylesheet. `src/app/` contains no `not-found.tsx`.
  *Why it matters:* every stale press link, mistyped URL and dead social link lands here. A
  journalist following an old link hits a total dead end with no route to Watch or Press, and
  the fiction breaks completely.
  *Fix:* add `src/app/not-found.tsx` on the site shell with links to Home, Watch and Press.
  In-world copy is free here — the easiest place on the site to turn an error into atmosphere.
  Command: `/impeccable harden`

- **[P1] The film grain and half the atmospheric lighting never render.**
  `#root::after` (grain), `#root::before` (top glow) and `#root { position:relative; z-index:1 }`
  are keyed to `#root`, a Vite/CRA convention. This is Next.js App Router. Independently
  verified: **5 `#root` rules in `src/main.css` (lines 127, 1730, 1744, 1757, 2663) plus 1 in
  `critical.css`, and the served HTML contains zero `id="root"`** — `<body>` goes straight to
  `<header class="siteHeader">`. The grain's `repeating-linear-gradient` exists *only* inside
  `#root::after`. Knock-on: without `#root`'s `z-index:1`, `body::before`/`body::after` at
  `z-index:10` composite *over* content instead of behind it, which is likely why those
  gradients had to be dialled down to 0.03–0.08 opacity.
  *Why it matters:* degraded-evidence-footage grain is the most on-brand texture in the
  stylesheet and it is simply absent. **Restoring it increases unease — this is the rare fix
  that is not a polish regression.** It is a fossil from before this repo went to Next.
  *Fix:* retarget the three rules to `body` or add `id="root"` to a layout wrapper, and correct
  the z-index inversion.
  Command: `/impeccable polish`

- **[P2] Spanish visitors are handed English pages; the press kit has no territory labels.**
  `sitecopy.ts:135` (`/transcript.html`) and `:143` (`/press.html`) hardcode hrefs with no
  `?lang=es`, and `Footer.tsx:42` hardcodes both the href and the English label "Privacy
  Policy" while every sibling reads from sitecopy. All four static pages *do* support
  `?lang=es`, and `Header.tsx:19` already does it correctly for BTS — the pattern exists and
  was not applied. Verified live on `/es`: the footer shows "Privacy Policy" in English beside
  "Configuración de cookies", and `.footerCookieSettings` carries an English `aria-label` that
  **overrides** the translated visible label for screen-reader users.
  Separately, `/press.html` states "Streaming: Hulu" with no territory qualifier while the home
  page geo-filters to Paramount+ in Canada. Neither is wrong — `geolocation.ts:304/309` confirm
  Hulu is US-only — but the press kit reads as a global claim.
  *Fix:* make the three hrefs language-aware; move the privacy label and cookie aria-label into
  sitecopy. For territory, reuse the wording **already in the repo** at
  `src/app/(en)/layout.tsx:210` — "streaming on Hulu (US) and Paramount+ (Canada)" — which
  invents nothing.
  Command: `/impeccable harden`

- **[P2] Conversion links dump the visitor into a search box or a storefront homepage.**
  Verified in source: `HomeVideo.tsx:13` deep-links `amazon.com/dp/B0FSMGS86V` for the US, but
  lines 15–28 fall back to **search-results URLs** (`/s?k=…`) for CA, UK, AU, DE, FR, ES and IT.
  `sitecopy.ts:408` points Sony Pictures Core at `https://www.sonypicturescore.com`, a bare
  homepage. Every other platform link is a proper deep link.
  *Why it matters:* these are the last click before money, and search results can surface
  competing titles. Note this means **a Canadian visitor never gets a deep link.**
  *Fix:* deep-link per territory where an ASIN exists, or remove the tile until it does — an
  absent option converts better than a broken one.
  Command: `/impeccable audit`

# Accessibility evidence (measured, not inferred)

**Strong, and materially better than the last run.** 822 contrast measurements across six
surfaces and both A/B arms: **zero AA 1.4.3 failures**. Tightest margin is
`.statValueWarning` ("RESTRICTED") at **4.24:1**, 22px/700, passing as large text and identical
in both arms. **Zero WCAG 2.5.8 touch-target failures** — 69 of 167 home targets are under
44×44, but every one passes via the spacing exception when the 24px-diameter test is applied
against every other target; carousel dots are exactly 24×24. Zero unnamed controls (0 of 167,
167, 12, 94, 4, 6). Zero `<img>` missing an `alt` attribute anywhere. One `h1` per surface, no
heading-level jumps. No horizontal scroll at 375 or 390px across 12 checks. Zero console errors;
every request 200; **no third-party origins contacted at all** — analytics are first-party
proxied.

**Weak:** `privacy.html` has **no `<header>`** — the only surface missing one, and it survived
PR #46 which explicitly targeted landmarks on that page. The **7 top-level `<section>`s on home
and `/es` all lack `aria-label`/`aria-labelledby`** (`#top #trailer #watch #home-video #shop
#press #cast`), as do 5 of 6 on press. **15 of 28 carousel dots carry duplicate accessible
names** (Paste Magazine ×3; Dread Central, RogerEbert.com, The Daily Beast, JoshAtTheMovies.com,
From the Fourth Row, Decider ×2 each) — unchanged from the last run.

# Persona Red Flags

**Casey (distracted mobile, one-handed, slow connection)** — worst served. First screen is a
poster and nothing else; title clipped, CTA row 143px below the fold. The page is **17,868px
tall on mobile**. Reaching Watch by scrolling means passing the entire synopsis and trailer.
If she taps through to BTS she is on the 31.8 MB page.

**Jordan (confused first-timer)** — taps "Watch" in the hero expecting to watch, and is scrolled
to a grid of six logos. Sees Paramount+ with no explanation of why (she is in Canada) and no
statement that the list is regional. Then meets 12 merch cards before the press quotes.

**Sam (screen reader + keyboard-only)** — better served than most film sites: skip link, `inert`
off-screen slides, `aria-live` carousel position, one high-contrast focus ring, correct
`aria-expanded`/`aria-controls`. Two real failures: the unguarded first-load flicker, and on
`/es` the cookie-settings button announces in **English** while displaying Spanish. Plus 105
new-tab links with no assistive warning and 15 duplicate dot names.

**The press/festival programmer on deadline** (project-specific, from the real audience) —
partly excellent, partly obstructive. *Works:* stills are individually downloadable with
dimensions, file size and format stated up front and descriptive aria-labels — genuinely
press-aware design. *Fails:* **no bulk download** (six clicks for six assets), **WebP only**
with no JPEG/TIFF alternative when plenty of editorial pipelines still reject WebP, **no PDF
press kit**, no territory labels on availability, and `/transcript.html` — a page they may well
land on from search — has **no site nav at all** while `/bts.html` has the full nav.

# Minor Observations

- The **merch grid is entirely client-rendered from Shopify and absent from the SSR HTML.**
  Googlebot renders JS on a second-wave crawl, so this is not fatal, but 12 products are
  invisible to first-pass crawling and to any scraper that does not execute JS.
- Language toggle EN/ES renders at 10–11px; the cookie-consent button row is 11px all-caps
  (tap size is fine at 335×44 — this is legibility only).
- Cookie banner has `role="dialog"` but no `aria-modal`.
- Desktop nav links are 23px tall; crew IMDb links 18px. Both pass 2.5.8 via spacing, both are
  under the 24px comfort floor.
- "Enlarge" on `bts.html` navigates to a bare image file — no lightbox, so it is full context
  loss requiring the back button, worst on mobile.
- `proxy.ts` matcher is `["/", "/es"]` only, so direct-to-static-page traffic never receives an
  A/B assignment and is invisible to the experiment.
- The poster toggle uses `role="group"` with `aria-pressed`; `role="radiogroup"` is the more
  accurate semantic for a mutually exclusive pair.
- The mobile nav does not move focus into the menu on open, though Escape correctly returns
  focus to the toggle.
- **Cross-referenced from the SEO pass run in the same session:** mobile CrUX field data shows
  **LCP 2,783ms and INP 378ms, both failing**, with "reduce unused JavaScript" at ~450ms as the
  main lever. `/styles/main.css` is served `max-age=0, must-revalidate` because `vercel.json`
  has an `/images/` cache rule but no `/styles/` rule, and it is shipped unminified at 57,490
  bytes.

# Findings raised and then withdrawn

Recorded so they are not re-litigated:

- **Footer "© 2024" is NOT stale.** A flagged it as two years out of date. It was set
  deliberately by PR #37 ("correct crew credits, social handles and the copyright year"),
  confirmed by Alex on 2026-08-09, and is consistent across `sitecopy.ts:573`,
  `(en)/layout.tsx:191` and `(es)/layout.tsx:122`. **Adjudicated — not a bug.**
- **The mobile nav is not broken.** A initially read `aria-expanded` as stuck false; that was
  its own hidden-pane environment throttling React's scheduler. On re-test it works correctly.
- **The A/B assignment cookie does not flip mid-session.** A traced an apparent red→blue flip to
  its own `force`-navigate clearing cookies. `proxy.ts:10` correctly writes only when absent.
- **`sh_poster_choice` overriding `sh_ab_theme_v1` is documented behaviour, not a bug.** B
  flagged it as a caveat; precedence is choice > assignment by design.
- **"6 of 75 bts images lack alt text"** (A) is wrong; B separated the categories correctly —
  0 missing the attribute, 6 intentional decoratives.
- **The `side-tab` warning in `public/styles/main.css`** is the same physical declaration as the
  waived rule in `src/main.css`, differing only by the generated banner's 4-line offset. One
  issue, not two.

# Coverage gaps in this run

- **No screenshots and no LCP/CLS from the browser agent.** The browser pane never composited
  frames, so `getEntriesByType('paint')` returned `[]` on every surface. B's observed CLS of 0
  is meaningless and is **not** reported as a pass. Field CWV came from CrUX via the SEO pass
  instead.
- **Focus rings were computed from the cascade, not observed painted.** Synthetic Tab never
  advanced focus past `body`. Ring contrast figures are resolved from rule text plus `--accent`
  per arm — high confidence, but not photographed.
- **`prefers-reduced-motion` reported `reduce`, so only the reduced branch was observed.** No
  animation, transition, or carousel auto-advance was exercised by either agent. All motion
  behaviour is unmeasured — which is itself why the missing CSS guard matters.
- **Image sizing is partial.** Only 10/44 home and 15/75 bts images had layout pixels; press.html
  image sizing is entirely unassessed. The 31.8 MB figure is from disk, which is reliable, but
  the *rendered* oversize count on bts is likely higher than the five confirmed.
- **No external links were requested by either agent**, so Instagram/Letterboxd/Rotten
  Tomatoes/Amazon/Shopify targets are untested here. (The SEO pass separately verified the
  Paramount+ link returns 200.)

# Questions

1. **If Watch is the conversion, why is Trailer the primary CTA?** The hero's `cta primary` is
   `#trailer`; Watch is secondary — and both merely scroll. For a film already streaming, is the
   trailer a funnel step or a detour from the click that counts?
2. **What is the A/B test actually asking?** A control labelled "Festival Poster" changes both
   the poster art and every accent colour. If blue wins, which variable won? This was raised on
   2026-08-09 and the arm is still compound.
3. **Would 6 press quotes persuade more than 28?** You have The Guardian, Bloody Disgusting,
   Dread Central, Film Threat and Rue Morgue. Quotes 15–28 are visibly thinner, and 15 of the 28
   dots are not even distinguishable by name to a screen reader.
4. **The transcript is the best-written page on the site and it is a dead end.** What happens if
   the case file expands — evidence logs, autopsy notes, dispatch transcripts — each ending in a
   Watch CTA? That turns the accessibility artifact into the conversion engine.
5. **Restoring the film grain will make the merch photography look worse.** Is that an argument
   against the grain, or an argument for reshooting merch on the Evidence Table?
