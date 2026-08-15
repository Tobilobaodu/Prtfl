/**
 * Verifies a case study password and, on success, issues a short-lived signed
 * token that `get-case-study` will accept.
 *
 * The password itself is never sent to the browser and is never included in any
 * Gatsby GraphQL query — it exists only here, server-side.
 */

const { createClient } = require('@sanity/client')
const { verifyPassword } = require('../lib/password')
const { issueToken } = require('../lib/access-token')
const { consume, reset } = require('../lib/rate-limit')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_READ_TOKEN,
})

const json = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  body: JSON.stringify(body),
})

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' }, { Allow: 'POST' })
  }

  const { limited, retryAfter } = consume(event, 'verify-password')
  if (limited) {
    return json(
      429,
      { error: 'Too many attempts. Please try again later.' },
      { 'Retry-After': String(retryAfter) }
    )
  }

  let slug, password
  try {
    ({ slug, password } = JSON.parse(event.body))
  } catch {
    return json(400, { error: 'Invalid request body' })
  }

  if (typeof slug !== 'string' || typeof password !== 'string' || !slug || !password) {
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
  if (!project || !project.locked || !verifyPassword(password, project.password)) {
    return json(200, { success: false })
  }

  const token = issueToken(slug)
  if (!token) {
    // CASE_STUDY_SECRET is missing — fail closed rather than granting access.
    return json(500, { error: 'Access is temporarily unavailable.' })
  }

  reset(event, 'verify-password')
  return json(200, { success: true, token })
}
