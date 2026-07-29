# Product

<!-- impeccable:product-schema 1 -->

> Provenance: drafted 2026-07-29 from repository evidence (README.md, src/app, content
> and asset files) during impeccable rollout. Extracted, not interviewed — items marked
> *(inferred)* await confirmation.

## Platform

web

## Users

Primary: audiences looking for Strange Harvest — where to watch it, what it is, whether
it's worth their evening. They arrive from a trailer, a review, a festival mention, or a
streaming platform search.

Secondary: press, distribution partners, and festival programmers evaluating the film,
who need synopsis, credits, stills, and press material fast.

Tertiary: Spanish-language audiences — the site serves `(en)` and `(es)` routes with
geolocation-aware availability. *(scope of the ES audience inferred)*

## Product Purpose

The official web destination for **Strange Harvest**, a 2025 cosmic-horror mockumentary
feature (wide theatrical release; streaming on Hulu and Paramount+). It presents the
film's identity, trailers, cast and crew, watch paths, press material, and merch routing.
Success is a visitor either pressing play on a platform or coming away unsettled enough
to want to. *(success criterion inferred)*

## Positioning

A real theatrical horror feature with a genuine release history — not a proof-of-concept
or a fan page. The README frames the site as "part official film destination, part
evidence table, part cursed media shelf": it must satisfy press and distribution
partners while preserving the mockumentary's found-footage texture.

## Operating Context

- Bilingual EN/ES routes, geolocation-aware watch availability, cookie consent UI.
- Large optimised image library (posters, stills, icons, social/watch assets) with
  responsive webp variants — the house webp pipeline owns this.
- SEO and structured metadata are load-bearing: robots, sitemap, schema surfaces.
- Part of the Shadewater Labs family; Brin Shadewater was Producer and 1st AD.

## Capabilities and Constraints

- **Next.js 15** (App Router) — note this differs from the Vite house stack used by
  the other Shadewater sites; tooling assumptions do not carry over automatically.
- Deploys via Vercel; analytics and Speed Insights wired.
- Never push without explicit approval.
- Film facts (credits, release history, platforms) are real and must not be
  embellished or invented.

## Brand Commitments

- Near-black ground (4% lightness) with a blood-red primary and a harvest-gold accent.
- **Assistant** for both display and body — a deliberate single-family choice.
- The unsettling texture is a requirement, not a mood: polish must not sand off the
  cursed-artifact feel.
- Mockumentary conceit — the site presents as an artifact of the film's world where it
  can do so without misleading press or audiences about the film being fiction.

## Evidence on Hand

- Real synopsis, cast, crew, trailers, press and review material in-repo.
- Real release history: wide theatrical, Hulu and Paramount+.
- Extensive real still/poster library under `public/images/`.
- Do not fabricate quotes, festival laurels, or review scores.

## Product Principles

1. Press-credible and genuinely unsettling at the same time — neither wins outright.
2. Watch paths are the conversion; everything else exists to earn that click.
3. Never fabricate — credits, laurels, and platforms are real or absent.
4. Bilingual parity: the ES surface is a real audience, not an afterthought.
5. The image library is the film's face — quality and optimisation both matter.
