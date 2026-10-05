'use client'

import * as React from "react"
import { subscribe } from "../lib/ticker"
import * as styles from "./ScrollProgress.module.css"

/**
 * Reading-progress bar pinned to the bottom of the viewport.
 *
 * The same thing motion/react's useScroll + scaleX does, without pulling that
 * library in for one bar. It runs on the shared ticker at default priority, so
 * it reads the scroll offset after Lenis has written it for the frame — a
 * separate scroll listener would trail the smoothed scroll by a frame.
 *
 * Writes the transform straight to the DOM rather than through state: this
 * changes every frame while scrolling, and a re-render per frame would be the
 * whole cost of the component.
 */
export default function ScrollProgress() {
  const barRef = React.useRef(null)

  React.useEffect(() => {
    let last = -1

    return subscribe(() => {
      const el = barRef.current
      if (!el) return

      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      // Skip the style write on idle frames — the ticker runs every frame
      // whether or not anything scrolled.
      if (Math.abs(progress - last) < 0.0005) return
      last = progress
      el.style.transform = `scaleX(${progress})`
    })
  }, [])

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />
}
