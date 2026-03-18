import type { Metadata } from "next";
import { cookies } from "next/headers";
import ClientPage from "@/components/ClientPage";

const BASE_URL = "https://strangeharvestmovie.com";

export const metadata: Metadata = {
  title: "Strange Harvest (2025) | Sitio Oficial de la Pelicula",
  description:
    "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el trailer, lee resenas y consulta donde ver la pelicula.",
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
    title: "Strange Harvest (2025) | Sitio Oficial de la Pelicula",
    description:
      "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el trailer, lee resenas y consulta donde ver la pelicula.",
    images: [
      {
        url: BASE_URL + "/images/strange-harvest-official-movie-poster-1280w.jpg",
        width: 1200,
        height: 630,
        alt: "Strange Harvest cartel oficial de la pelicula de terror",
      },
    ],
    siteName: "Strange Harvest Official",
  },
  twitter: {
    card: "summary_large_image",
    site: "@strangeharvestfilm",
    title: "Strange Harvest (2025) | Sitio Oficial de la Pelicula",
    description:
      "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el trailer, lee resenas y consulta donde ver la pelicula.",
  },
};

export default async function EsHomePage() {
  const cookieStore = await cookies();
  const abVariant = (cookieStore.get("sh_ab_theme_v1")?.value ?? "red") as "red" | "blue";
  return <ClientPage lang="es" abVariant={abVariant} />;
}
