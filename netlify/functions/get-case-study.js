/**
 * Serves the body of a password-protected case study.
 *
 * Locked case studies are deliberately excluded from the Gatsby static build
 * (see gatsby-node.js), so this function is the only way to obtain their
 * content. It requires a valid, unexpired, slug-scoped token issued by
 * `verify-password`.
 *
 * The GROQ projection mirrors what the build-time GraphQL query produces via
 * `_rawComponents(resolveReferences: { maxDepth: 10 })`, so the template can
 * render either source with the same component code.
 */

const { createClient } = require('@sanity/client')
const { verifyToken } = require('../lib/access-token')
const { consume } = require('../lib/rate-limit')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_READ_TOKEN,
})

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && project->slug.current == $slug][0]{
  _id,
  "components": components[]{
    ...,
    heroImage{ ..., asset-> },
    icon{ ..., asset-> },
    posterImage{ ..., asset-> },
    videoFile{ ..., asset-> },
    images[]{ ..., asset-> },
    slides[]{ ..., image{ ..., asset-> } }
  },
  project->{ _id, title, client, year, projectType, introText, shortDescription },
  "relatedProjects": relatedProjects[]->{ _id, title, client, year, slug }
}`

const json = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  body: JSON.stringify(body),
})

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' }, { Allow: 'POST' })
  }

  const { limited, retryAfter } = consume(event, 'get-case-study')
  if (limited) {
    return json(429, { error: 'Too many requests.' }, { 'Retry-After': String(retryAfter) })
  }

  let slug, token
  try {
    ;({ slug, token } = JSON.parse(event.body))
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
    caseStudy = await client.fetch(CASE_STUDY_QUERY, { slug })
  } catch (error) {
    console.error('Sanity fetch failed in get-case-study:', error.message)
    return json(502, { error: 'Unable to load this case study right now.' })
  }

  if (!caseStudy) {
    return json(404, { error: 'Case study not found.' })
  }

  return json(200, { caseStudy })
}
