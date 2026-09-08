'use client'

import { useEffect } from 'react'
import { acquireLenis, releaseLenis, setReducedMotion } from '../lib/lenis'

/**
 * Mounts the site's Lenis instance for as long as the app is on screen.
 *
 * Ported from the Gatsby version with one deliberate simplification: Gatsby
 * needed `wrapRootElement` (not `wrapPageElement`) plus an `onRouteUpdate` hook
 * that re-synced Lenis after every navigation, because Gatsby set window.scrollY
 * directly and Lenis never saw it. In the App Router the root layout does not
 * remount across navigation, so the instance simply survives — that resync hook
 * has no equivalent here and is not needed.
 *
 * The instance itself is owned by ../lib/lenis, which refcounts it. That
 * refcounting is what makes this safe under React Strict Mode, where the effect
 * runs twice in development — a guard local to the effect would build two
 * instances.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)

    // Reported before acquiring, so a reduced-motion visitor never has an
    // instance constructed at all.
    sync()
    acquireLenis()

    // Listening for changes means toggling the OS setting takes effect without
    // a reload.
    query.addEventListener('change', sync)

    return () => {
      query.removeEventListener('change', sync)
      releaseLenis()
    }
  }, [])

  return children
}
