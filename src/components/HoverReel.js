import * as React from "react"
import { sanityImageUrl } from "../utils/sanityImage"
import * as styles from "./HoverReel.module.css"

// Rendered size is 260px (see --reel-size); 640 covers a 2x display with room
// to spare. Square crop, so the strip cells never letterbox.
const THUMB_SIZE = 640
const THUMB_QUALITY = 72

// How much of the remaining distance each follower closes per frame. The pill
// is faster than the card, which is what produces the trailing-card feel.
const CARD_EASE = 0.14
const PILL_EASE = 0.32

// Roughly where the card should sit when a row is reached by keyboard rather
// than by pointer: just inside the row, vertically centred on it.
const FOCUS_ANCHOR_X = 140

const LockGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337Z"
      fill="currentColor"
    />
  </svg>
)

const thumbFor = (project) => {
  const image = project?.hoverImage?.asset ? project.hoverImage : project?.heroImage
  const url = image?.asset?.url
  return {
    src: url
      ? sanityImageUrl(url, {
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          fit: "crop",
          quality: THUMB_QUALITY,
        })
      : null,
    // Sanity ships a dominant colour with every asset, so a thumbnail that has
    // not arrived yet degrades to a solid swatch rather than a white hole —
    // which matters most while the strip is sliding past it.
    background: image?.asset?.metadata?.palette?.dominant?.background || undefined,
  }
}

/**
 * A pointer-following preview for a list of projects.
 *
 * `active` is `{ id, rect }` — `rect` is set only when the row was reached by
 * keyboard, in which case the followers anchor to the row instead of the
 * cursor. Pass null when nothing is hovered.
 *
 * Decorative: the whole thing is aria-hidden and pointer-events: none, so it
 * never intercepts a click meant for the row underneath.
 */
const HoverReel = ({ projects = [], active = null }) => {
  const cardRef = React.useRef(null)
  const pillRef = React.useRef(null)

  const target = React.useRef({ x: 0, y: 0 })
  const cardPos = React.useRef({ x: 0, y: 0 })
  const pillPos = React.useRef({ x: 0, y: 0 })
  const frame = React.useRef(null)
  const seeded = React.useRef(false)

  // Resolved on the client only, so the server and the first client render
  // agree (both render nothing) and hydration stays clean.
  const [enabled, setEnabled] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const sync = () => {
      setEnabled(hover.matches)
      setReduced(motion.matches)
    }
    sync()

    hover.addEventListener("change", sync)
    motion.addEventListener("change", sync)
    return () => {
      hover.removeEventListener("change", sync)
      motion.removeEventListener("change", sync)
    }
  }, [])

  const activeIndex = active ? projects.findIndex((p) => p.id === active.id) : -1
  const visible = enabled && activeIndex >= 0
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null

  // Pointer position is kept in a ref and written straight to the DOM below.
  // Putting it in state would re-render the whole list on every mouse move.
  React.useEffect(() => {
    if (!enabled) return

    const handleMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMove)
  }, [enabled])

  // A row reached by Tab has no cursor to follow, so aim at the row itself.
  React.useEffect(() => {
    if (!active?.rect) return
    target.current.x = active.rect.left + FOCUS_ANCHOR_X
    target.current.y = active.rect.top + active.rect.height / 2
    seeded.current = false
  }, [active])

  React.useEffect(() => {
    if (!visible) {
      seeded.current = false
      return
    }

    // Appear at the cursor rather than gliding in from wherever the last hover
    // ended, which would read as a stray element flying across the page.
    if (!seeded.current) {
      cardPos.current = { ...target.current }
      pillPos.current = { ...target.current }
      seeded.current = true
    }

    const cardEase = reduced ? 1 : CARD_EASE
    const pillEase = reduced ? 1 : PILL_EASE

    const tick = () => {
      cardPos.current.x += (target.current.x - cardPos.current.x) * cardEase
      cardPos.current.y += (target.current.y - cardPos.current.y) * cardEase
      pillPos.current.x += (target.current.x - pillPos.current.x) * pillEase
      pillPos.current.y += (target.current.y - pillPos.current.y) * pillEase

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${pillPos.current.x}px, ${pillPos.current.y}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [visible, reduced])

  // Nothing to preview, or a device with no pointer to follow.
  if (!enabled || projects.length === 0) return null

  const offset = activeIndex >= 0 ? (activeIndex / projects.length) * 100 : 0

  return (
    <>
      <div
        ref={cardRef}
        className={`${styles.card} ${visible ? styles.isVisible : ""}`}
        aria-hidden="true"
      >
        <div className={styles.cardInner}>
          <div className={styles.reel} style={{ transform: `translateY(-${offset}%)` }}>
            {projects.map((project) => {
              const { src, background } = thumbFor(project)
              return (
                <div key={project.id} className={styles.cell} style={{ background }}>
                  {src && (
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      // Never let ten previews compete with the LCP image.
                      fetchPriority="low"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div
        ref={pillRef}
        className={`${styles.pill} ${visible ? styles.isVisible : ""}`}
        aria-hidden="true"
      >
        <div className={styles.pillInner}>
          {activeProject?.locked && <LockGlyph />}
          <span>View</span>
        </div>
      </div>
    </>
  )
}

export default HoverReel
