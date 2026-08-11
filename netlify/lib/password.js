/**
 * Password verification for protected case studies.
 *
 * Stored values may be in either of two forms:
 *
 *   scrypt$<saltHex>$<hashHex>   - preferred, produced by scripts/hash-password.js
 *   <plaintext>                  - legacy, still accepted so existing Studio
 *                                  content keeps working during migration
 *
 * Both paths compare in constant time. Migrate legacy values with
 * `node scripts/hash-password.js` and paste the result into the project's
 * "Access Password" field in the Studio.
 */

const crypto = require('crypto')

const SCRYPT_KEYLEN = 64

const timingSafeEqualStr = (a, b) => {
  const bufA = Buffer.from(String(a), 'utf8')
  const bufB = Buffer.from(String(b), 'utf8')
  // timingSafeEqual throws on length mismatch, so hash both sides to a fixed
  // width first. This keeps the comparison constant-time regardless of length.
  const digestA = crypto.createHash('sha256').update(bufA).digest()
  const digestB = crypto.createHash('sha256').update(bufB).digest()
  return crypto.timingSafeEqual(digestA, digestB)
}

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex')
  return `scrypt$${salt}$${derived}`
}

/**
 * @returns {boolean} whether `candidate` matches the stored password value.
 */
const verifyPassword = (candidate, stored) => {
  if (typeof stored !== 'string' || stored.length === 0) return false
  if (typeof candidate !== 'string' || candidate.length === 0) return false

  if (stored.startsWith('scrypt$')) {
    const [, salt, expected] = stored.split('$')
    if (!salt || !expected) return false
    let derived
    try {
      derived = crypto.scryptSync(candidate, salt, SCRYPT_KEYLEN).toString('hex')
    } catch {
      return false
    }
    return timingSafeEqualStr(derived, expected)
  }

  return timingSafeEqualStr(candidate, stored)
}

module.exports = { hashPassword, verifyPassword }
