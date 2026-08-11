/**
 * Builds responsive Sanity CDN URLs for images that come through raw
 * `_rawComponents` data (where Gatsby's gatsbyImageData is not available).
 *
 * The Sanity image pipeline serves transforms straight off the CDN, so asking
 * for an explicit width plus `auto=format` gets us a correctly sized WebP/AVIF
 * instead of the full-resolution original.
 */

const SANITY_CDN = 'cdn.sanity.io'

const DEFAULT_WIDTHS = [640, 960, 1280, 1920]

const isSanityImage = (url) => {
  if (typeof url !== 'string' || !url) return false
  try {
    return new URL(url).hostname === SANITY_CDN
  } catch {
    return false
  }
}

/**
 * @returns {string} the URL with transform params applied, or the input
 *   unchanged if it is not a Sanity CDN image.
 */
export const sanityImageUrl = (url, { width, quality = 80, fit = 'max' } = {}) => {
  if (!isSanityImage(url)) return url || ''

  const parsed = new URL(url)
  if (width) parsed.searchParams.set('w', String(width))
  parsed.searchParams.set('q', String(quality))
  parsed.searchParams.set('fit', fit)
  parsed.searchParams.set('auto', 'format')
  return parsed.toString()
}

/**
 * @returns {string|undefined} a srcset across DEFAULT_WIDTHS, or undefined when
 *   the URL is not a Sanity image (in which case there is nothing to scale).
 */
export const sanityImageSrcSet = (url, { quality = 80, widths = DEFAULT_WIDTHS } = {}) => {
  if (!isSanityImage(url)) return undefined
  return widths.map((w) => `${sanityImageUrl(url, { width: w, quality })} ${w}w`).join(', ')
}

/**
 * Props to spread onto an <img> for a raw Sanity image URL: sized src,
 * responsive srcset, sizes hint, and lazy loading.
 */
export const sanityImageProps = (url, { width = 1280, sizes = '100vw', quality = 80 } = {}) => {
  if (!isSanityImage(url)) {
    return url ? { src: url, loading: 'lazy', decoding: 'async' } : { src: '' }
  }
  return {
    src: sanityImageUrl(url, { width, quality }),
    srcSet: sanityImageSrcSet(url, { quality }),
    sizes,
    loading: 'lazy',
    decoding: 'async',
  }
}
