/**
 * Turns a heading into a URL-safe anchor id.
 *
 * Lifted out of src/templates/case-study.js so the extracted block components
 * in src/components/case-study/ can produce the same ids as the renderers that
 * still live in the template — the table of contents links to them by hash, so
 * the two must not drift.
 */
export const slugify = (str) =>
  str?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''

export default slugify
