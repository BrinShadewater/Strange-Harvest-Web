/**
 * sync-css — copy src/main.css to public/styles/main.css.
 *
 * Why this exists: the full stylesheet is deliberately NOT imported by Next.js.
 * <DeferredCSS /> injects a <link> to /styles/main.css after first paint so the
 * stylesheet never shows up as a render-blocking resource. That means the served
 * file lives in /public and nothing in the bundler connects it to src/main.css.
 *
 * Without this script the two files drift silently: on 2026-07-31 the served copy
 * was 11 weeks stale and still animated `width` on .navToggleBar, re-introducing
 * layout thrash over the correct rule in critical.css. Edits to src/main.css had
 * simply never shipped.
 *
 * src/main.css is the source of truth. Never hand-edit public/styles/main.css.
 *
 * Caching (vercel.json, `/styles/(.*)`): measured 2026-08-13, this file was being
 * served `max-age=0, must-revalidate` because vercel.json had a rule for /images/
 * but none for /styles/. Since DeferredCSS injects it AFTER first paint, every
 * repeat visit paid a revalidation round-trip before the page was styled.
 *
 * It is now `max-age=300, stale-while-revalidate=86400` and deliberately NOT
 * `immutable`: the filename is not content-hashed, so a long immutable TTL would
 * pin a stale stylesheet in returning visitors' caches — the same failure mode as
 * the 11-week drift described above, but unfixable by a redeploy. Content-hash the
 * output first if you want `immutable`.
 *
 * Usage:
 *   node scripts/sync-css.mjs           write public/styles/main.css
 *   node scripts/sync-css.mjs --check   exit 1 if out of date (CI guard)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(root, "src/main.css");
const TARGET = resolve(root, "public/styles/main.css");

const BANNER = `/* GENERATED FILE — do not edit.
 * Source: src/main.css · regenerate with \`npm run sync:css\`
 * Served directly from /public and injected by <DeferredCSS /> after first paint.
 */
`;

const check = process.argv.includes("--check");

if (!existsSync(SOURCE)) {
  console.error(`sync-css: missing source ${SOURCE}`);
  process.exit(1);
}

// Normalise CRLF so the two files compare cleanly across platforms.
const expected = BANNER + readFileSync(SOURCE, "utf8").replace(/\r\n/g, "\n");
const actual = existsSync(TARGET) ? readFileSync(TARGET, "utf8").replace(/\r\n/g, "\n") : null;

if (actual === expected) {
  console.log("sync-css: public/styles/main.css is up to date");
  process.exit(0);
}

if (check) {
  console.error(
    "sync-css: public/styles/main.css is OUT OF DATE with src/main.css.\n" +
      "          The served stylesheet is stale — your CSS edits will not ship.\n" +
      "          Run `npm run sync:css` and commit the result."
  );
  process.exit(1);
}

mkdirSync(dirname(TARGET), { recursive: true });
writeFileSync(TARGET, expected, "utf8");
console.log("sync-css: wrote public/styles/main.css from src/main.css");
