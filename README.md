# Strange Harvest Web 🎬

![Licence](https://img.shields.io/badge/licence-all%20rights%20reserved-lightgrey?style=flat-square) ![Live](https://img.shields.io/badge/live-strangeharvestmovie.com-brightgreen?style=flat-square) ![Shadewater Labs](https://img.shields.io/badge/Shadewater%20Labs-%E2%9A%97%EF%B8%8F-6b4fa2?style=flat-square)

Official website for **Strange Harvest**, the 2025 horror mockumentary feature.

This repo holds the production web experience for the film: trailer and watch surfaces, press material, cast and crew sections, merch routing, a Spanish edition, structured metadata, sitemaps, consent UI, geolocation-aware availability, and the image system behind the public-facing release.

The site is part official film destination, part evidence table, part cursed media shelf. It needs to feel polished enough for press and distribution partners while still preserving the unsettling texture of the movie.

## 🎞️ What This Site Does

- Presents the official film identity, synopsis, trailers, cast, crew, and watch paths.
- Maintains press, review, behind-the-scenes, and platform assets.
- Serves English and Spanish public pages from two route groups, `(en)` and `(es)`.
- Resolves the visitor's region **before the first byte** by reading edge headers during server rendering, so the Watch section — the conversion surface — never shows a spinner where a link should be. A client-side fallback with hard timeouts covers hosts with no edge header.
- Loads merch from the Shopify Storefront API, deferred until the visitor nears the merch section, with card images resized by the CDN rather than served at full size.
- Handles cookie consent, Vercel Analytics, and Speed Insights.
- Generates `sitemap.xml` and `video-sitemap.xml` on every build and commits them; robots comes from `src/app/robots.ts`.
- Keeps a large library of optimized posters, stills, icons, and social/watch assets, with responsive variants for the BTS gallery.

## 🧰 Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Vercel Analytics and Speed Insights
- Vercel deployment

## 🚦 Repository Status

Production site. Treat changes as public-facing unless they are clearly internal docs. An earlier version of this README listed a `sitemap.ts` route, a `middleware.ts`, and Netlify functions — all replaced. Sitemaps are static files generated at build time, the request hook lives in `src/proxy.ts`, and the only deployment target is Vercel.

## ⚙️ Local Development

```shell
npm install
npm run dev
```

Production build:

```shell
npm run build
```

Start a built app:

```shell
npm run start
```

Use the npm scripts, not `next build` directly. `prebuild` syncs the CSS and regenerates the sitemaps; skipping it ships stale ones.

## 🗺️ Project Map

```text
src/app/(en)/        English layout and home page
src/app/(es)/es/     Spanish home page and layout
src/app/api/geo/     Edge route returning the visitor's country from platform headers
src/app/robots.ts    Robots rules
src/proxy.ts         Request hook — assigns the A/B theme cookie on / and /es
src/components/      Film-site sections and shared UI; sitecopy.ts holds the copy
src/services/        Shopify, geolocation (client), geoServer (server), poster variants
scripts/             Sitemap generation, CSS sync, BTS image variants
public/              Static pages, sitemaps, llms.txt, icons, manifest
public/images/       Posters, stills, press, review, watch, and social assets
```

## 🔦 Key Surfaces

- `src/components/sitecopy.ts` keeps major site copy centralized.
- `src/components/Watch.tsx` and `src/components/Merch.tsx` are the conversion paths.
- `src/services/geoServer.ts`, `src/app/api/geo/route.ts`, and `src/services/geolocation.ts` are the three layers of region detection, in the order they are tried.
- `scripts/generate-sitemaps.mjs` writes `public/sitemap.xml` and `public/video-sitemap.xml`; `public/image-sitemap.xml` is hand-maintained. Run `npm run sitemaps` and commit the result when page structure changes.
- `src/app/robots.ts` affects search visibility.
- `next.config.ts` carries the Content Security Policy and security headers.
- `public/press.html`, `public/privacy.html`, `public/bts.html`, and `public/transcript.html` are standalone static pages.

## 📚 Documentation

- `docs/PROJECT-BRIEF.md`
- `docs/MAINTENANCE.md`
- `PRODUCT.md` and `DESIGN.md`
- `DEPLOYMENT-CHECKLIST.md`
- `ANALYTICS-SETUP.md`
- `GEOLOCATION-IMPLEMENTATION.md` and `GEOLOCATION-QUICK-REFERENCE.md`
- `COOKIE-CONSENT-COMPLETE.md`, `COOKIE-CONSENT-IMPLEMENTATION.md`, `COOKIE-CONSENT-UI-REFERENCE.md`
- `SITE-AUDIT.md` and the dated `ACTION-PLAN-*.md` files — the SEO audits and what was done about them

## 🕯️ Working Style

The site should feel like an official film destination, not a generic template. Keep copy precise, keep metadata current, and treat images as part of the storytelling system.

## ✅ Review Checklist

- Build passes with `npm run build`. CI runs the same build on every pull request and every push to `main`.
- Changed pages have been viewed locally, in both languages if the copy changed.
- Watch, merch, press, and regional-availability changes include a source or reason.
- Metadata changes include title, description, OG/Twitter, sitemap, and canonical implications where relevant.
- New image assets are optimized, named descriptively, and have responsive variants where the gallery expects them.

## 📝 Release Notes

Use `CHANGELOG.md` for notable public-facing changes, metadata updates, deployment changes, and content additions.

---

## 📄 Licence

All rights reserved. This repository is public so the work can be read and referenced, not relicensed. The code, copy, and film and creative assets remain © Brin Shadewater / Shadewater Labs. If you want to use something here, ask.
