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
 * Turns the crop an author sets in Sanity Studio (fractions trimmed off each
 * edge) into the CDN's `rect` param (x,y,width,height in source pixels). The
 * source size comes from the asset URL, which always ends in -<w>x<h>.<ext>.
 *
 * @returns {string|undefined} undefined when there is no crop, or nothing
 *   is trimmed, or the URL does not carry its dimensions.
 */
export const sanityCropRect = (url, crop) => {
  if (!crop || !isSanityImage(url)) return undefined
  const { top = 0, bottom = 0, left = 0, right = 0 } = crop
  if (!top && !bottom && !left && !right) return undefined

  const dims = new URL(url).pathname.match(/-(\d+)x(\d+)\.[a-z0-9]+$/i)
  if (!dims) return undefined
  const [w, h] = [Number(dims[1]), Number(dims[2])]

  const x = Math.round(left * w)
  const y = Math.round(top * h)
  const rw = Math.round(w * (1 - left - right))
  const rh = Math.round(h * (1 - top - bottom))
  if (rw <= 0 || rh <= 0) return undefined
  return `${x},${y},${rw},${rh}`
}

/**
 * `height` is only meaningful alongside `fit: 'crop'` (or another fit that
 * honours both dimensions) — it exists so callers can ask for a fixed aspect
 * ratio, e.g. the square thumbnails in HoverReel.
 *
 * `rect` is a source-pixel crop from sanityCropRect, applied before resizing.
 *
 * @returns {string} the URL with transform params applied, or the input
 *   unchanged if it is not a Sanity CDN image.
 */
export const sanityImageUrl = (url, { width, height, quality = 80, fit = 'max', rect } = {}) => {
  if (!isSanityImage(url)) return url || ''

  const parsed = new URL(url)
  if (rect) parsed.searchParams.set('rect', rect)
  if (width) parsed.searchParams.set('w', String(width))
  if (height) parsed.searchParams.set('h', String(height))
  parsed.searchParams.set('q', String(quality))
  parsed.searchParams.set('fit', fit)
  parsed.searchParams.set('auto', 'format')
  return parsed.toString()
}

/**
 * @returns {string|undefined} a srcset across DEFAULT_WIDTHS, or undefined when
 *   the URL is not a Sanity image (in which case there is nothing to scale).
 */
export const sanityImageSrcSet = (url, { quality = 80, widths = DEFAULT_WIDTHS, rect } = {}) => {
  if (!isSanityImage(url)) return undefined
  return widths.map((w) => `${sanityImageUrl(url, { width: w, quality, rect })} ${w}w`).join(', ')
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
