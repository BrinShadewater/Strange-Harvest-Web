import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { PosterPreload } from "@/components/PosterPreload";
import "../../main.css";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-assistant",
  preload: true,
});

const BASE_URL = "https://strangeharvestmovie.com";

// Base metadata — the es/page.tsx overrides title, description, OG, Twitter, and alternates.
// This provides fallback robots/icons/manifest and the shared JSON-LD structured data.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  authors: [{ name: "Strange Harvest Film" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#0a0a0a",
    "article:published_time": "2025-01-01T00:00:00Z",
    "article:modified_time": "2026-03-18T00:00:00Z",
    "article:author": "Strange Harvest Film",
    "article:section": "Entertainment",
    "article:tag": "Horror",
    "video:release_date": "2025",
    "video:duration": "8040",
    "video:director": "https://www.imdb.com/name/nm3425513/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Movie",
      "@id": BASE_URL + "/#movie",
      name: "Strange Harvest",
      alternateName: [
        "Strange Harvest: Occult Murder In The Inland Empire",
        "Los asesinatos de Mr. Shiny",
      ],
      description:
        "A routine welfare check in the San Bernardino suburbs leads to a gruesome discovery. Detectives Joe Kirby and Lexi Taylor pursue a killer tied to a sinister symbol.",
      genre: ["Horror", "True Crime", "Found Footage", "Mockumentary"],
      contentRating: "R",
      datePublished: "2025-01-01T00:00:00+00:00",
      duration: "PT134M",
      director: {
        "@type": "Person",
        name: "Stuart Ortiz",
        url: "https://www.imdb.com/name/nm3425513/",
      },
      actor: [
        { "@type": "Person", name: "Peter Zizzo", url: "https://www.imdb.com/name/nm0970567/" },
        { "@type": "Person", name: "Terri Apple", url: "https://www.imdb.com/name/nm0032322/" },
      ],
      image: { "@id": BASE_URL + "/#poster-image" },
      trailer: { "@id": BASE_URL + "/#trailer-video" },
      url: BASE_URL + "/",
      sameAs: [
        "https://www.imdb.com/title/tt33400719/",
        "https://www.rottentomatoes.com/m/strange_harvest",
        "https://letterboxd.com/film/strange-harvest-2024/",
        "https://www.hulu.com/movie/strange-harvest-e931d642-fe34-4b92-b6da-96f4c7573fac",
      ],
      offers: [
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Subscription",
          name: "Stream on Hulu",
          url: "https://www.hulu.com/movie/strange-harvest-e931d642-fe34-4b92-b6da-96f4c7573fac",
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Rental",
          name: "Rent on Apple TV",
          url: "https://tv.apple.com/us/movie/strange-harvest/umc.cmc.4atgf8qjfghsw0w6ki9k7eqch",
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Rental",
          name: "Rent on Amazon Prime Video",
          url: "https://www.primevideo.com/detail/Strange-Harvest/0GOLHLOCIIRVMO44IB2E0LMNN2",
        },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": BASE_URL + "/#poster-image",
      contentUrl: BASE_URL + "/images/strange-harvest-official-movie-poster.webp",
      name: "Strange Harvest official movie poster",
      caption: "Official poster for the horror mockumentary Strange Harvest Occult Murder in the Inland Empire.",
      creditText: "Adorable Damage / Pathogen Pictures",
      creator: { "@type": "Organization", name: "Adorable Damage" },
      copyrightNotice: "© 2025 Strange Harvest. All rights reserved.",
      license: BASE_URL + "/press.html",
      acquireLicensePage: BASE_URL + "/press.html",
    },
    {
      "@type": "VideoObject",
      "@id": BASE_URL + "/#trailer-video",
      name: "Strange Harvest - Official Trailer",
      description: "Official trailer for Strange Harvest.",
      thumbnailUrl: BASE_URL + "/images/strange-harvest-official-movie-poster.webp",
      uploadDate: "2025-06-24T07:46:41-07:00",
      duration: "PT2M30S",
      contentUrl: "https://www.youtube.com/watch?v=tYyTpuk8Zuk",
      embedUrl: "https://www.youtube.com/embed/tYyTpuk8Zuk",
    },
    {
      "@type": "Organization",
      "@id": BASE_URL + "/#organization",
      name: "Strange Harvest Official Website",
      description: "Strange Harvest is a 2025 horror mockumentary directed by Stuart Ortiz, streaming on Hulu (US) and Paramount+ (Canada).",
      url: BASE_URL + "/",
      logo: BASE_URL + "/images/strange-harvest-occult-symbol-horror-icon.webp",
      sameAs: [
        "https://en.wikipedia.org/wiki/Strange_Harvest_(film)",
        "https://www.wikidata.org/wiki/Q130379751",
        "https://www.imdb.com/title/tt33400719/",
        "https://www.instagram.com/strangeharvestfilm",
        "https://www.facebook.com/strangeharvestfilm",
        "https://www.twitter.com/strangeharvestfilm",
      ],
    },
    {
      "@type": "WebSite",
      name: "Strange Harvest | Official Movie Website",
      url: BASE_URL + "/",
      publisher: { "@id": BASE_URL + "/#organization" },
    },
  ],
};

export default function EsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={assistant.variable}>
      <head>
        {/* DNS prefetch for streaming platforms */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.hulu.com" />
        <link rel="dns-prefetch" href="https://tv.apple.com" />
        <link rel="dns-prefetch" href="https://www.primevideo.com" />
        <link rel="dns-prefetch" href="https://strangeharvestmovie.myshopify.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="" />
        {/* Preload only the poster variant the user is assigned — saves ~200–350KB vs preloading both */}
        <PosterPreload />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
