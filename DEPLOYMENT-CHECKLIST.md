# Strange Harvest - Deployment Checklist

## Pre-Deployment Verification

### Build Status
- [x] Production build successful (996ms)
- [x] No TypeScript errors
- [x] Bundle sizes optimized:
  - Main JS: 31.33 KB (9.92 KB gzipped)
  - React vendor: 139.21 KB (44.97 KB gzipped)
  - CSS: 25.84 KB (5.64 KB gzipped)
  - index.html: 26.74 KB (4.98 KB gzipped)

### File Verification
- [ ] All files in `dist/` folder ready for deployment
- [ ] Static pages present: `press.html`, `privacy.html`
- [ ] Sitemaps present: `sitemap.xml`, `image-sitemap.xml`
- [ ] `robots.txt` configured correctly
- [ ] All images in `images/` folder using SEO-friendly names

### Environment Setup
- [ ] `.env` file configured (if using Shopify)
- [ ] Environment variables set on hosting platform
- [ ] Shopify domain and token configured (if applicable)

## Deployment Steps

### 1. Upload Files
- [ ] Upload entire `dist/` folder to web hosting
- [ ] Upload `public/press.html` to root
- [ ] Upload `public/privacy.html` to root
- [ ] Upload `public/sitemap.xml` to root
- [ ] Upload `public/image-sitemap.xml` to root
- [ ] Upload `public/robots.txt` to root
- [ ] Upload all `public/images/` to `/images/` directory
- [ ] Upload favicons to root

### 2. Verify Deployment
- [ ] Visit https://strangeharvestmovie.com and confirm site loads
- [ ] Test all navigation links work
- [ ] Check `/press.html` page loads correctly
- [ ] Check `/privacy.html` page loads correctly
- [ ] Verify YouTube trailer embeds play
- [ ] Test "Watch Now" platform links
- [ ] Verify DVD Amazon link works
- [ ] Test Shopify merch section (if configured)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

### 3. SEO Validation

#### Structured Data Testing
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Enter: https://strangeharvestmovie.com
  - Verify Movie, VideoObject, Person, Offer schemas detected
- [ ] Validate with [Schema Markup Validator](https://validator.schema.org/)
  - Check for any errors or warnings
- [ ] Verify all 16 Person schemas appear correctly
- [ ] Confirm Offer schemas for streaming platforms

#### Sitemap Submission
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add property: https://strangeharvestmovie.com
- [ ] Submit `sitemap.xml`
- [ ] Submit `image-sitemap.xml`
- [ ] Request indexing for main page
- [ ] Request indexing for `/press.html`
- [ ] Request indexing for `/privacy.html`

#### Meta Tag Verification
- [ ] Test Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - Scrape URL: https://strangeharvestmovie.com
  - Verify poster image appears (1200x630)
  - Check title: "Strange Harvest | True Crime Found Footage Horror Film"
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - Check image and description display correctly
- [ ] Verify canonical URLs are correct on all pages

### 4. Performance Testing
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
  - Desktop score: Target 90+
  - Mobile score: Target 85+
- [ ] Check Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- [ ] Verify images load with correct sizes
- [ ] Test hero poster loads with `fetchPriority="high"`

### 5. Accessibility Check
- [ ] Test with screen reader
- [ ] Verify all images have alt text
- [ ] Check keyboard navigation works
- [ ] Test focus states on interactive elements
- [ ] Verify color contrast meets WCAG AA standards

## Post-Deployment Tasks

### Monitoring (First 24 Hours)
- [ ] Monitor Google Search Console for crawl errors
- [ ] Check for any 404 errors
- [ ] Verify all external links work
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check for any console errors in browser

### Search Appearance (First Week)
- [ ] Search "Strange Harvest" on Google
  - Verify title appears as: "Strange Harvest | True Crime Found Footage Horror Film"
  - Check meta description displays correctly
  - Look for rich results (reviews, ratings, where to watch)
- [ ] Search "Strange Harvest movie" for rich results
- [ ] Search "where to watch Strange Harvest" for Offer schema results
- [ ] Check Google Images for movie poster and stills

### Social Media Verification
- [ ] Share on Facebook - verify Open Graph preview
- [ ] Share on Twitter/X - verify Twitter Card preview
- [ ] Post trailer link - confirm YouTube embed works

### Analytics Setup (Optional)
- [ ] Set up Google Analytics (if desired)
- [ ] Configure conversion tracking for streaming links
- [ ] Set up goals for trailer views
- [ ] Monitor merchandise clicks (if using Shopify)

## SEO Optimization Timeline

### Week 1
- [ ] Submit sitemaps
- [ ] Request indexing for all pages
- [ ] Monitor crawl status

### Week 2
- [ ] Check search appearance for branded queries
- [ ] Verify rich results appearing
- [ ] Monitor ranking for "Strange Harvest movie"

### Month 1
- [ ] Review Core Web Vitals data
- [ ] Check for featured snippets
- [ ] Monitor "where to watch" rich results
- [ ] Review click-through rates in Search Console

### Ongoing
- [ ] Update aggregate rating if review count changes
- [ ] Add new press quotes to structured data
- [ ] Keep streaming availability current
- [ ] Update sitemaps when content changes

## Troubleshooting

### If rich results don't appear:
1. Re-test with Google Rich Results Test
2. Fix any schema errors found
3. Request re-indexing in Search Console
4. Wait 2-4 weeks for Google to process

### If images don't load:
1. Check file paths are absolute: `/images/filename.webp`
2. Verify images uploaded to correct directory
3. Check case-sensitivity in filenames
4. Confirm MIME types configured on server

### If Shopify products don't load:
1. Check `.env` variables set correctly
2. Verify Shopify Storefront API token is valid
3. Check browser console for CORS errors
4. Confirm Shopify domain is correct

### If search results show old content:
1. Use Google Search Console "Request Indexing"
2. Clear cache in Search Console
3. Wait 24-48 hours for Google to recrawl
4. Verify canonical URLs are correct

## Final Verification Checklist

### Essential URLs Working
- [ ] https://strangeharvestmovie.com
- [ ] https://strangeharvestmovie.com/press.html
- [ ] https://strangeharvestmovie.com/privacy.html
- [ ] https://strangeharvestmovie.com/sitemap.xml
- [ ] https://strangeharvestmovie.com/image-sitemap.xml
- [ ] https://strangeharvestmovie.com/robots.txt

### All External Links Working
- [ ] Hulu streaming link
- [ ] Apple TV rental link
- [ ] Amazon Prime Video link
- [ ] YouTube trailer link
- [ ] IMDb page link
- [ ] Rotten Tomatoes link
- [ ] Social media links (Instagram, Facebook, Twitter, YouTube)

### Mobile Experience
- [ ] Header stays fixed on scroll
- [ ] All buttons are 44px+ touch targets
- [ ] Text is readable without zooming
- [ ] Images scale properly
- [ ] Video embeds work on mobile

## Success Metrics

### Immediate (Day 1)
- ✅ Site loads without errors
- ✅ All pages accessible
- ✅ Structured data validates

### Short-term (Week 1)
- Search results show clean title
- Site indexed by Google
- Core Web Vitals pass

### Medium-term (Month 1)
- Rich results appear for branded searches
- "Where to watch" cards show up
- Press reviews appear in search
- Traffic from organic search

### Long-term (3+ Months)
- High rankings for "Strange Harvest movie"
- Featured snippets for key queries
- Strong Core Web Vitals scores
- Increased direct traffic

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Hosting Platform:** _____________

**Notes:**
