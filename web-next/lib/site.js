/**
 * The canonical origin, defined once.
 *
 * Three files need it — the root layout's `metadataBase`, the sitemap, and
 * robots.txt — and a sitemap that disagrees with the canonical host is worse
 * than no sitemap at all, because crawlers will happily index the wrong origin.
 * Keeping it here makes that class of drift impossible rather than unlikely.
 */
export const SITE_URL = 'https://tobilobaodu.com'
