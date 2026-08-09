# ACTION-PLAN — 2026-08-09

- URL: `https://strangeharvestmovie.com/`
- Script score: **88/100** (PageSpeed category scored 0 due to Google API rate-limit — environment
  limitation, not a site failure; every other category is evidence-backed)
- Dashboard artifact: generated in the session scratchpad (`SEO-REPORT.html`), sent to Alex

> Like the 2026-08-02 run, this file is deliberately dated. `ACTION-PLAN.md` is hand-maintained —
> do not let tooling overwrite it. The report generator was run in an isolated directory for
> exactly that reason.

---

## Done in this session (2026-08-09, PRs #35–#36)

1. **Fixed the GA4 gtag queue** — the consent shim pushed arrays instead of `Arguments` objects,
   so gtag.js dropped every queued command. Analytics and the A/B events were collecting nothing.
2. **Rebuilt the share cards** — dedicated 1200×1600 ~160 KB OG JPG (`…-poster-og.jpg`) replacing
   a wrong 1200×630 declaration, a WebP card (skipped by some scrapers) on EN, and a 2.2 MB print
   JPG on ES. Applied to `/`, `/es`, `press.html`, `bts.html`. Verified live.
3. **Copyright aligned to © 2024** (confirmed by Alex) across JSON-LD `copyrightNotice` in both
   layouts, `press.html`, and `bts.html` — footer already said 2024.
4. **Removed the YouTube social link** from `press.html` (per Alex).
5. **Unlinked crew members without IMDb pages** (Michael Karlin, Bruce P. Guido — confirmed no
   accounts); hover highlight scoped to real links.
6. Particle NaN guard, Cosmo Go search-phrase fix, Merch unmount guard, lint warnings cleared.

## Verified audit results (LLM-reviewed, false positives removed)

**Passes (100/100 categories):** on-page, robots.txt (all 11 AI crawlers explicitly allowed),
llms.txt (quality 100), security headers (HSTS+preload, CSP, XFO, XCTO, Referrer-Policy,
Permissions-Policy), social meta (7/7 OG, 6/6 Twitter), hreflang (en/en-US/en-GB/es/es-ES/
x-default, consistent both directions), redirects (0 hops), duplicate content. Single H1,
clean H2 outline, 153-char meta description, self-canonicals on all six public routes.

**Script findings dismissed on review (do not "fix" these):**
- *"15 images missing alt"* — all are intentional `alt=""` decorative images (symbol dividers,
  watch/press icons inside `aria-label`ed links, brand mark). Correct accessibility practice.
- *"1 broken link (Instagram 429)"* and *Letterboxd timeout, Bloody Disgusting / RogerEbert 403s*
  — bot-blocking on external domains, manual-review per skill rules, not broken links.
- *"Orphan page"* — the poster download JPG, a file deliberately linked once from the hero.
- *"Readability 37.2 Flesch"* — horror-film synopsis copy in the house voice; not rewriting film
  prose to hit a readability formula.
- *"1 image still JPEG"* — the OG card, which is JPG **on purpose** (scraper compatibility).

## Open items (need Alex — facts, not code)

1. **Social handle mismatch (the one real entity issue).** JSON-LD `sameAs` + `twitter:site` say
   `@strangeharvestfilm` / `instagram.com/strangeharvestfilm` / `facebook.com/strangeharvestfilm`;
   the footer and press page link `instagram.com/strangeharvestmovie` /
   `facebook.com/Strangeharvestmovie` / `x.com/Strange_Harvest`. Which set is the real, current
   profiles? Once confirmed, align JSON-LD, `twitter.site`/`creator`, footer, and `press.html`.
2. **PageSpeed / CWV numbers** — rerun `pagespeed.py` with a `PAGESPEED_API_KEY`, or read the
   field data in Vercel Speed Insights. Only unmeasured category this run.
3. Optional: `llms-full.txt` does not exist (llms.txt itself scores 100). Experimental — only if
   AI-search surfacing becomes a priority.

## After deploy

- Re-scrape `strangeharvestmovie.com` in the Facebook Sharing Debugger (needs Alex's login) so the
  new OG card replaces the cached one. X refreshes on its own within ~a week.
