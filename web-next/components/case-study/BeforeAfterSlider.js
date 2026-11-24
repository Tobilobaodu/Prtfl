"use client"

import * as React from "react"
import { sanityImageUrl, sanityImageSrcSet } from "../../utils/sanityImage"
import * as styles from "./blocks.module.css"
import { DemoLink } from "./LiveDemoLink"

const clamp = (n) => Math.min(100, Math.max(0, n))

/** Left and right chevrons on the handle. */
const Chevrons = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 7l-5 5 5 5" />
    <path d="M15 7l5 5-5 5" />
  </svg>
)

/**
 * Before and after in one frame. The after image sits underneath; the before
 * image sits on top, clipped to the left of the divider. Dragging anywhere in
 * the frame moves the divider (pointer events, so mouse, pen and touch alike).
 *
 * touch-action: pan-y keeps vertical page scrolling working on phones while a
 * sideways drag moves the divider. The handle is a role="slider", so it takes
 * focus and the arrow keys (Shift for bigger steps), Home and End.
 *
 * The frame takes the after image's aspect ratio from its asset metadata when
 * the query supplies it, otherwise 16:10. Both images cover the frame.
 */
const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  demo,
  linkUrl,
  linkLabel,
}) => {
  const [pos, setPos] = React.useState(50)
  const [dragging, setDragging] = React.useState(false)
  const frameRef = React.useRef(null)

  const beforeUrl = beforeImage?.asset?.url
  const afterUrl = afterImage?.asset?.url
  if (!beforeUrl || !afterUrl) return null

  const ratio = afterImage?.asset?.metadata?.dimensions?.aspectRatio || 16 / 10

  const moveTo = (clientX) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect?.width) return
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => {
    if (dragging) moveTo(e.clientX)
  }
  const endDrag = () => setDragging(false)

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    const next = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      Home: 0,
      End: 100,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setPos(clamp(next))
  }

  const img = (url, alt, className) => (
    <img
      className={className}
      src={sanityImageUrl(url, { width: 1280 })}
      srcSet={sanityImageSrcSet(url)}
      sizes="(max-width: 1199px) 100vw, 910px"
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )

  return (
    <figure className={`${styles.block} ${styles.ba}`}>
      <div
        ref={frameRef}
        className={dragging ? `${styles.baFrame} ${styles.baDragging}` : styles.baFrame}
        style={{ aspectRatio: ratio, "--ba-pos": `${pos}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {img(afterUrl, afterImage?.alt || afterLabel, styles.baImage)}
        {img(beforeUrl, beforeImage?.alt || beforeLabel, `${styles.baImage} ${styles.baBefore}`)}

        {/* Each label fades as the divider covers it. */}
        {beforeLabel && (
          <span className={`${styles.baLabel} ${styles.baLabelBefore}`} style={{ opacity: pos < 18 ? 0 : 1 }}>
            {beforeLabel}
          </span>
        )}
        {afterLabel && (
          <span className={`${styles.baLabel} ${styles.baLabelAfter}`} style={{ opacity: pos > 82 ? 0 : 1 }}>
            {afterLabel}
          </span>
        )}

        <div className={styles.baDivider} aria-hidden="true" />
        <div
          className={styles.baHandle}
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel || "before"} and ${afterLabel || "after"}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${beforeLabel || "before"}`}
          onKeyDown={onKeyDown}
        >
          <Chevrons />
        </div>
      </div>
      {(caption || demo || linkUrl) && (
        <figcaption className={`${styles.demoRow} ${styles.baCaption}`}>
          {caption && <span className={styles.footnote}>{caption}</span>}
          <DemoLink demo={demo} linkUrl={linkUrl} linkLabel={linkLabel} />
        </figcaption>
      )}
    </figure>
  )
}

export default BeforeAfterSlider
