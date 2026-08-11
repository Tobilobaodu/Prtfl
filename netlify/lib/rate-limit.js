/**
 * Best-effort in-memory rate limiting for unauthenticated endpoints.
 *
 * State lives in the Lambda container, so it persists across warm invocations
 * but resets on cold start and is not shared between concurrent containers.
 * That makes this a speed bump rather than a hard guarantee — it raises the
 * cost of a brute-force run by orders of magnitude without adding a datastore.
 * If stronger guarantees are needed later, back `hits` with Upstash/Redis.
 */

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_ATTEMPTS = 8

const hits = new Map()

const prune = (now) => {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key)
  }
}

const clientIp = (event) =>
  event.headers?.['x-nf-client-connection-ip'] ||
  event.headers?.['client-ip'] ||
  (event.headers?.['x-forwarded-for'] || '').split(',')[0].trim() ||
  'unknown'

/**
 * Records an attempt and reports whether the caller is over the limit.
 * @returns {{ limited: boolean, retryAfter: number }}
 */
const consume = (event, bucket = 'default') => {
  const now = Date.now()
  prune(now)

  const key = `${bucket}:${clientIp(event)}`
  const entry = hits.get(key)

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { limited: false, retryAfter: 0 }
  }

  entry.count += 1
  if (entry.count > MAX_ATTEMPTS) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  return { limited: false, retryAfter: 0 }
}

/** Clears the counter for a caller — called after a successful unlock. */
const reset = (event, bucket = 'default') => {
  hits.delete(`${bucket}:${clientIp(event)}`)
}

module.exports = { consume, reset, MAX_ATTEMPTS, WINDOW_MS }
