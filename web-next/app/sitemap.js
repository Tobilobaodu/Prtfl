import { publicClient } from '../sanity/client'
import { SITEMAP_PROJECT_SLUGS } from '../sanity/queries'
import { SITE_URL } from '../lib/site'

/**
 * Replaces gatsby-plugin-sitemap.
 *
 * That plugin walked Gatsby's own page graph, so it needed no route list. Next
 * has no equivalent registry to introspect at build time, so the static routes
 * are enumerated here and the case studies are fetched.
 *
 * Case studies come from SITEMAP_PROJECT_SLUGS, a subset of what
 * generateStaticParams builds: a project with no body still gets a page, but
 * that page says "Case Study Not Found" and has no business being indexed.
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
  '/portfolio',
  '/sndbx',
  '/photography',
  '/experience',
  // /cs-components is left out on purpose: it is an internal block-review page
  // and sets noindex itself. /about and /contact are redirects.
]

export default async function sitemap() {
  const projects = await publicClient.fetch(SITEMAP_PROJECT_SLUGS)

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
