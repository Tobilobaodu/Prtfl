'use client'

import * as React from "react"
// Served from public/, not bundled: Next resolves /loader/loader.gif at runtime.
const loaderGif = "/loader/loader.gif"
import * as styles from "./PageLoader.module.css"

const LOADER_DURATION_MS = 10000

// The exit is a parallax, not a fade: the panel and the two layers inside it
// travel at different rates (see PageLoader.module.css). That needs longer than
// a flat slide to read as depth rather than as lag — under ~800ms the offset
// between layers is too brief to register.
const EXIT_DURATION_MS = 1100

// Kept in sync with LOADER_SKIP_SCRIPT in app/layout.js.
export const LOADER_SESSION_KEY = "loader_shown"

/**
 * Intro loader, shown once per browser session.
 *
 * The markup is rendered during SSR so it is painted immediately rather than
 * appearing after hydration. Repeat visits within the same session are handled
 * by the inline script in gatsby-ssr.js, which sets `loader-skip` on <html>
 * before first paint — so the loader never flashes for them. This effect then
 * unmounts it. (Previously `visible` was initialised to false and never set,
 * which meant the loader never rendered at all.)
 */
const PageLoader = ({ onDone }) => {
  const [visible, setVisible] = React.useState(true)
  const [exiting, setExiting] = React.useState(false)

  /**
   * Re-applies the skip class that LOADER_SKIP_SCRIPT set before first paint.
   *
   * This is a no-op in production and exists only for development. React Strict
   * Mode remounts once, and on that remount it resets <html> to just the
   * attributes it manages from JSX — which drops the class the inline script
   * added, letting the loader flash on a repeat visit that should have skipped
   * it. Documented in next/dist/docs/01-app/02-guides/preventing-flash-before-
   * hydration.md under "Re-applying attributes in development".
   *
   * useLayoutEffect, not useEffect: this has to land before paint, or it is
   * restoring the class after the flash it exists to prevent.
   */
  React.useLayoutEffect(() => {
    try {
      if (window.sessionStorage.getItem(LOADER_SESSION_KEY) === "true") {
        document.documentElement.classList.add("loader-skip")
      }
    } catch {
      // Storage unavailable — treat as first visit and let the loader run.
    }
  }, [])

  React.useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = window.sessionStorage.getItem(LOADER_SESSION_KEY) === "true"
    } catch {
      // Storage unavailable — treat as first visit.
    }

    if (alreadyShown) {
      setVisible(false)
      onDone?.()
      return
    }

    try {
      window.sessionStorage.setItem(LOADER_SESSION_KEY, "true")
    } catch {
      // no-op
    }

    const exitTimer = setTimeout(() => {
      setExiting(true)
      onDone?.()
    }, LOADER_DURATION_MS)

    const removeTimer = setTimeout(() => {
      setVisible(false)
    }, LOADER_DURATION_MS + EXIT_DURATION_MS)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [onDone])

  if (!visible) return null

  return (
    <div
      className={`js-page-loader ${styles.loader} ${exiting ? styles.exiting : ""}`}
      style={{ "--page-loader-exit": `${EXIT_DURATION_MS}ms` }}
      role="status"
      aria-live="polite"
    >
      <div className={styles.center}>
        <img src={loaderGif} alt="" className={styles.gif} />
      </div>
      <p className={styles.tagline}>
        Passionate about design and technology,
        <br />
        and how they both shape our lives.
      </p>
    </div>
  )
}

export default PageLoader
