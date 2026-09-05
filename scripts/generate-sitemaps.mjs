/**
 * generate-sitemaps — writes public/sitemap.xml and public/video-sitemap.xml.
 * (public/image-sitemap.xml is hand-maintained and not touched here.)
 *
 * Runs on `prebuild`, so `npm run build` always ships current sitemaps. Running
 * `next build` directly skips it — use the npm script.
 *
 * Its outputs are COMMITTED, deliberately, decided 2026-08-02:
 *
 *  - public/sitemap.xml is a static file and therefore SHADOWS any /sitemap.xml
 *    route. Do not reintroduce a sitemap route — with this file present it will
 *    look authoritative and never serve.
 *
 *    Careful with that claim, though: src/app/sitemap.ts was NOT dead code in
 *    production. public/sitemap.xml had never been committed, so production
 *    served the route (5 URLs, hardcoded lastmod 2026-03-06) while local disk
 *    served the static file. Checking one and generalising to the other is how
 *    that got missed; the 2026-08-02 SEO audit caught it.
 *  - Committing them keeps deploys deterministic: robots.txt advertises all
 *    three sitemaps, so a build that somehow skipped this script would still
 *    serve the last known-good files rather than 404.
 *  - It costs no git noise. lastmod comes from git history, not the clock or
 *    file mtimes, so the output is byte-identical across repeat builds AND
 *    across clones. (mtimes were the first attempt; a fresh checkout stamps
 *    every file with the clone time, so each Vercel build shipped "everything
 *    changed today". Caught in the 2026-09-04 review.)
 *
 * If you change page structure, run `npm run sitemaps` and commit the result.
 */

import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

const toDate = (value) => new Date(value).toISOString().slice(0, 10);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

const git = (...args) => {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null; // no git on PATH, no .git directory, or the path is unknown to git
  }
};

// Vercel builds from a shallow clone (depth 10 on 2026-09-04). In one, `git log -1 --
// file` for a file untouched within the depth returns the boundary commit, whose date
// is whatever happened to be at the edge of the clone, not when the file changed.
// Production shipped 2026-08-15 for five pages that last changed on 08-09 and 08-13.
// The shallow file lists those boundary commits; a date from one is not evidence.
const shallowBoundary = async () => {
  if (git("rev-parse", "--is-shallow-repository") !== "true") return new Set();
  const shallowFile = git("rev-parse", "--git-path", "shallow");
  try {
    const listed = await fs.readFile(path.resolve(ROOT, shallowFile ?? ""), "utf8");
    return new Set(listed.split(/\r?\n/).filter(Boolean));
  } catch {
    return new Set();
  }
};

// The committed sitemap's own <lastmod> per <loc>: the fallback when git cannot
// answer (no .git directory, or a shallow clone whose history stops before the
// last change). Better the last known-good date than the build clock.
const previousLastMods = async (fileName) => {
  const map = new Map();
  try {
    const xml = await fs.readFile(path.join(PUBLIC_DIR, fileName), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g)) {
      map.set(m[1], m[2]);
    }
  } catch {
    // First run, or the file is gone: nothing to fall back to.
  }
  return map;
};

// lastmod sources must be files that still exist and still represent the page.
// The home-page entries used to stat the root index.html, a Vite-era leftover that
// Next never served; when it went, this would have silently fallen back to the
// build date for every home-page lastmod.
//
// Order: an uncommitted edit to the file means it changes today; otherwise the
// date of the last commit that touched it, unless that commit is a shallow-clone
// boundary; otherwise the committed sitemap's value; and only then the clock.
const resolveLastMod = async (relativePath, previous, boundary) => {
  const dirty = git("status", "--porcelain", "--", relativePath);
  if (dirty) return toDate(Date.now());
  const committed = git("log", "-1", "--format=%cs %H", "--", relativePath);
  if (committed) {
    const [date, sha] = committed.split(" ");
    if (ISO_DAY.test(date) && !boundary.has(sha)) return date;
  }
  if (previous && ISO_DAY.test(previous)) return previous;
  return toDate(Date.now());
};

// Only canonical URLs get a <loc>. The ?lang=es variants of press/bts/transcript/
// privacy all return 200 but self-canonicalise to their non-query version, so
// listing them as separate <loc> entries contradicts their own canonical tag and
// spends crawl budget on duplicates. They stay as hreflang alternates below,
// which is the correct way to express them. (SEO audit 2026-08-02.)
const pageEntries = [
  {
    loc: "https://strangeharvestmovie.com/",
    file: "src/app/(en)/page.tsx",
    changefreq: "weekly",
    priority: "1.0",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/es" },
      { hreflang: "x-default", href: "https://strangeharvestmovie.com/" },
    ],
  },
  {
    loc: "https://strangeharvestmovie.com/es",
    file: "src/app/(es)/es/page.tsx",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { hreflang: "en", href: "https://strangeharvestmovie.com/" },
      { hreflang: "es", href: "https://strangeharvestmovie.com/es" },
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
  const boundary = await shallowBoundary();
  const previous = await previousLastMods("sitemap.xml");
  const withDates = await Promise.all(
    pageEntries.map(async (entry) => ({
      ...entry,
      lastmod: await resolveLastMod(entry.file, previous.get(entry.loc), boundary),
    }))
  );
  const sitemapXml = buildSitemapXml(withDates);
  await fs.writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml, "utf8");

  const previousVideo = await previousLastMods("video-sitemap.xml");
  const videoLastMod = await resolveLastMod(
    "src/app/(en)/page.tsx",
    previousVideo.get("https://strangeharvestmovie.com/"),
    boundary
  );
  const videoSitemapXml = buildVideoSitemapXml(videoLastMod);
  await fs.writeFile(path.join(PUBLIC_DIR, "video-sitemap.xml"), videoSitemapXml, "utf8");
};

await main();
