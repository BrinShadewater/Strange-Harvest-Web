import type { MetadataRoute } from "next";

const BASE_URL = "https://strangeharvestmovie.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cookie-test.html", "/api/"],
      },
      // AI crawlers — explicitly allowed for citation and AI search readiness
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
    ],
    sitemap: [
      BASE_URL + "/sitemap.xml",
      BASE_URL + "/image-sitemap.xml",
      BASE_URL + "/video-sitemap.xml",
    ],
    host: BASE_URL,
  };
}
