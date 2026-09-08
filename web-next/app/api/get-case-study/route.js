import { client } from '../../../sanity/client'
import { CASE_STUDY_BODY } from '../../../sanity/queries'
import { verifyToken } from '../../../lib/access-token'
import { consume } from '../../../lib/rate-limit'

/**
 * Returns the gated body of a case study, but only to a caller holding a valid
 * token for that exact slug.
 *
 * Port of netlify/functions/get-case-study.js, logic unchanged.
 *
 * This is the only place gated content is read. It uses the tokened `client`
 * (with `perspective: 'drafts'`, so it still resolves a body that has been
 * unpublished to hide it from the public API) — never `publicClient`.
 */

export const dynamic = 'force-dynamic'

const json = (status, body, extraHeaders = {}) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  })

export async function POST(request) {
  const { limited, retryAfter } = consume(request, 'get-case-study')
  if (limited) {
    return json(
      429,
      { error: 'Too many requests.' },
      { 'Retry-After': String(retryAfter) }
    )
  }

  let slug, token
  try {
    ({ slug, token } = await request.json())
  } catch {
    return json(400, { error: 'Invalid request body' })
  }

  if (typeof slug !== 'string' || !slug) {
    return json(400, { error: 'Missing slug' })
  }

  if (!verifyToken(token, slug)) {
    return json(401, { error: 'Access token is missing, invalid or expired.' })
  }

  let caseStudy
  try {
    caseStudy = await client.fetch(CASE_STUDY_BODY, { slug })
  } catch (error) {
    console.error('Sanity fetch failed in get-case-study:', error.message)
    return json(502, { error: 'Unable to load this case study right now.' })
  }

  if (!caseStudy) {
    return json(404, { error: 'Case study not found.' })
  }

  return json(200, { caseStudy })
}
