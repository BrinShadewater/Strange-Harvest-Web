import type { MetadataRoute } from "next";

const BASE_URL = "https://strangeharvestmovie.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cookie-test.html", "/api/"],
    },
    sitemap: [
      BASE_URL + "/sitemap.xml",
      BASE_URL + "/image-sitemap.xml",
      BASE_URL + "/video-sitemap.xml",
    ],
    host: BASE_URL,
  };
}
