import { sanityImageUrl } from './sanityImage'

/**
 * Custom next/image loader, wired globally via `images.loaderFile` in
 * next.config.mjs.
 *
 * Every <Image> on the site therefore renders a Sanity CDN transform URL rather
 * than routing through Next's own optimiser. That is the right trade here: the
 * images already live on Sanity's CDN, which resizes and format-negotiates them
 * far closer to the viewer than this server could.
 *
 * A useful consequence: with a custom loader Next never invokes its own
 * optimiser, so `sharp` is not needed at runtime for these images.
 */
export default function sanityImageLoader({ src, width, quality }) {
  return sanityImageUrl(src, { width, quality: quality || 80 })
}
