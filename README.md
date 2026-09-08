# Prtfl — Tobiloba Odu portfolio

Two packages in one repo, deliberately kept apart:

| Path | What it is |
| --- | --- |
| `/` (root) | **Sanity Studio** — `schemaTypes/`, `sanity.config.ts`, `structure.ts` |
| `web-next/` | **The site** — Next.js 16 App Router, content from Sanity |

They are not merged into a single `package.json`. Sanity and Next disagree on
shared transitive dependencies, and one root install is what produced the
rxjs 6-vs-7 and xstate 4-vs-5 hoisting collisions during the Sanity v6 upgrade.
Two lockfiles is the cheaper problem.

> **Deploy status.** Moving to Coolify, via `web-next/Dockerfile`. Until DNS is
> cut over, the live site is still the last successful Gatsby deploy on Netlify.
> Netlify can no longer build this repo — the Gatsby source is gone — so pushing
> will fail that build while leaving the served site untouched. See
> [Deploying — Coolify](#deploying--coolify).

## Getting started

```bash
nvm use            # Node 22.12 (see .nvmrc)

npm install                    # Studio dependencies
npm install --prefix web-next  # site dependencies

npm run site:dev   # the site   → http://localhost:3000
npm run dev        # the Studio → http://localhost:3333
```

Unlike the Gatsby setup, the Netlify CLI is no longer needed to exercise the
password gate — those endpoints are Next Route Handlers under
`web-next/app/api/`, so `npm run site:dev` serves them directly.

## Scripts

Run from the repo root:

| Script | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Sanity Studio dev server |
| `npm run build` | Build the Studio into `dist/` |
| `npm run deploy` | Deploy the Studio to its `studioHost` |
| `npm run site:dev` | Next dev server for the site |
| `npm run site:build` | Production build of the site |
| `npm run lint` | ESLint over `web-next/`, `netlify/`, `scripts/` |
| `npm test` | Unit tests for the access-token and password helpers |
| `npm run hash-password -- "<password>"` | Hash a case study password for Sanity |

## Environment variables

The site reads these from `web-next/.env.local` in development (Next loads it
automatically) and from the host's environment in production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | no | Defaults to `bhfv0qe4` |
| `SANITY_DATASET` | no | Defaults to `production` |
| `SANITY_READ_TOKEN` | yes | Sanity read access at build time and in route handlers |
| `CASE_STUDY_SECRET` | **yes** | Random string, 32+ chars. Signs the access tokens for protected case studies. **Without it, protected case studies cannot be unlocked at all.** |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Password-protected case studies

Projects marked **Locked** in the Studio are not published in full:

1. `web-next/app/case-study/[slug]/page.js` fetches the public shell (title,
   client, year, hero image — all already visible on the listing pages) and,
   for a locked project, simply does not fetch the body. It cannot reach the
   static output because it is never requested.
2. Entering a password posts to `app/api/verify-password/`, which checks it
   against Sanity server-side and returns a short-lived HMAC token scoped to
   that one slug.
3. `app/api/get-case-study/` exchanges a valid token for the case study body,
   which the client renders.

The password is never selected by a query that reaches the browser.

> The Gatsby version needed a `contentSlug: "__locked__"` sentinel here — a slug
> matching nothing — because a Gatsby page query could not be conditional. A
> server component just branches, so that workaround is gone.

CI asserts this holds: see the *Assert no passwords in build output* step in
[`.github/workflows/ci.yml`](.github/workflows/ci.yml), which scans the
browser-reachable build output for both a `"password"` field and a `scrypt$`
hash, and fails if it finds no output to scan at all.

### Migrating a password to a hash

Passwords may be stored as plaintext (legacy) or as a scrypt hash. Hashed is
preferred, so a leak of the dataset does not leak usable passwords:

```bash
npm run hash-password -- "the password"
# → scrypt$<salt>$<hash>
```

Paste the whole `scrypt$…` string into the project's **Access Password** field
in the Studio. Both forms keep working, so this can be done one project at a
time.

## Deploying — Coolify

The deploy artefact is `web-next/Dockerfile`: a multi-stage build producing a
standalone Next server that runs as `node server.js` under a non-root user.
Nothing in it is Coolify-specific, which is the point — the same image runs on
Fly, Railway, Render, Cloud Run or a bare VPS if this ever needs to move.

### Coolify application settings

| Setting | Value |
| --- | --- |
| Build Pack | `Dockerfile` |
| Base Directory | `/web-next` |
| Dockerfile Location | `/Dockerfile` (relative to the base directory) |
| Port Exposes | `3000` |
| Health Check | Leave enabled — the Dockerfile supplies its own |

### Environment variables

Coolify gives every variable independent **Build Variable** and **Runtime
Variable** flags.

| Variable | Build | Runtime | Notes |
| --- | --- | --- | --- |
| `SANITY_READ_TOKEN` | yes | yes | Turn on **Use Docker Build Secrets** for it |
| `CASE_STUDY_SECRET` | no | **yes** | 32+ random chars. Without it no locked case study can be unlocked |
| `SANITY_PROJECT_ID` | yes | yes | Optional, defaults to `bhfv0qe4` |
| `SANITY_DATASET` | yes | yes | Optional, defaults to `production` |

**On `SANITY_READ_TOKEN` at build time.** The image builds and produces
byte-identical output *without* it, because the dataset is currently world
readable — measured, not assumed. Set it anyway: it is the single thing that
lets you flip the dataset to private later without the build breaking, and it is
what `perspective: 'drafts'` needs to see unpublished content.

Enable **Use Docker Build Secrets** rather than passing it as a plain build
variable. Coolify's default is `--build-arg`, and build args are recorded in
image metadata — recoverable by anyone who can read the image. With the toggle
on, Coolify uses BuildKit's `--mount=type=secret`, which is what the Dockerfile
already expects.

### Cutover order

1. Deploy in Coolify and confirm it reaches **healthy**.
2. Hit its temporary URL and check a locked case study still gates, and that
   the right password unlocks it.
3. Point DNS at Coolify. Keep the Netlify site alive during propagation.
4. Verify on the real domain, then retire the Netlify site.
5. Only then delete `netlify.toml` and `netlify/` — see below.

`netlify.toml` and `netlify/functions/` are still in the repo deliberately.
They describe what is serving production right now. They stop being true at
step 4, not before, and deleting live infrastructure's configuration ahead of
its replacement taking traffic buys nothing.

Note that a Netlify rebuild is already impossible — the Gatsby source is gone —
so the rollback during cutover is "restore the last successful deploy" in the
Netlify UI, which works regardless of whether those files exist.

## Notes

- `overrides.minimatch` pins minimatch to v9 for the CVE fix, with an exception
  for `eslint-plugin-jsx-a11y`, which needs v3's CommonJS default export (3.1.2
  carries the same ReDoS fix).
- Keep new `.gitignore` entries rooted (`/foo`). The old unrooted `public/`
  entry matched at any depth and silently ignored `web-next/public/` — every
  font, SVG and image the site serves.
