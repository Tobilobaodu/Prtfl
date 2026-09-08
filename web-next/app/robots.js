import { SITE_URL } from '../lib/site'

/**
 * Replaces the hand-written static/robots.txt.
 *
 * That file hard-coded `Sitemap: https://tobilobaodu.com/sitemap/sitemap-index.xml`
 * — gatsby-plugin-sitemap's output path, which nothing serves any more. Deriving
 * the URL here means it tracks whatever /sitemap.xml actually resolves to
 * instead of pointing at a 404, which is how the old one would have ended up.
 *
 * Rules are unchanged from the file it replaces: crawl everything.
 */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
