import { client } from '../../../sanity/client'
import { verifyPassword } from '../../../lib/password'
import { issueToken } from '../../../lib/access-token'
import { consume, reset } from '../../../lib/rate-limit'

/**
 * Exchanges a case study password for a short-lived, slug-scoped access token.
 *
 * Port of netlify/functions/verify-password.js. The security decisions are
 * carried over unchanged; only the request/response plumbing differs.
 *
 * Only POST is exported, so Next answers 405 with a correct Allow header for
 * every other method — the explicit check the Netlify handler needed is now
 * the framework's job.
 */

// Never cache: the response depends on the body and issues a credential.
export const dynamic = 'force-dynamic'

const json = (status, body, extraHeaders = {}) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  })

export async function POST(request) {
  const { limited, retryAfter } = consume(request, 'verify-password')
  if (limited) {
    return json(
      429,
      { error: 'Too many attempts. Please try again later.' },
      { 'Retry-After': String(retryAfter) }
    )
  }

  let slug, password
  try {
    ({ slug, password } = await request.json())
  } catch {
    return json(400, { error: 'Invalid request body' })
  }

  if (
    typeof slug !== 'string' ||
    typeof password !== 'string' ||
    !slug ||
    !password
  ) {
    return json(400, { error: 'Missing slug or password' })
  }

  let project
  try {
    project = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ locked, password }`,
      { slug }
    )
  } catch (error) {
    console.error('Sanity fetch failed in verify-password:', error.message)
    return json(502, { error: 'Unable to verify right now. Please try again.' })
  }

  // Same response shape for "no such project", "not locked" and "wrong
  // password" so the endpoint cannot be used to enumerate protected slugs.
  if (
    !project ||
    !project.locked ||
    !verifyPassword(password, project.password)
  ) {
    return json(200, { success: false })
  }

  const token = issueToken(slug)
  if (!token) {
    // CASE_STUDY_SECRET is missing — fail closed rather than granting access.
    return json(500, { error: 'Access is temporarily unavailable.' })
  }

  reset(request, 'verify-password')
  return json(200, { success: true, token })
}
