import type { MetadataRoute } from "next";

const BASE_URL = "https://strangeharvestmovie.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-03-06"); // Last updated: BTS + press.html polish pass

  return [
    {
      url: BASE_URL + "/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: BASE_URL + "/",
          es: BASE_URL + "/es",
        },
      },
    },
    {
      url: BASE_URL + "/es",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: BASE_URL + "/",
          es: BASE_URL + "/es",
        },
      },
    },
    {
      url: BASE_URL + "/press.html",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/bts.html",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/privacy.html",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
