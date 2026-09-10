import { headers } from 'next/headers'
import { SITE_URL } from '../lib/site'

/**
 * Replaces the hand-written static/robots.txt.
 *
 * That file hard-coded `Sitemap: https://tobilobaodu.com/sitemap/sitemap-index.xml`
 * — gatsby-plugin-sitemap's output path, which nothing serves any more. Deriving
 * the URL here means it tracks whatever /sitemap.xml actually resolves to
 * instead of pointing at a 404, which is how the old one would have ended up.
 *
 * ONLY THE CANONICAL HOST IS CRAWLABLE. Everything else — the Coolify staging
 * subdomain, preview deployments, an IP or *.sslip.io URL, localhost — serves
 * `Disallow: /`. Before this, staging answered `Allow: /` with no canonical tag
 * and no noindex, so it was a complete, indexable duplicate of the portfolio
 * competing with the real domain in search results.
 *
 * WHY THE HOST AND NOT AN ENV VAR. An env flag has to be set correctly on every
 * environment, and both defaults are wrong in a different way: default-allow
 * leaves a new environment exposed until someone remembers to close it (the bug
 * being fixed here), while default-deny silently deindexes PRODUCTION the day
 * someone forgets to set it — much worse, and invisible until traffic falls off.
 * The request's own host cannot be forgotten and cannot drift.
 *
 * Reading headers() makes this route render per request instead of being
 * prerendered. That is the intended trade: robots.txt is a handful of bytes,
 * and the alternative is a build-time guess about which host will serve it.
 */

// Derived from SITE_URL so the canonical host is defined in exactly one place.
const CANONICAL_HOST = new URL(SITE_URL).host

export default async function robots() {
  const headerList = await headers()

  // Port is stripped so a local `host: localhost:3000` compares cleanly; it
  // still fails the check below, which is what we want for dev.
  const host = (headerList.get('host') ?? '').split(':')[0].toLowerCase()

  const isCanonical = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`

  return {
    rules: isCanonical
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },

    // Always the canonical sitemap, never the current host's. A crawler that
    // reaches a staging robots.txt should be pointed at the real site rather
    // than handed a map of the duplicate.
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
