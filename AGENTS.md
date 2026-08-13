# Strange Harvest Web — Agent Guide

Agent-neutral and canonical. Claude and Codex both read this file; `CLAUDE.md` is a thin
`@AGENTS.md` import beside it. **Edit here, not there.**

The public website for **Strange Harvest**, the 2025 horror mockumentary — `strangeharvestmovie.com`.
Repo root is this folder, tracking a GitHub remote — compute branch state fresh rather than
reading it here. npm project (`strange-harvest-web`), scripts
`dev`, `build`, `start`, `lint`. Confirm hosting and domain before any deployment.

Audience is film viewers, press, festival and distribution contacts, collaborators, and fans
looking for official project information.

## Do not invent film facts. This is the hard rule here

**Never state a press claim, festival selection, release date, award, or distribution detail
that is not already sourced.** Cast, crew, synopsis, release status and festival history must be
confirmed by Alex or come from existing on-site copy.

This is not general caution — it is the specific risk for this project. Invented festival
selections or distribution claims are the kind of thing that follows a film around, gets quoted
by press, and is materially harder to retract than a wrong line of code. If you need a fact and
do not have it, leave a marker and ask.

`NOTICE.md` records the licence position: code reserved, film assets and platform marks not ours
to license. Alex's lawyer has reviewed the website — do not casually restructure legal or
credit copy.

## Tone and assets

Film-specific, atmospheric, public-safe, consistent with the project's creative tone. Preserve
the existing visual direction; **do not replace imagery without explicit approval.** Which assets
are final and which are temporary is an open question in the vault note, so treat all of them as
final until told otherwise.

SEO should prioritise the exact film title, official-site language, synopsis, and public-safe
film metadata.

## Before editing

Routes and current public copy have not been re-verified recently — the vault note lists "confirm
current routes before edits" as outstanding. Inspect what is actually there rather than working
from a remembered structure, and run the project's validation scripts after code edits.

## Rails

Standard: task branch, no direct commits to `main`, no push without approval, no secrets.
Preserve existing dirty state. Generic rails come from `Projects\AGENTS.md`.

Project home note: `Memory\ShadewaterMemoryVault\50_Projects\Websites\Strange-Harvest-Web.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
