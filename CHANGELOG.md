# Changelog

Notable public-facing changes to Strange Harvest Web are tracked here.

## Unreleased

- Cast, crew, detective and watch cards are named by their visible text; the old `aria-label`s reordered the words and were English on the Spanish page (#62).
- The synopsis stat buttons are named by their visible text; the old `aria-label` reordered the words, so voice control and screen readers heard a different button than the one on screen (#61).
- Added repository documentation, contribution guidance, security notes, issue templates, and pull request template.
- Added project brief and maintenance documentation for public-site operations.
- Added more expressive README headings and voice while keeping the documentation professional.

## 2026-09-05

- Sitemap lastmod no longer trusts the boundary commit of Vercel's shallow clone; untouched pages keep their real dates.

## 2026-09-04

- The festival poster theme is decided on the server from the A/B cookie, so a festival-theme visitor no longer sees the red theme flash first.
- Sitemap lastmod dates come from git history instead of the build clock, so a deploy no longer claims every page changed today.
- English and Spanish pages carry the same reciprocal hreflang set.
- Consent, poster-toggle and lightbox controls are labelled in Spanish on /es.
- Poster images are cached for a week instead of a year, because the files are not content-hashed and were re-encoded in place in August.
- GA4 beacons to regional hosts are allowed by the CSP.

## 2026-08-15

- Release date corrected in the metadata. Amazon deep links verified. The Sony Pictures Core tile is gone because it only pointed at a storefront homepage.
- The Shopify fetch waits until you scroll near the merch section.
- The mobile hero is poster-first again.

## 2026-08-13

- Respects prefers-reduced-motion; the film grain is back for everyone else.
- A real 404 page. Spanish pages no longer leak English links.
- Behind-the-scenes gallery has responsive image variants (24.4 MB down to 5.8 MB).

## 2026-08-09

- Crew credits and social handles corrected. The copyright year is 2024 on purpose: production year, not release year.
- Press kit restored to full resolution. Contrast fixes. 13 icons and portraits right-sized. 120 MB of unused images and the old Netlify config removed.
- Your poster choice persists between visits.

## 2026-08-08

- Merch store is live, served from Shopify with images resized by the CDN.
- 16 new behind-the-scenes photos.
- Fixed the /api/geo 500.

## 2026-08-02

- Canonical-only sitemap, the transcript page is linked, Spanish accents restored on the four static pages, html lang set before the body renders.
- First Core Web Vitals measurement recorded.
