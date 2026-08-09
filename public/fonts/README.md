# Self-hosted Assistant

Two WebFont subsets of **Assistant**, served from this folder by the four static
pages (`bts.html`, `press.html`, `privacy.html`, `transcript.html`).

## Why these exist

The static pages previously linked Assistant from `fonts.googleapis.com`. The site's
CSP is `style-src 'self' 'unsafe-inline'`, so that stylesheet was **blocked on every
page load** — the pages silently rendered the sans-serif fallback while the app pages
rendered Assistant, and each visit logged a CSP error.

Serving the font from `/fonts` satisfies `font-src 'self'`, so it loads, and the static
pages now match the app's typography.

## Provenance

Copied from `.next/static/media/`, where `next/font/google` places the same files it
serves to the Next app pages (`src/app/(en)/layout.tsx`, `src/app/(es)/layout.tsx`).
They are not a separate download, so app and static pages use byte-identical fonts.

| file | subset | unicode-range |
|---|---|---|
| `assistant-latin.woff2` | latin | `U+0000-00FF` plus common punctuation |
| `assistant-latin-ext.woff2` | latin-ext | Central/Eastern European |

Assistant is a **variable** font, so one `@font-face` per subset with
`font-weight: 400 800` covers every weight the site uses. The Hebrew subset that
`next/font` also generates is deliberately not copied — nothing here needs it.

Browsers fetch only the subsets they need: an English or Spanish page loads the latin
file alone (~22 KB) and never requests latin-ext. Spanish accents are inside the latin
range, so `/es` and `?lang=es` are fully covered by that one file.

## If Assistant ever changes

These are a manual copy, so they do not update when `next/font` regenerates. If the
font, its weights, or its subsets change in `layout.tsx`, re-copy from
`.next/static/media/` after a build and update the `unicode-range` values in the four
pages to match the `@font-face` rules Next emits.

## Licence

Assistant is licensed under the **SIL Open Font License 1.1**, which permits
redistribution including bundling with a website. Upstream:
<https://fonts.google.com/specimen/Assistant>
