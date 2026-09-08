import { publicClient } from '../sanity/client'
import { ALL_PROJECT_SLUGS } from '../sanity/queries'
import { SITE_URL } from '../lib/site'

/**
 * Replaces gatsby-plugin-sitemap.
 *
 * That plugin walked Gatsby's own page graph, so it needed no route list. Next
 * has no equivalent registry to introspect at build time, so the static routes
 * are enumerated here and the case studies are fetched — the same source
 * generateStaticParams uses, which is what keeps the two from disagreeing about
 * which case studies exist.
 *
 * Fetched with `publicClient`: a sitemap must only ever contain what an
 * anonymous visitor can reach. Using the tokened client risks listing a URL
 * that only a draft perspective can see.
 *
 * Locked case studies ARE included, and that is correct — the page itself is
 * public. Only the body behind the password gate is not, and it is never in the
 * static output for a locked project (see app/case-study/[slug]/page.js).
 */

// Kept in the order they appear in the nav. `''` is the homepage.
const STATIC_ROUTES = [
  '',
  '/about',
  '/portfolio',
  '/sndbx',
  '/photography',
  '/experience',
  '/contact',
  // Parity note: gatsby-plugin-sitemap excluded only /404 and /404.html, so
  // this internal block-review page was in the old sitemap too. Kept to match
  // current behaviour — drop it here if you would rather it not be indexed.
  '/cs-components',
]

export default async function sitemap() {
  const projects = await publicClient.fetch(ALL_PROJECT_SLUGS)

  // One timestamp for the whole run. Calling new Date() per entry would emit
  // rows that differ by milliseconds, implying edits that never happened.
  const lastModified = new Date()

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: route === '' ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/case-study/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ]
}
