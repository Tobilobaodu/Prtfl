/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser.js
 */

import * as React from "react"
import SmoothScroll from "./src/components/SmoothScroll"
import { getLenis } from "./src/lib/lenis"

// wrapRootElement, not wrapPageElement: the latter remounts on every route
// change, which would destroy and rebuild Lenis on each navigation. There is no
// matching wrapper in gatsby-ssr.js because SmoothScroll renders bare children
// and emits no markup, so the server and client trees still agree.
export const wrapRootElement = ({ element }) => (
  <SmoothScroll>{element}</SmoothScroll>
)

/**
 * Resync Lenis after a navigation.
 *
 * Lenis keeps its own animated scroll value. Gatsby sets window.scrollY
 * directly on route change — to the top going forward, to the restored offset
 * going back — and Lenis never sees it, so the next wheel event would ease from
 * its stale value and snap the page back to where the previous route was.
 *
 * Syncing to whatever Gatsby chose (rather than forcing zero) gets forward and
 * back navigation right with the same line. rAF defers until after Gatsby's own
 * scroll update has landed.
 */
export const onRouteUpdate = () => {
  requestAnimationFrame(() => {
    // force: true because scrollTo is a no-op while Lenis is stopped, which it
    // is whenever the locked-project modal is open.
    getLenis()?.scrollTo(window.scrollY, { immediate: true, force: true })
  })
}
