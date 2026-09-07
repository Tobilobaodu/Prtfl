import * as React from "react"
import { acquireLenis, releaseLenis, setReducedMotion } from "../lib/lenis"

/**
 * Mounts the site's Lenis instance for as long as the app is on screen.
 *
 * The instance itself is owned by ../lib/lenis, which refcounts it — this
 * component only declares that someone wants smooth scroll and reports the
 * visitor's motion preference. That split matters because Gatsby mounts the
 * wrapRootElement tree twice, so this effect runs twice with no cleanup in
 * between; a guard local to the effect would build two Lenis instances.
 *
 * Lenis intercepts wheel input and drives the *real* document scroll via rAF,
 * as opposed to Locomotive-style virtual scroll which translates a wrapper and
 * leaves the document at zero. That distinction is why nothing else on the site
 * needed changing: position: fixed still works for all five fixed elements (the
 * nav, the menu panel, the menu overlay, and the HoverReel card and pill), the
 * scroll listener in layout.js still fires, the case-study IntersectionObserver
 * still resolves, and find-in-page and scroll restoration remain the browser's
 * job.
 *
 * Rendered from wrapRootElement in gatsby-browser.js, which persists across
 * route changes — wrapPageElement remounts per navigation. It emits no markup
 * of its own, so gatsby-ssr.js needs no matching wrapper.
 */
const SmoothScroll = ({ children }) => {
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(query.matches)

    // Reported before acquiring, so a reduced-motion visitor never has an
    // instance constructed at all.
    sync()
    acquireLenis()

    // Listening for changes means toggling the OS setting takes effect without
    // a reload.
    query.addEventListener("change", sync)

    return () => {
      query.removeEventListener("change", sync)
      releaseLenis()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
