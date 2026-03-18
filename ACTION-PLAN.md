# ACTION-PLAN

- URL: `https://strangeharvestmovie.com/`
- Generated: `2026-03-16T12:30:21.965402`

## Image Remediation Workflow
- Preview the generated handoff with `python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py seo-handoff "C:\Users\Alex\Desktop\Projects\Claude\Projects\Strange Harvest Web\seo-image-handoff.json" --dry-run --json seo-image-apply-report.json`
- Apply it with `python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py seo-handoff "C:\Users\Alex\Desktop\Projects\Claude\Projects\Strange Harvest Web\seo-image-handoff.json" --yes --overwrite --json seo-image-apply-report.json`

## Critical
- No actions queued.


## High
1. Meta description length is out of range
Evidence: Current meta description length is 178 characters.
Fix: Rewrite the meta description so it is concise, descriptive, and closer to 150-160 characters.
Source: `onpage`

2. Some page images are missing alt text
Evidence: 2 image(s) have empty or missing alt attributes.
Fix: Add descriptive alt text or use empty alt only for decorative images.
Source: `onpage`

3. Some page images are missing dimensions
Evidence: 25 image(s) are missing width and/or height attributes.
Fix: Add width and height attributes or an equivalent reserved aspect ratio to reduce CLS.
Source: `onpage`

4. Broken links were detected
Evidence: 2 broken link(s) were found during the crawl.
Fix: Repair, redirect, or remove the broken links starting with internal navigation and high-value pages.
Source: `broken_links`

5. Potential orphan pages were detected
Evidence: 1 page(s) appear to have weak internal linking.
Fix: Add contextual internal links from relevant hub or supporting pages.
Source: `internal_links`

6. Readability is difficult
Evidence: Flesch Reading Ease is 34.5; average sentence length is 18.9.
Fix: Shorten sentences and paragraphs and introduce clearer subheadings.
Source: `readability`

## Medium
1. Below-the-fold images are missing lazy loading
Evidence: 17 non-primary image(s) are missing loading="lazy".
Fix: Add loading="lazy" to non-LCP images.
Source: `onpage`

2. Some page images still use PNG or JPEG
Evidence: 1 image(s) could move to WebP or AVIF.
Fix: Convert suitable PNG/JPEG assets to next-gen formats and add responsive variants where useful.
Source: `onpage`

3. llms.txt is missing
Evidence: No llms.txt file was detected.
Fix: Add llms.txt with a concise site summary and key URLs for AI crawlers.
Source: `llms_txt`

4. Entity SEO signals are incomplete
Evidence: 5 entity issue(s) were reported.
Fix: Strengthen sameAs links and external knowledge-graph signals where relevant.
Source: `entity`

## Low
- No actions queued.

