/**
 * Short-lived, HMAC-signed access tokens for password-protected case studies.
 *
 * A token is `<payload>.<signature>` where payload is base64url-encoded JSON
 * `{ slug, exp }` and signature is an HMAC-SHA256 of that payload. The token is
 * scoped to a single slug so unlocking one case study does not unlock another.
 *
 * Requires CASE_STUDY_SECRET to be set in the Netlify environment. If it is
 * missing we fail closed — no token can be issued and none can be verified.
 */

const crypto = require('crypto')

const TOKEN_TTL_SECONDS = 60 * 60 // 1 hour

const getSecret = () => {
  const secret = process.env.CASE_STUDY_SECRET
  if (!secret || secret.length < 16) {
    console.error(
      'CASE_STUDY_SECRET is not set (or is shorter than 16 characters). ' +
        'Protected case studies cannot be unlocked until it is configured.'
    )
    return null
  }
  return secret
}

const base64url = (buf) => Buffer.from(buf).toString('base64url')

const sign = (payload, secret) =>
  base64url(crypto.createHmac('sha256', secret).update(payload).digest())

/**
 * @returns {string|null} a signed token, or null if the secret is unavailable.
 */
const issueToken = (slug) => {
  const secret = getSecret()
  if (!secret) return null

  const payload = base64url(
    JSON.stringify({ slug, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS })
  )
  return `${payload}.${sign(payload, secret)}`
}

/**
 * @returns {boolean} true only if the token is well-formed, correctly signed,
 *   unexpired, and issued for this exact slug.
 */
const verifyToken = (token, slug) => {
  const secret = getSecret()
  if (!secret || typeof token !== 'string') return false

  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, signature] = parts

  const expected = sign(payload, secret)
  // Compare as fixed-length buffers so the check is constant-time.
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false

  let claims
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return false
  }

  if (claims.slug !== slug) return false
  if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) return false

  return true
}

module.exports = { issueToken, verifyToken, TOKEN_TTL_SECONDS }
