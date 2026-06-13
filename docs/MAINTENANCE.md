# Maintenance

## Routine Checks

Run before shipping:

```shell
npm run build
```

Then review affected pages locally, especially mobile layouts and image-heavy sections.

## Content Freshness

Review these when release details change:

- Watch links and platform availability
- Press and reviews
- Merch links
- Cast/crew credits
- Trailer embeds
- Regional/geolocation behavior
- `public/llms.txt`
- Sitemap and robots outputs

## Image Handling

Use descriptive filenames that include the film name and subject. Prefer optimized WebP variants for production surfaces. Avoid adding giant originals to critical page paths without a clear reason.

## Metadata Handling

When a page's purpose changes, check:

- HTML title
- Meta description
- Open Graph title/description/image
- Twitter card image and copy
- Canonical URL
- Sitemap inclusion
- Structured data where present

## Deployment Notes

This repository includes both Vercel and Netlify-related configuration. Confirm the intended host before editing deployment-specific files.
