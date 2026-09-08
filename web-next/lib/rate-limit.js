/**
 * In-memory rate limiting for the unauthenticated endpoints.
 *
 * PORTING NOTE — this one is not a verbatim port, and the behaviour improves.
 *
 * On Netlify this state lived in a Lambda container: it reset on every cold
 * start and was not shared between concurrent containers, which made it a
 * speed bump rather than a limit. This app runs as a single long-lived Node
 * process, so the map genuinely persists for the life of the server and the
 * limit actually holds. Restarting the container still clears it, which is the
 * remaining gap; back `hits` with Redis if you ever need a hard guarantee
 * across replicas.
 */

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
export const MAX_ATTEMPTS = 8
export { WINDOW_MS }

const hits = new Map()

const prune = (now) => {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key)
  }
}

/**
 * Resolve the caller's address from a Fetch API Request.
 *
 * SECURITY — this differs deliberately from the Netlify version, which read
 * `x-forwarded-for` and took the LEFTMOST entry. That entry is whatever the
 * client sent, so anyone could rotate it per request and bypass the limit
 * entirely.
 *
 * Behind a reverse proxy that appends (Traefik, which is what Coolify runs),
 * the RIGHTMOST entry is the address the proxy actually observed and is the
 * only one a client cannot forge. `x-real-ip` is set by the same proxy and is
 * preferred where present.
 *
 * If you ever run this with no proxy in front, both headers become
 * client-controlled and this degrades to best-effort again.
 */
const clientIp = (request) => {
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }

  return 'unknown'
}

/**
 * Records an attempt and reports whether the caller is over the limit.
 * @returns {{ limited: boolean, retryAfter: number }}
 */
export const consume = (request, bucket = 'default') => {
  const now = Date.now()
  prune(now)

  const key = `${bucket}:${clientIp(request)}`
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
export const reset = (request, bucket = 'default') => {
  hits.delete(`${bucket}:${clientIp(request)}`)
}
