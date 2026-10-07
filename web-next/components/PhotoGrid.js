'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { getLenis } from "../lib/lenis"
import { GROW_POINTS, GROW_DURATION_MS, curveAt } from "../lib/curves"

/**
 * The photography grid, plus the expanded view a tapped photo grows into.
 *
 * The grow is the shared-element "tapped card" from motion.dev's App Store
 * example: the photo appears to lift out of its slot in the grid and grow into a
 * centred view while the page dims behind it, then shrink back into the same
 * slot on close. The grid itself is untouched — its markup and sizes are the
 * page's own.
 *
 * The frame is laid out once, at its expanded size, and only its transform
 * moves — the same technique Motion uses for that example. It used to animate
 * left/top/width/height instead; layout snaps those to whole pixels, so in the
 * slow last third of the curve, where the photo moves under a pixel a frame,
 * it crept in visible steps and read as rigid. A transform moves in sub-pixel
 * steps on the compositor.
 *
 * A grid photo below 480px is a 400px-tall crop (object-fit: cover) while the
 * expanded one is the whole photo, so the two boxes differ in aspect ratio and
 * scaling the frame alone would squash the image. The image inside therefore
 * takes a counter-scale each frame that keeps it covering the frame at its true
 * aspect — the crop opens out instead of the picture stretching.
 */

// Space around the expanded photo, by viewport width.
const edgeFor = (vw) => (vw <= 480 ? 16 : vw <= 768 ? 24 : 40)
// Room kept below the photo for the caption.
const CAPTION_ROW = 52
// The close button's corner (see .photo-view-close): 16px inset, 40px square.
const CLOSE_ZONE = 16 + 40 + 8

const BACKDROP_FADE_MS = 200

const podOf = (img) => img.closest(".image-pod") ?? img

function rectOf(el) {
  const r = el.getBoundingClientRect()
  return { left: r.left, top: r.top, width: r.width, height: r.height }
}

/** The largest box of the photo's aspect ratio that fits the viewport. */
function expandedRect(img) {
  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const edge = edgeFor(vw)

  const aspect =
    img.naturalWidth && img.naturalHeight
      ? img.naturalWidth / img.naturalHeight
      : img.clientWidth / Math.max(1, img.clientHeight)

  // Centre the photo and its caption together in the space between `topEdge`
  // and the bottom edge.
  const fit = (topEdge) => {
    const maxW = vw - edge * 2
    const maxH = Math.max(120, vh - topEdge - edge - CAPTION_ROW)
    let width = maxW
    let height = width / aspect
    if (height > maxH) {
      height = maxH
      width = height * aspect
    }
    const free = vh - topEdge - edge - (height + CAPTION_ROW)
    return { left: (vw - width) / 2, top: topEdge + Math.max(0, free / 2), width, height }
  }

  // Use the whole height unless that puts the photo under the close button —
  // reserving a row for it up front shrank photos on short landscape screens
  // where they never came near it.
  const full = fit(edge)
  const hitsClose = full.top < CLOSE_ZONE && full.left + full.width > vw - CLOSE_ZONE
  return hitsClose ? fit(Math.max(edge, CLOSE_ZONE)) : full
}

const px = (r) => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
})

/** Lays the frame out at its expanded rect, and the caption directly under it. */
function place(frame, caption, layout) {
  Object.assign(frame.style, px(layout))
  if (caption) {
    Object.assign(caption.style, {
      left: `${layout.left}px`,
      top: `${layout.top + layout.height}px`,
      width: `${layout.width}px`,
    })
  }
}

/**
 * Shows the frame, laid out at `layout`, as if it were the box `box`: a
 * translate + scale on the frame, a counter-scale on the image so it covers
 * that box at its own aspect, and a corrected corner radius so the corners stay
 * round under a non-uniform scale.
 */
function paintBox(frame, img, layout, box, radius) {
  const sx = box.width / layout.width
  const sy = box.height / layout.height
  frame.style.transform = `translate3d(${box.left - layout.left}px, ${box.top - layout.top}px, 0) scale(${sx}, ${sy})`
  const cover = Math.max(sx, sy)
  img.style.transform = `scale(${cover / sx}, ${cover / sy})`
  frame.style.borderRadius = radius ? `${radius / sx}px / ${radius / sy}px` : ""
}

/**
 * Moves the frame from box `from` to box `to` along the sampled grow curve.
 * Paints the first frame synchronously, so the caller can start it before
 * paint. Returns a cancel function.
 */
function runGrow({ frame, img, layout, from, to, radius, onDone }) {
  const lerp = (a, b, p) => a + (b - a) * p
  const start = performance.now()
  let raf = 0

  const step = (now) => {
    const t = Math.max(0, now - start) / GROW_DURATION_MS
    const p = curveAt(GROW_POINTS, t)
    paintBox(frame, img, layout, {
      left: lerp(from.left, to.left, p),
      top: lerp(from.top, to.top, p),
      width: lerp(from.width, to.width, p),
      height: lerp(from.height, to.height, p),
    }, radius)
    if (t < 1) raf = requestAnimationFrame(step)
    else onDone()
  }

  step(start)
  return () => cancelAnimationFrame(raf)
}

export default function PhotoGrid({ photos }) {
  // { index, phase: "opening" | "open" | "closing" } while the view is up.
  const [active, setActive] = React.useState(null)
  const [mounted, setMounted] = React.useState(false)

  const imgRefs = React.useRef([])
  const openerRefs = React.useRef([])
  const frameRef = React.useRef(null)
  const frameImgRef = React.useRef(null)
  const radiusRef = React.useRef(0)
  // The rect the frame is laid out at while up — its untransformed box.
  const layoutRef = React.useRef(null)
  const backdropRef = React.useRef(null)
  const captionRef = React.useRef(null)
  const closeRef = React.useRef(null)

  React.useEffect(() => setMounted(true), [])

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const open = (index) => {
    if (active) return
    setActive({ index, phase: "opening" })
  }

  const close = React.useCallback(() => {
    setActive((a) => (a && a.phase === "open" ? { ...a, phase: "closing" } : a))
  }, [])

  // Opening: runs before paint, so the frame is never seen at its end size
  // before the grow starts from the grid slot.
  React.useLayoutEffect(() => {
    if (active?.phase !== "opening") return
    const source = imgRefs.current[active.index]
    const frame = frameRef.current
    const img = frameImgRef.current
    if (!source || !frame || !img) return

    const from = rectOf(source)
    const layout = expandedRect(source)
    radiusRef.current = parseFloat(getComputedStyle(source).borderTopLeftRadius) || 0
    layoutRef.current = layout
    place(frame, captionRef.current, layout)
    // The grid item hides while its copy is up, so it reads as one photo
    // leaving its slot rather than a second one appearing on top — and its
    // caption does not show through under the expanded one.
    podOf(source).style.visibility = "hidden"

    let cancelled = false
    let cancelGrow = () => {}
    const settle = () => {
      if (!cancelled) setActive((a) => (a ? { ...a, phase: "open" } : a))
    }

    const reduced = reducedMotion()
    if (reduced) {
      paintBox(frame, img, layout, layout, radiusRef.current)
      frame
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: BACKDROP_FADE_MS, easing: "ease-out" })
        .finished.then(settle, () => {})
    } else {
      cancelGrow = runGrow({ frame, img, layout, from, to: layout, radius: radiusRef.current, onDone: settle })
    }

    // The dim starts a beat after the photo moves, as in the original.
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: BACKDROP_FADE_MS,
      delay: reduced ? 0 : 100,
      easing: "ease-out",
      fill: "backwards",
    })
    captionRef.current?.animate(
      [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }],
      { duration: 250, delay: reduced ? 0 : GROW_DURATION_MS - 150, easing: "ease-out", fill: "backwards" }
    )

    return () => {
      cancelled = true
      cancelGrow()
    }
  }, [active?.phase, active?.index])

  // Closing: the same curve back into the slot the photo came from.
  React.useEffect(() => {
    if (active?.phase !== "closing") return
    const source = imgRefs.current[active.index]
    const frame = frameRef.current
    const img = frameImgRef.current
    if (!source || !frame || !img) return

    const layout = layoutRef.current
    if (!layout) return

    let cancelled = false
    let cancelShrink = () => {}
    const finish = () => {
      if (cancelled) return
      podOf(source).style.visibility = ""
      setActive(null)
    }

    const reduced = reducedMotion()
    if (reduced) {
      frame
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: BACKDROP_FADE_MS, easing: "ease-in", fill: "forwards" })
        .finished.then(finish, () => {})
    } else {
      cancelShrink = runGrow({
        frame,
        img,
        layout,
        from: layout,
        to: rectOf(source),
        radius: radiusRef.current,
        onDone: finish,
      })
    }

    backdropRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: BACKDROP_FADE_MS,
      delay: reduced ? 0 : 70,
      easing: "ease-in",
      fill: "forwards",
    })
    captionRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 120,
      easing: "ease-in",
      fill: "forwards",
    })

    return () => {
      cancelled = true
      cancelShrink()
    }
  }, [active?.phase, active?.index])

  // Scroll lock, focus and keys for as long as the view is up. Same lock as
  // LockedProjectModal — see the notes there for why it is <html> plus Lenis.
  const isUp = active !== null
  const activeIndex = active?.index
  React.useEffect(() => {
    if (!isUp) return

    const rootStyle = document.documentElement.style
    const originalOverflow = document.body.style.overflow
    const originalRootOverflow = rootStyle.overflow
    document.body.style.overflow = "hidden"
    rootStyle.overflow = "hidden"
    getLenis()?.stop()

    closeRef.current?.focus({ preventScroll: true })

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        close()
      } else if (e.key === "Tab") {
        // The close button is the only focusable control; keep focus on it.
        e.preventDefault()
        closeRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = originalOverflow
      rootStyle.overflow = originalRootOverflow
      getLenis()?.start()
      openerRefs.current[activeIndex]?.focus({ preventScroll: true })
    }
  }, [isUp, activeIndex, close])

  // Keep the expanded photo fitted if the viewport changes while it is open
  // (rotating a phone, resizing a window).
  React.useEffect(() => {
    if (active?.phase !== "open") return
    const onResize = () => {
      const source = imgRefs.current[active.index]
      const frame = frameRef.current
      if (!source || !frame || !frameImgRef.current) return
      const layout = expandedRect(source)
      layoutRef.current = layout
      place(frame, captionRef.current, layout)
      paintBox(frame, frameImgRef.current, layout, layout, radiusRef.current)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [active?.phase, active?.index])

  const photo = active ? photos[active.index] : null

  return (
    <>
      <div className="images-grid">
        {photos.map((p, index) => (
          // The whole pod is the tap target; the button inside it is what the
          // keyboard reaches, and its click bubbles up to the same handler.
          <div key={index} className="image-pod" onClick={() => open(index)}>
            <button
              ref={(el) => (openerRefs.current[index] = el)}
              type="button"
              className="photo-open"
              aria-label={`View ${p.name || "photo"} larger`}
              aria-haspopup="dialog"
            >
              <img
                ref={(el) => (imgRefs.current[index] = el)}
                src={p.image.asset.url}
                alt={p.name || "Photo"}
                className="photo-image"
              />
            </button>
            <div className="photo-info">
              <h3 className="photo-title">{p.name}</h3>
              <div className="photo-location">
                <img src="/Location.svg" alt="Location" className="location-icon" />
                <span>{p.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted &&
        photo &&
        createPortal(
          <div
            className="photo-view"
            role="dialog"
            aria-modal="true"
            aria-label={photo.name || "Photo"}
          >
            <div ref={backdropRef} className="photo-view-backdrop" onClick={close} />
            <button
              ref={closeRef}
              type="button"
              className="photo-view-close"
              onClick={close}
              aria-label="Close photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.5 4.5V10.5H19.5V13.5H13.5V19.5H10.5V13.5H4.5V10.5H10.5V4.5H13.5Z" fill="#EE550E" stroke="#EE550E" transform="rotate(45 12 12)" />
              </svg>
            </button>
            <div ref={frameRef} className="photo-view-frame" onClick={close}>
              <img ref={frameImgRef} src={photo.image.asset.url} alt={photo.name || "Photo"} />
            </div>
            {/* Outside the frame, so the frame's scale never stretches the text. */}
            <div ref={captionRef} className="photo-view-caption">
              <p className="photo-title">{photo.name}</p>
              <div className="photo-location">
                <img src="/Location.svg" alt="" className="location-icon" />
                <span>{photo.location}</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
