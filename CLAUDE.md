# rohit-web: Claude Context

> **Runs:** Class 4, cloud only. Work starts in a Claude cloud thread on this repo (project "Personal site"). Read this file first; work on a branch and open a PR.
> **Golden dir:** none (no host). The repo on GitHub is the master copy of the site, never of the private sources.
> **Host-bound steps:** none here. Exports that need private data run in the owning project (Travel on the Mac mini) and arrive as PRs.
> **Outputs:** the public site https://rohit.niwav.in, built by GitHub Actions on merge to `main`. Rohit merges.
> **Infra:** GitHub Pages; DNS CNAME `rohit` in the niwav.in zone at Cloudflare. Registry and decisions: `rohitdubey19/Niwav-DevOps` (`01-project-map.md`, `07-decision-log.md`). Plan: https://claude.ai/artifact/Y4S7akg4pMk7PwNkA5gByV

## Goal
Rohit's personal "window to the world": travel posts, the book Sh-Va, notes and
whatever he makes later. Separate from niwav.in (the company site, Niwav project);
the two link to each other only.

## The one rule
**This repo is public. Everything merged here is published for good.** Private
material is never kept here as a source. Nextcloud and each project's own repo
stay the private sources; this repo only receives what an owner project exports
for publication, by PR, and Rohit's merge is the publish step.

## Sources
`SOURCES.md` lists every source: owner project, what it may send, last verified.
A new kind of content gets a row there before its first PR. Content arrives
pushed by the owner project; this repo's CI holds no token for Nextcloud or any
private repo, and never will.

## Privacy gates (all must hold before merge)
1. Source rules first: vault content never reaches Nextcloud or the journal, so it never reaches here. pa has no path to this repo.
2. Travel posts use the public export only: no home stop or home-zone photos, overnight stays as a town not a hotel, no coordinates, no GADM district lines, no costs, no photos of children or of anyone who has not agreed, nothing live or recent (publish after the trip).
3. Images re-encoded without EXIF or GPS; never a raw `trip.json`.
4. CI (`public-safety.yml`, also run before every deploy): images with GPS or camera metadata, email addresses, Indian mobile numbers, passport-style numbers, and secrets (gitleaks) fail the build.
5. Rohit reviews the PR. Claude never merges, never changes repo visibility or Pages settings.

## Layout
- `content/<section>/<slug>/index.md` (+ images beside it) or `content/<section>/<slug>.md`; sections: `travel`, `writing`, `notes`. Front matter: `title`, `date`, `summary?`, `source` (owner project from SOURCES.md), `draft?`.
- `src/site.ts`: site title, tagline and sections (title and tagline are placeholders until Rohit settles them).
- `src/pages/`: home, a list per section, a page per post, `rss.xml`.
- `scripts/public-safety.sh`: the gate in rule 4.

## Working rules
- Branch + PR to `main`; Rohit merges. Never push to `main`.
- Docs-only commits: `[skip ci]` in the title and the squash title.
- Never invent facts or captions; posts are Rohit's words.
- No comments, analytics, newsletter or other third-party scripts without a decision in Niwav-DevOps `07-decision-log.md`.

## Secrets
None. Pages deploys with the workflow's own token. The Cloudflare DNS token is a CyPhyS business credential and is not for this project (one-off use recorded in Niwav-DevOps 07, 2026-10-25).

## Commands
npm ci · npm run dev · npm run build · npm run check:public (needs exiftool)
