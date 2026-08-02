# ACTION-PLAN — 2026-08-02

- URL: `https://strangeharvestmovie.com/`
- Score: **79/100**
- Full findings: `FULL-AUDIT-REPORT.md`

> **This is a separate file on purpose.** `ACTION-PLAN.md` is tracked and hand-maintained, and
> `.gitignore` records that a tool once overwrote it and destroyed 68 lines of findings. This
> run did not touch it. Merge anything useful across by hand, or tell Claude to.

---

## Done in this session (2026-08-02)

### 1. Dropped the four `?lang=es` URLs from the generated sitemap — DONE

Removed from `pageEntries` in `scripts/generate-sitemaps.mjs`:

- `https://strangeharvestmovie.com/press.html?lang=es`
- `https://strangeharvestmovie.com/bts.html?lang=es`
- `https://strangeharvestmovie.com/transcript.html?lang=es`
- `https://strangeharvestmovie.com/privacy.html?lang=es`

All four return 200 but self-canonicalise to their non-query version, so a sitemap should not
list them as separate `<loc>` entries. Keep them as `hreflang` alternates inside the canonical
entry — the pattern `/` and `/es` already use.

Regenerated: sitemap is now **6 canonical URLs**, with the `?lang=es` variants retained as
`hreflang` alternates inside their canonical entries.

**Why it matters:** production currently serves the *app-route* sitemap (5 URLs). #20 deletes
that route and switches the site to the static file. That switch is a net win — it gains
`/transcript.html` and replaces a five-month-stale hardcoded `lastmod` with real mtimes — but
it should not also introduce four duplicates.

---

## After merging

### 2. Confirm `/es` actually serves Spanish in production

The whole point of the #20 i18n work. One command:

```bash
curl -s https://strangeharvestmovie.com/es | grep -c "Prensa y menciones"
```

Expect `1`. Today it returns `0` and the page contains "Press & Mentions" instead.

### 3. Resubmit the sitemap in Search Console

`lastmod` moves from a frozen `2026-03-06` to real dates, and `/transcript.html` appears for
the first time. Worth a manual resubmit rather than waiting for a recrawl.

---

## Backlog — worth doing, not urgent

### 4. Measure Core Web Vitals for real

CWV has **never actually been measured** on this site — both the March 2026 and this run hit
the PageSpeed rate limit and scored it 0/n-a. That is a blind spot, not a good result.

```bash
$env:PAGESPEED_API_KEY="<key>"
python "C:/Users/Alex4/.claude/skills/shadewater-seo/scripts/pagespeed.py" https://strangeharvestmovie.com/ --strategy mobile
```

Get a free key from the Google Cloud console (PageSpeed Insights API). Until then, treat any
performance claim about this site as unverified.

### 5. Fix the duplicate H2 — DONE

Footer wordmark demoted from `<h2>` to `<div>`. One H1, seven section H2s, verified. Its red
glow was being inherited from the global `h2` rule, so it is now set explicitly on
`.footerTitle` — the demotion did not change the design.

### 6. Re-verified the March "orphan pages" finding — DONE, and it was REAL

I initially assumed this was a parser artifact. It was not. A manual link crawl found
`/transcript.html` had **zero** inbound links from `/`, `/press.html`, `/bts.html` or
`/privacy.html`. The Trailer section now links to it in both locales.

The *other* half — "Internal Links 40/100" — does still look like a parser limitation, since
the home page legitimately carries only 6 internal links by design (it is a one-page site with
four satellite pages). Not worth chasing.

Same for "readability 61 / Flesch 37.1": the copy is deliberately atmospheric film prose. Do
not flatten it to hit a readability score.

---

## Explicitly not actioning

| Item | Why |
|---|---|
| `llms-full.txt` missing | Optional, experimental, not a Google requirement. `llms.txt` already scores 100/100 |
| "Block 1: Missing @type" | False positive — valid `@graph` container, 6 typed child nodes |
| RogerEbert.com 403 | Bot protection, not a broken link |
| "2 images missing alt" | Both are correct decorative `alt=""` |
