/**
 * generate-image-variants — build responsive webp variants for the BTS gallery.
 *
 * Why this exists: public/bts.html renders four JS-built carousels from ~70 source
 * images. Lazy loading was already correct (only slide 0 of each carousel is eager),
 * but the images carried NO srcset, so every slide served the full-size original.
 * Measured 2026-08-13: 24.8 MB of gallery sources, 8 files over 1 MB, the largest a
 * 3840x2160 / 3.44 MB still — rendered into a box that is at most ~894 CSS px wide
 * (main 1200px, .gallerySection padding, .carousel max-width 80%).
 *
 * Widths: 768 / 1280 / 1920. The top rung covers ~894 CSS px at DPR 2. A width is
 * skipped when the source is already narrower than it, so nothing is ever upscaled.
 *
 * Originals are never modified or deleted — variants are written beside them as
 * <name>-<width>w.webp, which is the same convention the home page already uses
 * (e.g. strange-harvest-official-movie-poster-640w.webp).
 *
 * Idempotent: an existing variant is skipped unless it is older than its source.
 *
 * Coverage is deliberately uneven: a 1600px-wide source gets 768w and 1280w but no
 * 1920w, because upscaling is refused. That is why bts.html carries a generated
 * IMG_VARIANTS manifest rather than assuming every width exists for every image —
 * a srcset entry pointing at a variant we declined to build would 404.
 *
 * Usage:
 *   node scripts/generate-image-variants.mjs            write missing variants
 *   node scripts/generate-image-variants.mjs --check    exit 1 if any are missing
 *   node scripts/generate-image-variants.mjs --force    rebuild every variant
 *   node scripts/generate-image-variants.mjs --manifest print the IMG_VARIANTS block
 *                                                      for pasting into bts.html
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_HTML = resolve(root, "public/bts.html");
const PUBLIC_DIR = resolve(root, "public");

const WIDTHS = [768, 1280, 1920];
const QUALITY = 80;

const check = process.argv.includes("--check");
const force = process.argv.includes("--force");
const manifest = process.argv.includes("--manifest");

if (!existsSync(SOURCE_HTML)) {
  console.error(`generate-image-variants: missing ${SOURCE_HTML}`);
  process.exit(1);
}

// Collect every /images/*.webp referenced by bts.html, ignoring paths that are
// already a variant (…-640w.webp) so we never build variants of variants.
const html = readFileSync(SOURCE_HTML, "utf8");
const referenced = [...new Set(html.match(/\/images\/[A-Za-z0-9._/-]+\.webp/g) ?? [])]
  .filter((p) => !/-\d+w\.webp$/.test(p))
  .sort();

// --manifest: report which widths actually exist on disk per source image, as the
// compact object bts.html's gallery script reads to build each srcset.
if (manifest) {
  const map = {};
  for (const rel of referenced) {
    if (!existsSync(resolve(PUBLIC_DIR, `.${rel}`))) continue;
    const key = rel.replace(/^\/images\//, "").replace(/\.webp$/, "");
    const got = WIDTHS.filter((w) =>
      existsSync(resolve(PUBLIC_DIR, `.${rel.replace(/\.webp$/, `-${w}w.webp`)}`))
    );
    if (got.length) map[key] = got;
  }
  const lines = Object.entries(map)
    .map(([k, v]) => `      "${k}": [${v.join(",")}]`)
    .join(",\n");
  console.log(`    const IMG_VARIANTS = {\n${lines}\n    };`);
  process.exit(0);
}

const planned = [];
const missing = [];

for (const rel of referenced) {
  const srcPath = resolve(PUBLIC_DIR, `.${rel}`);
  if (!existsSync(srcPath)) continue;

  const meta = await sharp(srcPath).metadata();

  for (const width of WIDTHS) {
    if (!meta.width || meta.width <= width) continue; // never upscale
    const outRel = rel.replace(/\.webp$/, `-${width}w.webp`);
    const outPath = resolve(PUBLIC_DIR, `.${outRel}`);

    // Existence is the only freshness test, deliberately. An earlier revision
    // compared mtimes and silently re-encoded four hand-made variants that were
    // already committed, because a fresh checkout gives every file a new mtime.
    // Variants in this repo are content-addressed by width, so an existing file
    // is by definition correct. Use --force to rebuild on purpose.
    if (existsSync(outPath) && !force) continue;

    planned.push({ srcPath, outPath, outRel, width });
    missing.push(outRel);
  }
}

if (check) {
  if (missing.length === 0) {
    console.log(
      `generate-image-variants: all variants present for ${referenced.length} source image(s)`
    );
    process.exit(0);
  }
  console.error(
    `generate-image-variants: ${missing.length} variant(s) MISSING.\n` +
      "          bts.html will serve full-size originals into an ~894px box.\n" +
      "          Run `npm run images:bts` and commit the result.\n" +
      missing.slice(0, 10).map((m) => `            ${m}`).join("\n") +
      (missing.length > 10 ? `\n            …and ${missing.length - 10} more` : "")
  );
  process.exit(1);
}

if (planned.length === 0) {
  console.log("generate-image-variants: nothing to do; all variants are current");
  process.exit(0);
}

let written = 0;
let bytesOut = 0;

for (const { srcPath, outPath, outRel, width } of planned) {
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  written += 1;
  bytesOut += statSync(outPath).size;
  console.log(`  wrote ${outRel} (${(statSync(outPath).size / 1024).toFixed(0)} KB)`);
}

console.log(
  `generate-image-variants: wrote ${written} variant(s), ${(bytesOut / 1048576).toFixed(1)} MB total`
);
