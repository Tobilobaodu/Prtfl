import * as React from "react"
import loaderGif from "../Assets/loader/loader.gif"
import * as styles from "./PageLoader.module.css"

const LOADER_DURATION_MS = 2500
const FADE_DURATION_MS = 500

// Kept in sync with the pre-hydration script in gatsby-ssr.js.
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
  const [fading, setFading] = React.useState(false)

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

    const fadeTimer = setTimeout(() => {
      setFading(true)
      onDone?.()
    }, LOADER_DURATION_MS)

    const removeTimer = setTimeout(() => {
      setVisible(false)
    }, LOADER_DURATION_MS + FADE_DURATION_MS)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onDone])

  if (!visible) return null

  return (
    <div
      className={`js-page-loader ${styles.loader} ${fading ? styles.fading : ""}`}
      style={{ "--page-loader-fade": `${FADE_DURATION_MS}ms` }}
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
