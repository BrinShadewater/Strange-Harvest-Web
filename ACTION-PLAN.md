# ACTION-PLAN

- URL: `https://strangeharvestmovie.com/`
- Generated: 2026-03-17
- Score: 85/100

## Image Remediation Workflow
- Preview with: `python <WEBP_SKILL_DIR>/scripts/webp_me_daddy.py seo-handoff seo-image-handoff.json --dry-run --json seo-image-apply-report.json`
- Apply with: `python <WEBP_SKILL_DIR>/scripts/webp_me_daddy.py seo-handoff seo-image-handoff.json --yes --overwrite --json seo-image-apply-report.json`

## Critical
- No critical actions queued.

## High

1. **20 images missing width/height attributes**
Evidence: parse_html found 20 img tags without width or height.
Fix: Run `audit --apply-autofix` against the project src/ to patch markup automatically. Review output before committing.
Source: `onpage`

2. **2 images missing aria-hidden**
Evidence: strange-harvest-occult-symbol-horror-icon.webp appears twice with alt="" but no aria-hidden.
Fix: Add `aria-hidden="true"` to both instances in the header and footer components.
Source: `onpage`

3. **AI crawlers not explicitly managed in robots.txt**
Evidence: robots_checker found 11 AI bots inheriting wildcard rules.
Fix: Add explicit `User-agent: GPTBot / Allow: /` blocks (and equivalents for ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, anthropic-ai, FacebookBot, Amazonbot, ChatGPT-User) to public/robots.txt.
Source: `robots`

4. **llms.txt has no links**
Evidence: llms_txt_checker: 0 links found, score 70/100.
Fix: Add markdown links under each section in public/llms.txt. Example:
```
## Streaming
- [Stream on Hulu (US)](https://www.hulu.com/movie/strange-harvest-...)
- [Stream on Paramount+ (Canada)](https://...)

## Key Pages
- [Official Trailer](https://strangeharvestmovie.com/#trailer)
- [Press & Reviews](https://strangeharvestmovie.com/#press)
- [Cast & Crew](https://strangeharvestmovie.com/#cast)

## External References
- [Wikipedia](https://en.wikipedia.org/wiki/Strange_Harvest_(film))
- [IMDB](https://www.imdb.com/title/tt33400719/)
- [Rotten Tomatoes](https://www.rottentomatoes.com/m/strange_harvest)
```
Source: `llms_txt`

## Medium

1. **Create Wikidata entity for Strange Harvest (2025)**
Evidence: entity_checker: wikidata_found=false; no Q-number in sameAs.
Fix: Go to wikidata.org and create a new item. Add: instance of (film), title, director, cast, release date, streaming platform, IMDB ID, Wikipedia article. Then add the Wikidata URL to sameAs in Organization schema.
Source: `entity`

2. **Add lang="en" to html element**
Evidence: parse_html: lang=None on root element.
Fix: Add `<html lang="en">` (or set via Next.js root layout). Small addition, improves a11y + crawl signals.
Source: `onpage`

3. **Add Organization description to schema**
Evidence: entity schema has empty description field in Organization block.
Fix: Add `"description": "Strange Harvest is a 2025 horror mockumentary directed by Stuart Ortiz, streaming on Hulu."` to the Organization entity in layout.tsx JSON-LD.
Source: `schema`

4. **Change og:type from "website" to "video.movie"**
Evidence: social_meta: og:type=website.
Fix: Update og:type to `video.movie` in layout.tsx openGraph config for richer Facebook and social sharing.
Source: `onpage`

5. **Verify and fix Shopify merch link**
Evidence: broken_links: 2-hop redirect (301→302) to password-protected Shopify store.
Fix: If store is live, update URL to the direct canonical. If closed, replace with the DVD buy link or remove the cart link.
Source: `broken_links`

## Low

1. **Get Core Web Vitals data**
Evidence: pagespeed.py rate-limited — no LCP/INP/CLS data.
Fix: Run `python scripts/pagespeed.py https://strangeharvestmovie.com/ --strategy mobile --api-key YOUR_KEY` or check Google PageSpeed Insights directly.
Source: `pagespeed`

2. **Add llms-full.txt**
Evidence: llms_txt_checker: llms-full.txt not found.
Fix: Create /public/llms-full.txt with complete film synopsis, cast bios, and press quotes for deep AI crawler indexing.
Source: `llms_txt`
