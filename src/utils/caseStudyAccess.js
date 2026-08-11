/**
 * Client-side helpers for unlocking password-protected case studies.
 *
 * Tokens are held in sessionStorage, scoped per slug, and are only meaningful
 * to the server (they are HMAC-signed). Clearing the tab clears access.
 */

const storageKey = (slug) => `case_study_token:${slug}`

const canUseStorage = () => typeof window !== 'undefined' && !!window.sessionStorage

export const getStoredToken = (slug) => {
  if (!slug || !canUseStorage()) return null
  try {
    return window.sessionStorage.getItem(storageKey(slug))
  } catch {
    return null
  }
}

export const storeToken = (slug, token) => {
  if (!slug || !token || !canUseStorage()) return
  try {
    window.sessionStorage.setItem(storageKey(slug), token)
  } catch {
    // Private browsing / storage disabled — access just won't survive a reload.
  }
}

export const clearToken = (slug) => {
  if (!slug || !canUseStorage()) return
  try {
    window.sessionStorage.removeItem(storageKey(slug))
  } catch {
    // no-op
  }
}

/**
 * Exchanges a password for an access token.
 * @returns {Promise<{ success: boolean, token?: string, error?: string }>}
 */
export const requestAccess = async (slug, password) => {
  const res = await fetch('/.netlify/functions/verify-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, password }),
  })

  if (res.status === 429) {
    return { success: false, error: 'Too many attempts. Please try again in a few minutes.' }
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  if (!res.ok) {
    return { success: false, error: data.error || 'Something went wrong. Please try again.' }
  }

  if (data.success && data.token) {
    storeToken(slug, data.token)
    return { success: true, token: data.token }
  }

  return { success: false, error: 'Incorrect password. Please try again.' }
}

/**
 * Fetches protected case study content using a previously issued token.
 * @returns {Promise<{ caseStudy?: object, expired?: boolean, error?: string }>}
 */
export const fetchProtectedCaseStudy = async (slug, token) => {
  if (!token) return { expired: true }

  let res
  try {
    res = await fetch('/.netlify/functions/get-case-study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, token }),
    })
  } catch {
    return { error: 'Unable to load this case study. Please check your connection.' }
  }

  if (res.status === 401) {
    clearToken(slug)
    return { expired: true }
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    return { error: 'Unable to load this case study.' }
  }

  if (!res.ok) return { error: data.error || 'Unable to load this case study.' }

  return { caseStudy: data.caseStudy }
}
