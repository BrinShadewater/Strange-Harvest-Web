# Strange Harvest Web

Official website for **Strange Harvest**, the 2025 horror mockumentary feature.

This repo holds the production web experience for the film: trailer and watch surfaces, press material, cast and crew sections, merch routing, international pages, structured metadata, sitemaps, consent UI, geolocation support, and the image system behind the public-facing release.

The site is part official film destination, part evidence table. It needs to feel polished enough for press and distribution partners while still preserving the unsettling texture of the movie.

## What This Site Does

- Presents the official film identity, synopsis, trailers, cast, crew, and watch paths.
- Maintains press, review, behind-the-scenes, and platform assets.
- Serves English and Spanish public pages.
- Generates/serves robots and sitemap surfaces for search engines.
- Handles cookie consent, analytics, speed insights, and location-aware availability.
- Keeps a large library of optimized posters, stills, icons, and social/watch assets.

## Stack

- Next.js 15
- React 18
- TypeScript
- Vercel Analytics and Speed Insights
- Netlify/Vercel deployment configuration

## Repository Status

Production site. Treat changes as public-facing unless they are clearly internal docs.

## Local Development

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

## Project Map

```text
src/app/             Next.js routes, robots, sitemap, API routes
src/components/      Film-site sections and shared UI
src/services/        Shopify and geolocation helpers
public/images/       Posters, stills, press, review, watch, and social assets
public/              Static pages, icons, manifests, sitemaps, llms.txt
netlify/functions/   Netlify geolocation fallback
api/                 Vercel geolocation endpoint
```

## Key Surfaces

- `src/components/sitecopy.ts` keeps major site copy centralized.
- `src/components/Watch.tsx` and `src/components/Merch.tsx` affect conversion paths.
- `src/app/sitemap.ts` and `src/app/robots.ts` affect search visibility.
- `src/middleware.ts` and geolocation services affect regional behavior.
- `public/press.html`, `public/privacy.html`, and `public/bts.html` are standalone static pages.

## Documentation

- `ACTION-PLAN.md`
- `SITE-AUDIT.md`
- `DEPLOYMENT-CHECKLIST.md`
- `ANALYTICS-SETUP.md`
- `COOKIE-CONSENT-COMPLETE.md`
- `GEOLOCATION-IMPLEMENTATION.md`
- `docs/PROJECT-BRIEF.md`
- `docs/MAINTENANCE.md`

## Working Style

The site should feel like an official film destination, not a generic template. Keep copy precise, keep metadata current, and treat images as part of the storytelling system.

## Review Checklist

- Build passes with `npm run build`.
- Changed pages have been viewed locally.
- Watch, merch, press, and regional-availability changes include a source or reason.
- Metadata changes include title, description, OG/Twitter, sitemap, and canonical implications where relevant.
- New image assets are optimized and named descriptively.

## Release Notes

Use `CHANGELOG.md` for notable public-facing changes, metadata updates, deployment changes, and content additions.
