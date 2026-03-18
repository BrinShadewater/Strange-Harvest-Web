import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../main.css";

const BASE_URL = "https://strangeharvestmovie.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Strange Harvest (2025) | Official Movie Website",
  description:
    "Strange Harvest (2025) is a horror mockumentary streaming on Hulu. Watch the trailer, read reviews, and explore the Mr. Shiny story on the official site.",
  keywords: [
    "Strange Harvest",
    "Los asesinatos de Mr. Shiny",
    "horror movie",
    "true crime",
    "found footage",
    "mockumentary",
    "Stuart Ortiz",
    "Mr. Shiny",
    "Mr Shiny serial killer",
    "ritualistic murders",
    "streaming horror",
    "Hulu horror",
  ],
  authors: [{ name: "Strange Harvest Film" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: {
    canonical: BASE_URL + "/",
    languages: {
      en: BASE_URL + "/",
      "en-US": BASE_URL + "/",
      "en-GB": BASE_URL + "/",
      es: BASE_URL + "/es",
      "es-ES": BASE_URL + "/es",
      "x-default": BASE_URL + "/",
    },
  },
  openGraph: {
    type: "video.movie",
    locale: "en_US",
    url: BASE_URL + "/",
    title: "Strange Harvest (2025) | Official Movie Website",
    description:
      "Strange Harvest (2025) is a horror mockumentary streaming on Hulu. Watch the trailer, read reviews, and explore the Mr. Shiny story on the official site.",
    images: [
      {
        url: BASE_URL + "/images/strange-harvest-official-movie-poster.webp",
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Strange Harvest movie poster featuring dark horror imagery",
        secureUrl: BASE_URL + "/images/strange-harvest-official-movie-poster.webp",
      },
    ],
    siteName: "Strange Harvest Official",
  },
  twitter: {
    card: "summary_large_image",
    site: "@strangeharvestfilm",
    creator: "@strangeharvestfilm",
    title: "Strange Harvest (2025) | Official Movie Website",
    description:
      "Strange Harvest (2025) is a horror mockumentary streaming on Hulu. Watch the trailer, read reviews, and explore the Mr. Shiny story on the official site.",
    images: {
      url: BASE_URL + "/images/strange-harvest-official-movie-poster.webp",
      alt: "Strange Harvest movie poster featuring dark horror imagery",
    },
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
    // Article meta for reader-mode optimization
    "article:published_time": "2025-01-01T00:00:00Z",
    "article:modified_time": "2026-03-06T00:00:00Z",
    "article:author": "Strange Harvest Film",
    "article:section": "Entertainment",
    "article:tag": "Horror",
    // Video meta
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "About", item: BASE_URL + "/#about" },
        { "@type": "ListItem", position: 3, name: "Watch", item: BASE_URL + "/#watch" },
        { "@type": "ListItem", position: 4, name: "Press", item: BASE_URL + "/press.html" },
        { "@type": "ListItem", position: 5, name: "BTS", item: BASE_URL + "/bts.html" },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded at runtime, not build time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&display=swap"
        />
        {/* DNS prefetch for streaming platforms */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.hulu.com" />
        <link rel="dns-prefetch" href="https://tv.apple.com" />
        <link rel="dns-prefetch" href="https://www.primevideo.com" />
        <link rel="dns-prefetch" href="https://strangeharvestmovie.myshopify.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="" />
        {/* Preload hero image */}
        <link
          rel="preload"
          href="/images/strange-harvest-official-movie-poster.webp"
          as="image"
          type="image/webp"
          // @ts-expect-error imagesrcset is valid HTML but not in React types
          imagesrcset="/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w, /images/strange-harvest-official-movie-poster-1280w.webp 1280w"
          imagesizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px"
        />
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
