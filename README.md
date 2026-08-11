# Prtfl — Tobiloba Odu portfolio

Gatsby 5 site with content from Sanity, deployed to Netlify. The Sanity Studio
lives in this repo too (`schemaTypes/`, `sanity.config.ts`).

## Getting started

```bash
nvm use          # Node 20+ (see .nvmrc)
npm install
npm run develop  # http://localhost:8000
```

To exercise the Netlify functions (the password gate) you need the Netlify CLI,
since `gatsby develop` alone does not serve `/.netlify/functions/*`:

```bash
netlify dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run develop` | Gatsby dev server |
| `npm run build` | Production build into `public/` |
| `npm run serve` | Serve a production build locally |
| `npm run lint` | ESLint over `src/`, `netlify/`, `scripts/`, `test/` |
| `npm test` | Unit tests for the access-token and password helpers |
| `npm run hash-password -- "<password>"` | Hash a case study password for Sanity |
| `npm run clean` | Clear the Gatsby cache |

## Environment variables

Set these in the Netlify dashboard (and in a local `.env` for `netlify dev`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | no | Defaults to `bhfv0qe4` |
| `SANITY_DATASET` | no | Defaults to `production` |
| `SANITY_READ_TOKEN` | yes | Sanity read access at build time and in functions |
| `CASE_STUDY_SECRET` | **yes** | Random string, 32+ chars. Signs the access tokens for protected case studies. **Without it, protected case studies cannot be unlocked at all.** |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Password-protected case studies

Projects marked **Locked** in the Studio are not published in full:

1. `gatsby-node.js` builds their page with a sentinel content slug, so the page
   query resolves to null and the case study body never lands in
   `public/page-data/**`. Only the public shell (title, client, year, hero
   image — all already visible on the listing pages) is statically rendered.
2. Entering a password posts to `netlify/functions/verify-password.js`, which
   checks it against Sanity server-side and returns a short-lived HMAC token
   scoped to that one slug.
3. `netlify/functions/get-case-study.js` exchanges a valid token for the case
   study body, which the template renders client-side.

The password is never included in any GraphQL query and never reaches the
browser.

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

## Notes

- `overrides.minimatch` pins minimatch to v9 for the CVE fix, with an exception
  for `eslint-plugin-jsx-a11y`, which needs v3's CommonJS default export (3.1.2
  carries the same ReDoS fix).
- There is deliberately no SPA catch-all redirect in `netlify.toml`; Gatsby
  emits real HTML per route plus a `404.html`, and a catch-all would turn every
  unknown URL into a soft 404.
