import type { Metadata } from "next";
import ClientPage from "@/components/ClientPage";
import { getCountryFromHeaders } from "@/services/geoServer";
import { resolvePosterVariant } from "@/services/posterVariant";

const BASE_URL = "https://strangeharvestmovie.com";

export const metadata: Metadata = {
  title: "Strange Harvest (2025) | Sitio Oficial de la Película",
  description:
    "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el tráiler, lee reseñas y consulta dónde ver la película.",
  alternates: {
    canonical: BASE_URL + "/es",
    // Must mirror (en)/layout.tsx exactly: hreflang pairs are ignored unless both
    // pages declare the same set.
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
    locale: "es_ES",
    url: BASE_URL + "/es",
    title: "Strange Harvest (2025) | Sitio Oficial de la Película",
    description:
      "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el tráiler, lee reseñas y consulta dónde ver la película.",
    images: [
      {
        // Same optimized OG derivative the EN page uses (~160KB vs the 2.2MB
        // print JPG this pointed at before), with its real dimensions.
        url: BASE_URL + "/images/strange-harvest-official-movie-poster-og.jpg",
        width: 1200,
        height: 1600,
        alt: "Strange Harvest cartel oficial de la película de terror",
      },
    ],
    siteName: "Strange Harvest Official",
  },
  twitter: {
    card: "summary_large_image",
    // See (en)/layout.tsx — @strangeharvestfilm is the old account and 404s.
    site: "@Strange_Harvest",
    title: "Strange Harvest (2025) | Sitio Oficial de la Película",
    description:
      "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el tráiler, lee reseñas y consulta dónde ver la película.",
  },
};

export default async function EsHomePage() {
  // An explicit toggle choice wins over the A/B assignment — see posterVariant.ts.
  const { variant } = await resolvePosterVariant();
  const initialCountry = await getCountryFromHeaders();
  return <ClientPage lang="es" abVariant={variant} initialCountry={initialCountry} />;
}
