# Strange Harvest — Site Audit
**Generated:** March 2026

---

## Summary

The site is well-built overall. The SEO foundations are strong — structured data, sitemaps, Open Graph, hreflang — and the security headers are solid. The areas below are the most impactful things to address, roughly ordered by priority.

---

## 🔴 High Priority

### 1. Duplicate H1 Tag
`index.html` has a visually-hidden `<h1>` ("Strange Harvest (2025) Official Movie Website"), and the Hero component also renders a visible `<h1>` for the title. This means every page load results in two `<h1>` elements. Search engines treat this as a technical error and it confuses screen readers. The hidden one in `index.html` should be removed since the React component already provides the real H1.

### 2. SPA Content Not Indexable Without JavaScript
The entire page content (synopsis, cast, press quotes, watch links) lives inside React components that only render after JavaScript executes. If Googlebot doesn't render the JS successfully, it will index an almost-empty page. The structured data in the `<head>` helps, but the body text — which is what drives keyword rankings — won't be seen. Options:
- **SSR with React frameworks** like Next.js or Remix (most complete fix)
- **Vite's `vite-plugin-ssr` or Astro** for a lighter-weight static generation
- **Prerendering** via a tool like `react-snap` or Netlify's prerender service as a quick win

### 3. No `prefers-reduced-motion` Support
The `ParticleBackground` canvas runs a continuous `requestAnimationFrame` animation loop at 60fps. Users who have set their OS/browser to "reduce motion" (a common accessibility and battery-saving preference) will still see the full animated background. This also affects the Hero title flicker on poster toggle. Add a check:
```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
And either skip the animation loop entirely, or render a static background.

### 4. Date Inconsistency in Metadata
There's a mismatch across the metadata that can confuse search engines:
- `article:published_time` in the `<head>` → `"2024-01-01"`
- `datePublished` in JSON-LD → `"2025-01-01"`
- `video:release_date` Open Graph tag → `"2024"`
- Page title and JSON-LD `name` → says `"2025"`

Pick one canonical release year and make it consistent everywhere. If the film's official release date is 2025, update the `article:published_time` and `video:release_date` to match.

---

## 🟡 Medium Priority

### 5. YouTube Iframe Facade (Performance)
The Trailer section loads a full YouTube `<iframe>` on page load. YouTube embeds pull in ~500KB+ of scripts and make dozens of network requests even before the user clicks play. Using a lightweight facade pattern dramatically improves initial page load:
- **[lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)** is a drop-in web component that shows a thumbnail + play button, and only loads the real iframe when clicked
- This alone can take several seconds off the initial load for users on slower connections

### 6. Google Fonts Loading Strategy
Currently fonts are loaded from `fonts.googleapis.com` via a `<link rel="stylesheet">`. While you do have `preconnect` hints, this still depends on an external request. Two improvements:
- Add `&display=swap` is already there ✓
- Consider **self-hosting the font** using [google-webfonts-helper](https://gwfh.miromannino.com/fonts) to eliminate the external dependency entirely and improve LCP slightly
- Or add `font-display: optional` instead of `swap` to avoid layout shifts on slower connections

### 7. ParticleBackground Always Running
The canvas animation runs at 60fps continuously even when the user has scrolled away from the top and isn't interacting with it. Consider:
- Using an `IntersectionObserver` on the `<body>` or pausing the animation loop when the tab isn't visible (`document.addEventListener('visibilitychange', ...)`)
- The `document.hidden` API can be used to `cancelAnimationFrame` when the tab is backgrounded — this is a significant CPU/battery win on mobile

### 8. Open Graph Image Tags — Second Image Missing Dimensions
There are two `og:image` tags (one `.webp`, one `.jpg`). The `og:image:width` and `og:image:height` attributes that follow only apply to the first image in most parsers. The second image effectively has no declared dimensions. Either remove the second `og:image` or add explicit `og:image:width` / `og:image:height` / `og:image:type` tags after each image respectively.

### 9. Missing `og:image:secure_url`
Facebook and some other platforms expect `og:image:secure_url` as a fallback for HTTPS image URLs. Since your image is already HTTPS, this is easy to add:
```html
<meta property="og:image:secure_url" content="https://strangeharvestmovie.com/images/strange-harvest-official-movie-poster-1280w.jpg" />
```

### 10. Language Implementation — Query Params vs. Subdirectory
Spanish content lives at `/?lang=es` rather than `/es/` or `es.strangeharvestmovie.com`. Google officially supports both, but subdirectory paths (`/es/`) are generally preferred because:
- They're treated as distinct URLs in analytics
- They get their own crawl budget
- Backlinks to the Spanish version are tracked separately

This is a larger refactor but worth considering if Spanish audiences are a meaningful part of your target market.

---

## 🟢 Lower Priority / Quick Wins

### 11. Missing HSTS Security Header
The `netlify.toml` has good headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) but is missing `Strict-Transport-Security`. Add to the `[[headers]]` block:
```toml
Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```
This tells browsers to always use HTTPS for your domain and allows HSTS preloading.

### 12. Press Carousel Auto-Advance & Accessibility
The press quotes carousel auto-advances every 8 seconds with `aria-live="polite"`. For screen reader users this means the live region announces a new review every 8 seconds regardless of what they're doing on the page. Consider:
- Adding a pause/play control button to the carousel
- Only announcing changes when the user manually navigates (`aria-live` on the track but only triggered on user interaction)
- Checking if `prefers-reduced-motion` is set and disabling auto-advance if so

### 13. Breadcrumb Schema Is Incomplete
The JSON-LD `BreadcrumbList` only includes Home, Press, and BTS. The main page sections are missing. Since this is a single-page layout, you could use anchor links in the breadcrumb (e.g., `https://strangeharvestmovie.com/#about`). More importantly, press.html and bts.html should have their own `BreadcrumbList` JSON-LD with accurate paths reflecting where those pages sit.

### 14. CSP `unsafe-inline` for Scripts
The Content-Security-Policy header allows `'unsafe-inline'` for scripts. This was likely needed for Vercel analytics or Google Tag Manager inline initialization. While it's common, it does weaken XSS protection. The gold standard is nonce-based CSP, but that requires server-side rendering. As an incremental step, you could move any inline script logic to dedicated bundled files.

### 15. Sitemap Index File
You have three separate sitemaps (main, image, video) all referenced individually in `robots.txt`. A sitemap index file (`/sitemap-index.xml`) that points to all three is a cleaner pattern and makes it easier to add future sitemaps without updating `robots.txt` each time.

### 16. Vite Build — More Code Splitting
The `vite.config.ts` creates one manual chunk (`react-vendor`), but with several below-the-fold sections (Synopsis, CastCrew, Press, Merch, Trailer), you could lazy-load these components to reduce the initial JS bundle. Example:
```ts
const Press = React.lazy(() => import('./components/Press'));
const CastCrew = React.lazy(() => import('./components/CastCrew'));
```
This defers loading these components until they're needed, improving Time to Interactive.

---

## 💡 Content & Growth Suggestions

### Blog / Content Hub
A blog section (even a simple static one) covering topics like horror mockumentary history, true crime cinema, behind-the-scenes features, or "films like Strange Harvest" would generate substantial long-tail organic traffic. Horror fans search for these topics constantly. Even 5–10 articles targeting specific queries ("best found footage horror movies 2025", "true crime mockumentary films") could meaningfully expand your search visibility.

### Email / Audience Capture
There's no mechanism to capture visitor emails. An unobtrusive newsletter signup ("Get updates & exclusive content") would let you build a direct audience relationship beyond social media algorithms.

### Review Schema on Press Page
The `press.html` page likely displays full reviews. Adding `Review` schema markup to each review on that page would make them eligible for rich snippets in search results, which can significantly improve click-through rates.

### TikTok / Short-Form Social Presence
For horror films in particular, TikTok is one of the highest-ROI platforms for organic discovery. If you haven't already, the "Mr. Shiny" character and the mockumentary format have strong viral potential in the short-form format.

---

## ✅ What's Already Well Done

- Comprehensive JSON-LD structured data (Movie, VideoObject, ImageObject, Organization, BreadcrumbList)
- Proper Open Graph and Twitter Card meta tags
- Multiple sitemaps with hreflang annotations
- Geolocation-based streaming platform detection
- Cookie consent with granular categories
- Responsive images with `srcset`, `width`, `height`, and `loading="lazy"` attributes
- `preload` hint for the hero image
- DNS prefetch and preconnect for external domains
- Vercel Speed Insights integration
- A/B testing for poster variants with event tracking
- Comprehensive ARIA labels and skip links
- Good security headers overall
- `robots.txt` with proper directives
