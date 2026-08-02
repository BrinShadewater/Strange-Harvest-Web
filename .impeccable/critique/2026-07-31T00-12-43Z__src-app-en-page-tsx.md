---
target: Strange Harvest Web site-wide (EN home anchor)
total_score: 22
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
timestamp: 2026-07-31T00-12-43Z
slug: src-app-en-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector/browser sub-agent)

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Watch section can hang forever on "Checking platform availability…" — detectRegion() has no timeout, no error state |
| 2 | Match System / Real World | 3 | Film-world language excellent; ES page serving English first-paint is the deduction |
| 3 | User Control and Freedom | 3 | Carousel pause/prev/next, Escape closes overlays, reduced-motion honoured; lightboxes don't return focus |
| 4 | Consistency and Standards | 2 | Release year 2025 on site vs 2024 in press kit/footer; "RESTRICTED" vs "R"; nav "Press" and kit "Press" are two different surfaces; two Shopify subdomains (strangeharvestmovie vs strangeharvestfilm.myshopify.com) |
| 5 | Error Prevention | 2 | Geo fallback chain exists but conversion section has no failure path; ipapi.co fallback is ad-blocker bait |
| 6 | Recognition Rather Than Recall | 3 | Platform logos, anchored nav good; press kit requires knowing the URL |
| 7 | Flexibility and Efficiency | 3 | Lang toggle, geo-personalized watch lists, poster download |
| 8 | Aesthetic and Minimalist Design | 2 | 28 press quotes with near-duplicate paraphrases (Paste ×3, Decider ×3); stat-chip lightbox shows identical text bigger |
| 9 | Error Recovery | 2 | Merch has a real "Coming Soon" recovery; Watch has none |
| 10 | Help and Documentation | n/a | Persuade marketing surface |
| **Total** | | **22/36** | **Acceptable/Good boundary (61%)** |

# Design Specificity Verdict

**Authored, not interchangeable — but the authorship lives in the assets and copy, not the system.** In-world alt text ("Blood message reading HAIL AZRAGOR discovered during the investigation") is the best-in-class move; occult dividers, fluorescent-flicker title, dried-blood red all serve the Evidence Table. Two brand-sheet failures: harvest gold — "the second signal, the title's own colour" — is consumed in exactly two places (cookie-consent hovers); and the ES surface collapses press credibility entirely (P0s below).

**Deterministic scan: 200 findings (exit 2), all advisory quality:** design-system-color 179, design-system-radius 21. Concentrated in main.css (144), critical.css (45), theme.css (11). Pattern: a small repeating set of literals (#fff, white/black alphas, an hsl(0,65%,30–75%) red family) never promoted to tokens. Both configured waivers verified intact (broken-image comment false-positive, synopsisQuote side-tab). Note: the side-tab waiver does NOT cover the same colour value flagged separately under design-system-color at main.css:489 etc. Browser overlay injection was blocked by the site's own CSP (localhost not in script-src/connect-src) — fallback SSR/curl evidence used; screenshots unavailable this session (pane not compositing).

# Priority Issues

- **[P0] /es serves English at the SSR level** — sitecopy.ts resolves language at module scope (window-sniff → "en" on server); LanguageProvider receives lang but no component consumes it. Raw HTML of /es contains English synopsis and nav under <html lang="es">. Crawlers index English under hreflang=es; users get English flash + hydration mismatch. Fix: route-owned copy (wire useSitecopy() to the provider or pass copy from server layouts). Command: /impeccable harden
- **[P0] ES copy is accent-stripped** — "anos" for "años", "Politica", "trafico", "Pelicula" (sitecopy.ts ~lines 577–702 and (es) metadata). Collapses official-site credibility for the ES audience. Command: /impeccable clarify
- **[P1] Conversion surface has no fallback + served CSS is stale** — (a) Watch SSRs only a spinner, no platform links, no timeout; (b) full stylesheet loads only via JS-injected link, no noscript fallback; (c) public/styles/main.css (actually served, dated 2026-05-08) still animates width on .navToggleBar — the scaleX fix committed 2026-07-29 in src/main.css+critical.css NEVER SHIPPED to the served file, and post-load it re-introduces the banned layout thrash over critical.css's correct version. Fix: SSR default platform list; timeout + error state; build-copy src/main.css → public/styles/; add noscript link. Command: /impeccable harden + /impeccable optimize
- **[P1] Press carousel accessibility/comprehension failure** — 28 cards permanently tabbable while invisible (opacity:0, no visibility/inert; keyboard users tab through 27 ghost links); aria-live announces every 8s forever; 28 10px dots; near-duplicate quotes, one cited to Wikipedia, one to RT rather than source. Fix: curate to 6–8 first-hand quotes, inert inactive cards, drop aria-live on auto-cycle, counter instead of dots. Command: /impeccable harden + /impeccable distill
- **[P2] Press kit orphaned and out of sync** — nothing links to /press.html (nav "Press" anchors to the carousel); kit says 2024/"R" vs site 2025/"RESTRICTED"; media contact is social icons only, no email. Legal/credit copy is lawyer-reviewed — reconcile facts WITH Alex. Command: /impeccable clarify
- **[P2] Decorative symbol divider announces "Strange Harvest symbol" 8 times to screen readers** (SymbolDivider.tsx). Fix: alt="" + aria-hidden. Command: /impeccable harden
- **[P3] Dead artifacts**: theme.css imported nowhere (describes an older design), cookie-test.html/_robots-old.txt/_sitemap-old.xml ship publicly; stat-chip lightbox is interaction without information.

# Persona Red Flags

- **Jordan (deciding to watch):** hung geo = Watch section with zero links at the exact conversion moment; strongest quote (The Guardian) is 1 of 28 and probably off-screen.
- **Casey (mobile from trailer link):** 10px carousel dots unhittable; hamburger needs JS with no fallback; shipped CSS still width-animates the toggle bars; overflow-x:hidden masks rather than fixes.
- **Sam (SR/keyboard):** worst-served — 27 invisible tabbable links, 8s aria-live interruptions, symbol announced ×8, dialogs with no focus trap/move. Positives: skip-link, aria-pressed, Escape+focus-return on mobile nav.
- **Marisol (ES viewer needing synopsis + where-to-watch):** English first paint, accent-stripped Spanish after hydration, English "Privacy Policy", Filmin only if geo resolves; nav still SSRs English on /es.

# Minor Observations

- package.json says next ^16.2.9 (not 15 as the vault note assumed).
- A/B poster test leaks as a user-facing toggle — assignment vs preference conflated; stats will be noisy.
- (en)/(es) layouts duplicate ~230 lines of metadata/JSON-LD each — same drift class as the CSS trap, currently in sync.
- hero h1 fixed 84px, no clamp — risky for ES title lengths.
- Contrast healthy throughout (muted bone ≈7:1, CTA ≈8:1).
- bts.html?lang=es works via a completely different i18n mechanism (query string) than the app — two schemes, one broken.

# Questions to Consider

1. If the site is an evidence table, why does it end with the paperwork (32-name cast list)? One last exhibit + sticky Watch would serve both dread and conversion.
2. Do 28 quotes make the film look more reviewed, or less? Six devastating quotes pinned like clippings would be more credible and more on-brand.
3. Should the route own the copy? As long as language is a client-side window-sniff, ES will always be a re-render of an English page. And should harvest gold ever actually appear on the table?
