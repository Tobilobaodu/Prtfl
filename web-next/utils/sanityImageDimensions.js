/**
 * Sanity encodes the intrinsic size in the asset filename, e.g.
 *   …/fe37d282…-4000x3000.webp
 *
 * next/image needs width and height (or `fill`) to reserve layout space, and
 * parsing them here avoids hardcoding a guess per call site.
 *
 * Kept out of sanityImageLoader.js deliberately: that file is wired as Next's
 * `images.loaderFile`, which Next bundles specially, and importing extra named
 * exports from it breaks the build.
 *
 * @returns {{width: number, height: number}|null}
 */
export const sanityImageDimensions = (url) => {
  const match = /-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i.exec(url || '')
  if (!match) return null
  return { width: Number(match[1]), height: Number(match[2]) }
}
