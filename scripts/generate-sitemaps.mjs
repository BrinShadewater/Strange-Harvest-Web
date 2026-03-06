import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

const toDate = (value) => new Date(value).toISOString().slice(0, 10);

const resolveLastMod = async (relativePath) => {
  const candidates = [path.join(ROOT, relativePath), path.join(PUBLIC_DIR, relativePath)];
  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) return toDate(stat.mtime);
    } catch {
      // Try next candidate.
    }
  }
  return toDate(Date.now());
};

const pageEntries = [
  {
    loc: "https://strangeharvestmovie.com/",
    file: "index.html",
    changefreq: "weekly",
    priority: "1.0",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/?lang=es",
    file: "index.html",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/press.html",
    file: "public/press.html",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/press.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/press.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/press.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/press.html?lang=es",
    file: "public/press.html",
    changefreq: "monthly",
    priority: "0.7",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/press.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/press.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/press.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/bts.html",
    file: "public/bts.html",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/bts.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/bts.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/bts.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/bts.html?lang=es",
    file: "public/bts.html",
    changefreq: "monthly",
    priority: "0.7",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/bts.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/bts.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/bts.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/transcript.html",
    file: "public/transcript.html",
    changefreq: "yearly",
    priority: "0.5",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/transcript.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/transcript.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/transcript.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/transcript.html?lang=es",
    file: "public/transcript.html",
    changefreq: "yearly",
    priority: "0.4",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/transcript.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/transcript.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/transcript.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/privacy.html",
    file: "public/privacy.html",
    changefreq: "yearly",
    priority: "0.3",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/privacy.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/privacy.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/privacy.html" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/privacy.html?lang=es",
    file: "public/privacy.html",
    changefreq: "yearly",
    priority: "0.2",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/privacy.html" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/privacy.html?lang=es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/privacy.html" },
    ],
  },
];

const xmlEsc = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const buildSitemapXml = (items) => {
  const rows = items
    .map((entry) => {
      const alternateRows = entry.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${xmlEsc(alt.hreflang)}" href="${xmlEsc(alt.href)}" />`
        )
        .join("\n");
      return `  <url>
    <loc>${xmlEsc(entry.loc)}</loc>
${alternateRows}
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${rows}
</urlset>
`;
};

const buildVideoSitemapXml = (lastModDate) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://strangeharvestmovie.com/</loc>
    <lastmod>${lastModDate}</lastmod>
    <video:video>
      <video:thumbnail_loc>https://strangeharvestmovie.com/images/strange-harvest-official-movie-poster.webp</video:thumbnail_loc>
      <video:title>Strange Harvest - Official Trailer</video:title>
      <video:description>Official trailer for Strange Harvest, the true-crime horror mockumentary.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=tYyTpuk8Zuk</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="ap=1">https://www.youtube.com/embed/tYyTpuk8Zuk</video:player_loc>
      <video:duration>150</video:duration>
      <video:publication_date>2025-06-24T07:46:41-07:00</video:publication_date>
      <video:family_friendly>no</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>
</urlset>
`;

const main = async () => {
  const withDates = await Promise.all(
    pageEntries.map(async (entry) => ({
      ...entry,
      lastmod: await resolveLastMod(entry.file),
    }))
  );
  const sitemapXml = buildSitemapXml(withDates);
  await fs.writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml, "utf8");

  const videoLastMod = await resolveLastMod("index.html");
  const videoSitemapXml = buildVideoSitemapXml(videoLastMod);
  await fs.writeFile(path.join(PUBLIC_DIR, "video-sitemap.xml"), videoSitemapXml, "utf8");
};

await main();
