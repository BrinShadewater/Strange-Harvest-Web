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
 * It was `max-age=300, stale-while-revalidate=86400` and deliberately NOT `immutable`,
 * because an unhashed filename plus a long immutable TTL pins a stale stylesheet in
 * returning visitors' caches — the same failure mode as the 11-week drift above, but
 * unfixable by a redeploy. That note ended "content-hash the output first if you want
 * immutable", which is what this now does (2026-09-08).
 *
 * The output is `public/styles/main.<hash>.css`, the hash is of the exact bytes served,
 * and `src/generated/cssHref.ts` carries the href so the two layouts and <DeferredCSS />
 * cannot drift from it. A deploy changes the URL, so `immutable` is safe: unchanged CSS
 * is never fetched twice and changed CSS ships instantly. Old hashed files are swept on
 * write, so /public does not accumulate them.
 *
 * Usage:
 *   node scripts/sync-css.mjs           write public/styles/main.<hash>.css + the href
 *   node scripts/sync-css.mjs --check   exit 1 if out of date (CI guard)
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "lightningcss";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(root, "src/main.css");
const STYLES_DIR = resolve(root, "public/styles");
const HREF_MODULE = resolve(root, "src/generated/cssHref.ts");

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
const source = readFileSync(SOURCE, "utf8").replace(/\r\n/g, "\n");

// Minify on the way through (added 2026-08-15, Alex's call, lightningcss per his pick).
// The served file lives in /public, so Next's own pipeline never touches it — this is
// the only place minification can happen. PageSpeed measured ~220 ms of parse cost on
// the unminified 57 KB sheet on mobile. src/main.css stays readable; only the
// generated copy is minified. lightningcss is deterministic for a given input, which
// is what keeps the --check mode honest: expected is recomputed the same way every run.
const minified = transform({
  filename: "main.css",
  code: Buffer.from(source),
  minify: true,
}).code.toString("utf8");

const expected = BANNER + minified + "\n";

// Hash the bytes actually served, not the source: the banner and the minifier both affect
// what a browser receives, and the URL has to change whenever any of that does.
const hash = createHash("sha256").update(expected, "utf8").digest("hex").slice(0, 8);
const filename = `main.${hash}.css`;
const target = resolve(STYLES_DIR, filename);
const href = `/styles/${filename}`;

const hrefModule =
  `// GENERATED FILE — do not edit. Written by scripts/sync-css.mjs.\n` +
  `// The served stylesheet is content-hashed so vercel.json can cache /styles/ immutably;\n` +
  `// every reference imports this constant so none of them can drift from the filename.\n` +
  `export const MAIN_CSS_HREF = "${href}";\n`;

const targetOk =
  existsSync(target) && readFileSync(target, "utf8").replace(/\r\n/g, "\n") === expected;
const hrefOk =
  existsSync(HREF_MODULE) &&
  readFileSync(HREF_MODULE, "utf8").replace(/\r\n/g, "\n") === hrefModule;

if (targetOk && hrefOk) {
  console.log(`sync-css: ${href} is up to date`);
  process.exit(0);
}

if (check) {
  console.error(
    "sync-css: the served stylesheet is OUT OF DATE with src/main.css.\n" +
      `          Expected ${href}\n` +
      "          Your CSS edits will not ship. Run `npm run sync:css` and commit the result."
  );
  process.exit(1);
}

mkdirSync(STYLES_DIR, { recursive: true });
writeFileSync(target, expected, "utf8");

// Sweep previous hashes. They are unreachable the moment the href module changes, and
// leaving them would grow /public by a stylesheet per CSS edit, forever.
let swept = 0;
for (const name of readdirSync(STYLES_DIR)) {
  if (/^main\.[0-9a-f]{8}\.css$/.test(name) && name !== filename) {
    unlinkSync(resolve(STYLES_DIR, name));
    swept += 1;
  }
}
// The pre-hash filename, if a checkout still carries it.
if (existsSync(resolve(STYLES_DIR, "main.css"))) {
  unlinkSync(resolve(STYLES_DIR, "main.css"));
  swept += 1;
}

mkdirSync(dirname(HREF_MODULE), { recursive: true });
writeFileSync(HREF_MODULE, hrefModule, "utf8");
console.log(
  `sync-css: wrote public/styles/${filename} from src/main.css` +
    (swept ? ` (swept ${swept} old file${swept === 1 ? "" : "s"})` : "")
);
