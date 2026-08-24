import * as React from "react"
import { sanityImageUrl } from "../utils/sanityImage"
import * as styles from "./HoverReel.module.css"

// The card is sized in vw (see --reel-size), topping out at 400px; 800 covers
// that on a 2x display. Square crop, so the strip cells never letterbox.
const THUMB_SIZE = 800
const THUMB_QUALITY = 72

// Exponential-smoothing rates, in "per second". The pill is faster than the
// card, and the gap between the two is most of the character of the effect —
// the pill leads, the card trails by ~25px during a fast move, and they
// converge exactly when the pointer stops.
//
// These are expressed as lambdas rather than per-frame factors on purpose. A
// fixed per-frame factor makes the whole effect run at the refresh rate: the
// old k=0.14 closed 90% of the gap in 254ms at 60Hz but 106ms at 144Hz. With
// `1 - exp(-lambda * dt)` the card takes 420ms and the pill 230ms on every
// display, which is what the reference measures.
const CARD_LAMBDA = 5.5
const PILL_LAMBDA = 10

// A single dropped frame (or a backgrounded tab) must not hand the smoothing a
// dt so large that it saturates to 1 and teleports the card.
const MAX_FRAME = 0.1

// Where the card should sit when a row is reached by keyboard rather than by
// pointer. The row's own centre, not a fixed inset: the followers are centred
// on their target, and the card is now sized in vw, so any constant offset
// that suited one card width would push the card off the gutter at another.

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
 * `active` is `{ id, el }` — `el` is set only when the row was reached by
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
  const prevTime = React.useRef(0)

  // Set once, on the first pointer position of the page's life, and never
  // reset. Between hovers the followers keep their last position and ease in
  // from there, so re-entering the list quickly makes the card fly in from
  // wherever it was left rather than popping onto the cursor. Without the
  // one-time seed the very first hover would fly in from the viewport corner.
  const hasPosition = React.useRef(false)

  // The row a keyboard user is focused on, re-read every frame so the card
  // stays with the row if the page scrolls while focus is held.
  const anchor = React.useRef(null)

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

  // The strip holds its last position when nothing is active, so leaving the
  // list never sends the imagery travelling back to the first cell — it simply
  // scales out on whichever project it was showing.
  const lastIndex = React.useRef(0)
  React.useEffect(() => {
    if (activeIndex >= 0) lastIndex.current = activeIndex
  }, [activeIndex])
  const reelIndex = activeIndex >= 0 ? activeIndex : lastIndex.current

  // Pointer position is kept in a ref and written straight to the DOM below.
  // Putting it in state would re-render the whole list on every mouse move.
  React.useEffect(() => {
    if (!enabled) return

    const handleMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!hasPosition.current) {
        cardPos.current = { ...target.current }
        pillPos.current = { ...target.current }
        hasPosition.current = true
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMove)
  }, [enabled])

  // A row reached by Tab has no cursor to follow, so aim at the row itself.
  React.useEffect(() => {
    anchor.current = active?.el || null
    if (!anchor.current) return

    aimAtAnchor(anchor.current, target)
    if (!hasPosition.current) {
      cardPos.current = { ...target.current }
      pillPos.current = { ...target.current }
      hasPosition.current = true
    }
  }, [active])

  React.useEffect(() => {
    if (!visible) return

    // A fresh loop has no previous timestamp; skip the first frame's step
    // rather than integrating against a stale one from the last hover.
    prevTime.current = 0

    const tick = (now) => {
      const dt = prevTime.current ? Math.min((now - prevTime.current) / 1000, MAX_FRAME) : 0
      prevTime.current = now

      // Reduced motion drops the lag entirely: the followers sit on the target.
      const cardK = reduced ? 1 : 1 - Math.exp(-CARD_LAMBDA * dt)
      const pillK = reduced ? 1 : 1 - Math.exp(-PILL_LAMBDA * dt)

      if (anchor.current) aimAtAnchor(anchor.current, target)

      cardPos.current.x += (target.current.x - cardPos.current.x) * cardK
      cardPos.current.y += (target.current.y - cardPos.current.y) * cardK
      pillPos.current.x += (target.current.x - pillPos.current.x) * pillK
      pillPos.current.y += (target.current.y - pillPos.current.y) * pillK

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

  const offset = (reelIndex / projects.length) * 100

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
        {/* No lock glyph here: at 42px there is no room beside the label, and
            the row's own .project-meta already carries a lock for locked
            projects, so nothing is lost. */}
        <div className={styles.pillInner}>View</div>
      </div>
    </>
  )
}

// Module scope rather than a component-level callback: it closes over nothing,
// and both the focus effect and the rAF loop need it.
function aimAtAnchor(el, target) {
  const rect = el.getBoundingClientRect()
  target.current.x = rect.left + rect.width / 2
  target.current.y = rect.top + rect.height / 2
}

export default HoverReel
