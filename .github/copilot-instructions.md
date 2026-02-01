# AI Coding Agent Instructions for Strange Harvest Web

## Project Overview
**Strange Harvest** is a Vite + React + TypeScript promotional website for a horror film using a centralized content management pattern with a single-page composition architecture. The site features a dark horror aesthetic with blood-red accents and a true-crime documentary style.

## Architecture & Data Flow

### Entry Point Chain
`index.html` → `main.tsx` → `App.tsx` → `src/Page.tsx` → Section Components

### Content Management Pattern
All site copy lives in `src/components/sitecopy.ts` as a single exportable object. Components import and destructure the content they need:

```tsx
import { sitecopy } from "./sitecopy";

export default function Hero() {
  const { hero } = sitecopy;
  return <h1>{hero.title}</h1>;
}
```

**Critical**: When adding new content sections, update `sitecopy.ts` first, then have components pull from it. Content is typed but not validated at runtime.

### Complete Component Structure
Components live in `src/components/` and are rendered in this exact sequence by `src/Page.tsx`:

```tsx
<Header />
<Hero />
<SymbolDivider />
<Synopsis />
<SymbolDivider />
<Trailer />
<SymbolDivider />
<Watch />
<SymbolDivider />
<HomeVideo />
<SymbolDivider />
<Merch />
<SymbolDivider />
<Press />
<SymbolDivider />
<CastCrew />
<Footer />
<CookieConsent /> // Rendered conditionally at bottom
```

#### Component Types

**Layout Components:**
- `Header.tsx` - Fixed navigation (position: fixed) with brand logo, nav links, and cart icon - stays at top on scroll
- `Footer.tsx` - Site footer with social links and copyright
- `SymbolDivider.tsx` - Visual separator using horror symbol image

**Content Sections:**
- `Hero.tsx` - Movie poster + title + CTAs in two-column grid (poster has fetchPriority="high")
- `Synopsis.tsx` - Plot summary with detective names highlighted, quote block, image grid, and stats (uses <article> tag for reader mode)
- `Trailer.tsx` - YouTube embed wrapper (lazy loaded iframe)
- `Watch.tsx` - Streaming and rental platform cards with icons
- `HomeVideo.tsx` - DVD product card with Amazon link
- `Merch.tsx` - Shopify product grid (dynamic, fetches from API)
- `Press.tsx` - Press icons + carousel of 28 review quotes (8-second rotation) with decorative SVG quotation marks
- `CastCrew.tsx` - Lead detectives, full cast grid, crew sections

**Utility Components:**
- `CookieConsent.tsx` - GDPR-style banner (localStorage-based, shows once)

**Each content section component:**
- Is a default export stateless functional component
- Pulls content from `sitecopy.ts`
- Uses semantic HTML (`<section>`, `<header>`, `<footer>`)
- Has an `id` attribute matching anchor hrefs (`#watch`, `#shop`, `#about`, etc.)
- Includes `scroll-margin-top: 90px` CSS for fixed header offset

## Styling System

### Dual CSS Architecture

1. **theme.css** - Design tokens (CSS custom properties in `:root`)
   - **HSL color tokens**: `--background: 0 0% 4%`, `--primary: 0 65% 45%` (blood red), `--accent: 45 70% 50%`, `--muted: 0 0% 12%`
   - **Font families**: `--font-display` (Cinzel serif for headings), `--font-body` (Crimson Text serif for body)
   - **Other tokens**: `--radius: 0.5rem` for border-radius
   - **Usage**: `hsl(var(--background))`, `var(--font-display)`
   - **Dark mode only**: `color-scheme: dark` is enforced

2. **main.css** - Layout, typography, component-specific styles
   - Global resets and base typography
   - **Component class naming**: `.hero`, `.watchGrid`, `.ctaRow`, `.merchCard`, etc.
   - **Utility patterns**: `.cta` for call-to-action buttons, `.button` for form buttons
   - **Hover states**: Typically `transform: translateY(-2px)` with red border accent
   - **Atmospheric effects**: Radial gradients, film grain overlay, vignette

**Fonts**: Google Fonts preloaded in `index.html` for performance:
- Cinzel (display, 400/600/700 weights) - Used for titles, headings, brand
- Crimson Text (body, 400/600/700 weights) - Used for body text, paragraphs

### Dark Horror Theme
- **Background**: Nearly black (`#0a0a0a`) with subtle radial gradient overlays
- **Primary accent**: Blood red (`hsl(0, 65%, 45%)`) for CTAs, highlights, hover states
- **Typography**: High contrast white/off-white text on dark background
- **Cards**: Subtle translucent backgrounds (`rgba(255,255,255,0.04)`) with thin borders
- **Effects**: Red glow on poster images, film grain texture, atmospheric spotlights

## External Integrations

### Shopify Integration
The `Merch` component dynamically fetches products from Shopify Storefront API:

**Setup:**
1. Create `.env` file in project root (see `.env.example`)
2. Add Shopify credentials:
   ```
   VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
   ```
3. Service file: `src/services/shopify.ts` handles GraphQL queries
4. Types: `ShopifyProduct`, `ShopifyProductsResponse`
5. Functions: `getProducts()`, `getCheckoutUrl()`, `formatPrice()`

**Fallback behavior**: If credentials are missing, shows "Coming Soon" message with Shopify notification signup link.

### Third-Party Embeds
- **YouTube**: Trailer iframe embed (16:9 responsive wrapper)
- **Platform links**: External links to Hulu, Apple TV, Prime Video, etc.
- All external links use `target="_blank"` and `rel="noreferrer"` or `rel="noopener noreferrer"`

## Development Workflow

### Build Commands
```bash
npm run dev      # Start dev server on port 5173 (hot reload enabled)
npm run build    # TypeScript compile + Vite production build → dist/
npm run preview  # Preview production build locally
```

### Environment Variables
- Create `.env` file for local development (never commit this)
- Reference `.env.example` for required variables
- Access via `import.meta.env.VITE_*` in TypeScript

### Adding New Content Sections
1. **Update sitecopy.ts**: Add content object with appropriate structure
   ```tsx
   export const sitecopy = {
     // ... existing sections
     yourSection: {
       title: "Your Title",
       content: "Your content here",
     }
   };
   ```

2. **Create component**: `src/components/YourSection.tsx`
   ```tsx
   import { sitecopy } from "./sitecopy";

   export default function YourSection() {
     const { yourSection } = sitecopy;
     return (
       <section className="yourSection" id="your-section">
         <h2>{yourSection.title}</h2>
         <p>{yourSection.content}</p>
       </section>
     );
   }
   ```

3. **Import in Page.tsx**: Add between appropriate `<SymbolDivider />` tags
   ```tsx
   import YourSection from "./components/YourSection";
   // In return:
   <SymbolDivider />
   <YourSection />
   <SymbolDivider />
   ```

4. **Add styles to main.css**: Use component class name
   ```css
   .yourSection {
     text-align: center;
     padding: 64px 0;
   }
   ```

### Asset Management
**Location**: All assets in `public/` (accessible as `/path/to/asset`)

**Image conventions**:
- All images use SEO-friendly naming: `strange-harvest-[context]-[description].webp`
- Examples: `strange-harvest-movie-poster-official.webp`, `strange-harvest-watch-hulu-icon.webp`
- SVG assets in `/images/` (e.g., `quote-marks.svg` for press section)

**Image formats**:
- **Preferred**: WebP for best compression/quality ratio
- Always include `alt` text for accessibility
- Use `loading="lazy"` for below-fold images
- Use `loading="eager"` and `fetchPriority="high"` with `width`/`height` for hero poster (LCP optimization)

**Icon organization**:
- Platform icons in `/images/` root
- SVG icons in `/images/svgcons/` (used sparingly)

## Critical Patterns

### Import Paths
- **Within components**: Relative paths `"./ComponentName"` or `"./sitecopy"`
- **In Page.tsx**: `"./components/ComponentName"`
- **Services**: `"../services/shopify"` from components
- **No barrel exports** or path aliases configured (all imports explicit)

### Content Structure in sitecopy.ts
Common patterns by section type:

**Text-heavy sections**:
```tsx
title: string
body: string | string[]  // Array for multi-paragraph
```

**Platform/link sections**:
```tsx
platforms: Array<{
  name: string
  href: string
  icon: string
}>
```

**Review/testimonial sections**:
```tsx
quotes: Array<{
  quote: string
  source: string
  href: string
}>
```

**Nested objects** for complex sections (e.g., `castCrew` has `leadDetectives`, `cast`, `crew`)

### Anchor Navigation
- All major sections have `id` attributes: `#top`, `#about`, `#trailer`, `#watch`, `#shop`, `#press`, `#cast`
- Header nav links use `href="#id"` for smooth scroll
- CSS: `scroll-margin-top: 90px` accounts for fixed header height
- Hero CTAs link to downstream sections (`#trailer`, `#watch`, `#shop`)

### State Management
- **No global state library** (no Redux, Zustand, etc.)
- Local state only where needed:
  - `Press.tsx` - Carousel index state (8-second rotation with useMemo optimization)
  - `Merch.tsx` - Loading state, products array
  - `CookieConsent.tsx` - Visibility state + localStorage
- All content is static from `sitecopy.ts` (no API calls except Shopify)
  - `Merch.tsx` - Loading state, products array
  - `CookieConsent.tsx` - Visibility state + localStorage
- All content is static from `sitecopy.ts` (no API calls except Shopify)

### Accessibility
- **Skip link**: `<a href="#main" class="skip-link">` in Header (visually hidden until focused)
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- **ARIA labels**: Buttons and links have appropriate labels
- **Focus states**: All interactive elements have visible focus states
- **Alt text**: All images have descriptive alt attributes
- **Color contrast**: High contrast white on dark meets WCAG AA standards

## SEO & Meta Tags

### Meta Tag Structure (in index.html)
- **Title**: Clean format - `Strange Harvest | True Crime Found Footage Horror Film` (no keyword stuffing)
- **Basic SEO**: Description, keywords, author, robots directive with `max-image-preview:large, max-snippet:-1`
- **Security Headers**: Referrer policy, X-Content-Type-Options, Permissions-Policy
- **Open Graph**: Full OG tags with image dimensions for Facebook/social sharing
- **Twitter Card**: Summary large image card with complete metadata
- **JSON-LD Structured Data**:
  - **Movie** schema with director, cast, aggregateRating, sameAs links
  - **VideoObject** schema with actual YouTube trailer ID: `tYyTpuk8Zuk`
  - **Organization** schema with social media links
  - **Person** schemas for 16 cast & crew members (Peter Zizzo, Terri Apple, Andy Lauer, Matthew Peschio, Janna Cardia, Travis T. Wolfe Sr., Christina Hélène Braa, Roy Abramsohn, Jesse Clarkson, Dawsyn Eubanks, Tim Shelburne, Matthew M Garcia, Ross Turner, David Hemphill, Stuart Ortiz)
  - **Offer** schemas for streaming/rental (Hulu subscription, Apple TV, Amazon Prime Video, Fandango at Home, YouTube Movies)
  - **Review** schemas (11 total from major outlets)
  - **BreadcrumbList** for navigation structure
  - **FAQPage** with 7 common questions
  - **WebSite** with search action
- **Canonical URL**: `https://strangeharvestmovie.com/`
- **Sitemap**: `/sitemap.xml` (updated dates to signal fresh content)
- **Image Sitemap**: `/image-sitemap.xml` for Google Image Search optimization
- **Robots**: `/robots.txt` (allows all crawlers, references both sitemaps)
- **Hreflang**: Language/regional targeting (en, en-US, en-GB, x-default)
- **Reader Mode**: article:* meta properties for Safari/Firefox reader mode

### Performance Optimizations
- **Preload critical assets**: Hero poster image, Google Fonts CSS
- **DNS prefetch**: External domains (YouTube, streaming platforms, Shopify)
- **Lazy loading**: All images except hero poster
- **Resource hints**: `preconnect` for YouTube
- **Build optimization**: Terser minification, CSS minification, code splitting (react-vendor chunk)
- **React optimization**: useMemo in Press component for carousel

## Common Tasks

### Updating Platform Links
1. Edit `sitecopy.ts` → `watch.streamingPlatforms`, `watch.usca`, or `watch.intl`
2. Add icon to `/public/images/` if new platform
3. No component changes needed (Watch.tsx maps over arrays)

### Updating Press Reviews
1. Edit `sitecopy.ts` → `press.quotes` array
2. Add new quote object with `quote`, `source`, `href`
3. Press carousel automatically includes new reviews

### Changing Theme Colors
1. Edit `src/theme.css` → `:root` variables
2. HSL format: `--primary: 0 65% 45%` (hue, saturation, lightness)
3. Usage in CSS: `hsl(var(--primary))` or `hsl(var(--primary) / 0.5)` for opacity

### Troubleshooting

**Shopify products not loading**:
- Check `.env` file exists with correct credentials
- Console will show warnings if credentials missing
- Fallback "Coming Soon" should display

**YouTube embed not showing**:
- Check iframe `src` URL is correct
- Ensure `allow` attribute includes required permissions
- Check for browser content blockers

**Anchor links not scrolling smoothly**:
- Verify target section has matching `id` attribute
- Check `scroll-margin-top` CSS is applied
- CSS smooth scroll: `html { scroll-behavior: smooth; }`

**Images not loading**:
- Verify image path starts with `/` (e.g., `/images/still-poster.webp`)
- Check file exists in `public/images/` directory
- Case-sensitive paths (match exact filename)

## External Dependencies
- **React 18.2** with React DOM (no class components, all functional)
- **Vite 7.3** as build tool with `@vitejs/plugin-react`
- **TypeScript 5.3** with strict mode enabled
- **No state management library** - all content static from sitecopy.ts
- **No routing library** - single page with anchor navigation only
- **No CSS framework** - custom CSS with CSS variables

## Project Structure
```
/
├── index.html                # Entry HTML with meta tags, fonts
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config (strict mode)
├── .env.example              # Shopify credentials template
├── .gitignore                # Git ignore (includes .env)
│
├── public/
│   ├── images/               # All image assets (webp preferred)
│   │   └── svgcons/          # SVG icons
│   ├── sitemap.xml           # SEO sitemap
│   ├── image-sitemap.xml     # Image SEO sitemap
│   ├── robots.txt            # Crawler directives
│   ├── press.html            # Press kit page (fully optimized with structured data)
│   ├── privacy.html          # Privacy policy page
│   ├── site.webmanifest      # PWA manifest
│   └── favicon-*.png         # Favicons
│
└── src/
    ├── main.tsx              # React DOM render entry
    ├── App.tsx               # Root component (Page + CookieConsent)
    ├── Page.tsx              # Main page composition
    ├── theme.css             # Design tokens (CSS variables)
    ├── main.css              # Component styles, layout, typography
    ├── vite-env.d.ts         # Vite + custom env type definitions
    │
    ├── components/
    │   ├── sitecopy.ts       # ⭐ CENTRAL CONTENT SOURCE
    │   ├── Header.tsx
    │   ├── Hero.tsx
    │   ├── Synopsis.tsx
    │   ├── Trailer.tsx
    │   ├── Watch.tsx
    │   ├── HomeVideo.tsx
    │   ├── Merch.tsx
    │   ├── Press.tsx
    │   ├── CastCrew.tsx
    │   ├── Footer.tsx
    │   ├── SymbolDivider.tsx
    │   └── CookieConsent.tsx
    │
    └── services/
        └── shopify.ts        # Shopify Storefront API integration
```

## Best Practices

### When Making Changes
1. **Content changes**: Always update `sitecopy.ts` first
2. **Style changes**: Use existing CSS variables when possible
3. **New components**: Follow established patterns (functional, default export, sitecopy import)
4. **External links**: Always use `target="_blank"` with `rel="noreferrer"`
5. **Images**: Use WebP format, include alt text, lazy load when appropriate
6. **Accessibility**: Maintain semantic HTML, ARIA labels, keyboard navigation
7. **Performance**: Minimize external dependencies, optimize images, lazy load

### Code Style
- **TypeScript**: Interfaces for complex types, type inference where possible
- **React**: Functional components only, hooks where needed
- **CSS**: Class-based styling, no inline styles except dynamic values
- **Naming**: Descriptive, consistent (camelCase for JS/TS, kebab-case for CSS classes)
- **Comments**: Minimal in code (self-documenting), detailed in this file

---

**Last Updated**: February 1, 2026

**Recent Updates**:
- Added comprehensive Person schemas for all 16 cast & crew members
- Added Offer schemas for streaming/rental platforms ("Where to watch" rich results)
- Fixed YouTube trailer ID in VideoObject schema (tYyTpuk8Zuk)
- Updated title format to cleaner style: `Strange Harvest | True Crime Found Footage Horror Film`
- Added robots directive meta tag: `index, follow, max-image-preview:large, max-snippet:-1`
- Fully optimized press.html page with structured data, security headers, and enhanced SEO
- Added 20 additional press quotes (28 total in carousel)
- Fixed header to position: fixed for proper scroll behavior
- Added SVG quotation marks to press review cards
- Optimized build with terser minification and code splitting
- All images renamed with SEO-friendly naming convention
- Added comprehensive structured data and image sitemap
