// The deploy contract for this site is split across two files, and neither was checked.
//
// vercel.json carries the cache policy and five security headers. next.config.ts carries the
// Content-Security-Policy. `git grep vercel.json` found only prose plus sync-css.mjs, which
// reads it for the stylesheet href and never validates it. Either file could be deleted and
// `npm run check:css`, `npm run check:images`, `npm run lint` and `npm run build` would all
// stay green, because each enumerates from src/ or public/ and none asks how the site is served.
//
// The /styles/ rule matters most here. #68 content-hashed main.css precisely so it could be
// cached for a year; losing the rule silently reverts that to Vercel's max-age=0 default and
// the page looks identical, so nothing else in the repo would ever notice.
//
// Asserted by role, not by literal value: tightening the CSP or lengthening HSTS must not fail
// the build. max-age is the exception — a rule still present but weakened is exactly what a
// presence check cannot see.

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const fail = (message) => problems.push(message);

// --- vercel.json ----------------------------------------------------------------------
const vercelPath = path.join(repoRoot, 'vercel.json');
if (!existsSync(vercelPath)) {
  fail('vercel.json is missing — the cache policy and the security header stack go with it.');
} else {
  let config;
  try {
    config = JSON.parse(readFileSync(vercelPath, 'utf8'));
  } catch (error) {
    fail(`vercel.json does not parse: ${error.message}`);
  }

  if (config) {
    if (config.framework !== 'nextjs') {
      fail(`vercel.json framework is "${config.framework}", expected "nextjs".`);
    }

    const rules = Array.isArray(config.headers) ? config.headers : [];
    const ruleFor = (source) => rules.find((rule) => rule.source === source);
    const valueOf = (rule, key) =>
      (rule?.headers ?? []).find((h) => h.key.toLowerCase() === key.toLowerCase())?.value;

    const styles = ruleFor('/styles/(.*)');
    if (!styles) {
      fail('the /styles/(.*) rule is gone. main.css is content-hashed (#68) so it can be cached '
           + 'for a year; without this rule Vercel serves it max-age=0, must-revalidate.');
    } else {
      const cache = valueOf(styles, 'Cache-Control') ?? '';
      if (!/immutable/.test(cache)) fail(`/styles/ Cache-Control lost immutable: "${cache}".`);
      const maxAge = cache.match(/max-age=(\d+)/);
      if (!maxAge) fail(`/styles/ Cache-Control has no max-age: "${cache}".`);
      else if (Number(maxAge[1]) < 2592000) {
        fail(`/styles/ max-age is ${maxAge[1]}s, under 30 days — the filename is hashed, so a `
             + 'changed file gets a changed name and a year is safe.');
      }
    }

    const images = ruleFor('/images/(.*)');
    if (!images) fail('the /images/(.*) cache rule is gone.');
    else if (!/max-age=\d+/.test(valueOf(images, 'Cache-Control') ?? '')) {
      fail('/images/ carries no max-age.');
    }

    const catchAll = ruleFor('/(.*)');
    if (!catchAll) {
      fail('vercel.json has no catch-all /(.*) rule — every security header is gone.');
    } else {
      for (const key of [
        'Strict-Transport-Security',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Referrer-Policy',
        'Permissions-Policy',
      ]) {
        if (!valueOf(catchAll, key)) fail(`vercel.json catch-all rule lost ${key}.`);
      }
    }
  }
}

// --- next.config.ts -------------------------------------------------------------------
// The CSP is deliberately NOT in vercel.json; it is built in next.config.ts. That split is the
// reason a check on vercel.json alone would report a healthy deploy contract with no CSP at all.
const nextConfigPath = path.join(repoRoot, 'next.config.ts');
if (!existsSync(nextConfigPath)) {
  fail('next.config.ts is missing — it is where the Content-Security-Policy is defined.');
} else {
  const source = readFileSync(nextConfigPath, 'utf8');
  if (!/Content-Security-Policy/i.test(source)) {
    fail('next.config.ts no longer sets a Content-Security-Policy, and vercel.json never did.');
  }
  if (!/default-src/i.test(source)) {
    fail('the Content-Security-Policy in next.config.ts has no default-src directive.');
  }
}

if (problems.length) {
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(`check-deploy-config: ${problems.length} problem(s) — FAILED.`);
  process.exit(1);
}

console.log('check-deploy-config: vercel.json and next.config.ts both intact '
            + '(/styles/ immutable, 5 security headers, CSP present).');
