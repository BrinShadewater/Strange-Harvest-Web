import type { Metadata } from "next";
import { cookies } from "next/headers";
import ClientPage from "@/components/ClientPage";
import { getCountryFromHeaders } from "@/services/geoServer";

const BASE_URL = "https://strangeharvestmovie.com";

export const metadata: Metadata = {
  title: "Strange Harvest (2025) | Sitio Oficial de la Película",
  description:
    "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el tráiler, lee reseñas y consulta dónde ver la película.",
  alternates: {
    canonical: BASE_URL + "/es",
    languages: {
      en: BASE_URL + "/",
      es: BASE_URL + "/es",
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
        url: BASE_URL + "/images/strange-harvest-official-movie-poster-1280w.jpg",
        width: 1200,
        height: 630,
        alt: "Strange Harvest cartel oficial de la película de terror",
      },
    ],
    siteName: "Strange Harvest Official",
  },
  twitter: {
    card: "summary_large_image",
    site: "@strangeharvestfilm",
    title: "Strange Harvest (2025) | Sitio Oficial de la Película",
    description:
      "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el tráiler, lee reseñas y consulta dónde ver la película.",
  },
};

export default async function EsHomePage() {
  const cookieStore = await cookies();
  const abVariant = (cookieStore.get("sh_ab_theme_v1")?.value ?? "red") as "red" | "blue";
  const initialCountry = await getCountryFromHeaders();
  return <ClientPage lang="es" abVariant={abVariant} initialCountry={initialCountry} />;
}
