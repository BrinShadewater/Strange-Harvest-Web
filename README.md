# Strange Harvest Web

Official website for **Strange Harvest**, the 2025 horror mockumentary feature.

This repo holds the production web experience: trailer and watch surfaces, press material, cast and crew sections, merch routing, international pages, structured metadata, sitemaps, consent UI, geolocation support, and the image system for the film's public-facing presence.

## Stack

- Next.js 15
- React 18
- TypeScript
- Vercel Analytics and Speed Insights
- Netlify/Vercel deployment configuration

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

## Documentation

- `ACTION-PLAN.md`
- `SITE-AUDIT.md`
- `DEPLOYMENT-CHECKLIST.md`
- `ANALYTICS-SETUP.md`
- `COOKIE-CONSENT-COMPLETE.md`
- `GEOLOCATION-IMPLEMENTATION.md`

## Working Style

The site should feel like an official film destination, not a generic template. Keep copy precise, keep metadata current, and treat images as part of the storytelling system.

## Release Notes

Use `CHANGELOG.md` for notable public-facing changes, metadata updates, deployment changes, and content additions.
