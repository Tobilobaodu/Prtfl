'use client'

import * as React from "react"

/**
 * Paints the spacing around every component on /cs-components/: the space
 * between each pair of neighbours in orange with its size in a pill, and
 * padding that reads as empty space in green.
 *
 * Every figure is read back from the rendered page, never restated from the
 * stylesheets. The space between two components is measured box to box, so
 * it is right whatever produces it (the column's gap, a stray margin, a
 * spacer) and cannot drift from what the CSS actually does.
 *
 * Padding is painted only where the component has no background or border on
 * that side — where it reads as empty space, like the hero's 100px. Padding
 * inside a panel or card belongs to the panel, not to the space around it.
 *
 * Components are found by their [data-demo-type] wrapper; the component itself
 * is the wrapper's first child.
 */

const px = (value) => parseFloat(value) || 0

const isBare = (style, side) =>
  style.backgroundImage === "none" &&
  /, 0\)$|^transparent$/.test(style.backgroundColor) &&
  px(style[`border${side}Width`]) === 0

const measure = (root) => {
  const origin = root.getBoundingClientRect()
  // The body layout's padding is the page's left edge for labels: the
  // --page-inline gutter, already resolved to pixels.
  const layout = root.querySelector(".cs-body-layout")
  const inset = layout ? px(getComputedStyle(layout).paddingLeft) : 0
  // Gaps span the content column, not either component: a tag is a hundred
  // pixels wide and the hero is full bleed.
  const column = root.querySelector(".cs-content-col")?.getBoundingClientRect()
  const colLeft = column ? column.left - origin.left : 0
  const colRight = column ? column.right - origin.left : origin.width

  return [...root.querySelectorAll("[data-demo-type]")]
    .map((item) => {
      const el = item.firstElementChild
      if (!el) return null
      const rect = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      return {
        type: item.dataset.demoType,
        note: item.dataset.demoNote,
        top: rect.top - origin.top,
        bottom: rect.bottom - origin.top,
        left: rect.left - origin.left,
        right: rect.right - origin.left,
        paddingTop: isBare(style, "Top") ? px(style.paddingTop) : 0,
        paddingBottom: isBare(style, "Bottom") ? px(style.paddingBottom) : 0,
        inset,
        colLeft,
        colRight,
        // Room in the right-hand gutter for a pill, so it covers nothing.
        outside: origin.width - colRight >= 64,
      }
    })
    .filter(Boolean)
}

const Padding = ({ box, top, height }) => (
  <div
    className="cs-guide-band cs-guide-band--padding"
    style={{ top, height, left: box.left, width: box.right - box.left }}
  >
    <span>padding {Math.round(height)}</span>
  </div>
)

/**
 * The space between one component's box and the next: shaded across the
 * column, and given as a figure in the right-hand gutter where it fits or
 * against the column's edge where it does not (phones).
 */
const Gap = ({ above, below }) => {
  const gap = Math.round(below.top - above.bottom)
  const modifiers = `${below.outside ? " cs-guide-gap--outside" : ""}${gap === 0 ? " cs-guide-gap--none" : ""}`
  return (
    <>
      {gap > 0 && (
        <div
          className="cs-guide-band cs-guide-band--gap"
          style={{
            top: above.bottom,
            height: gap,
            left: below.colLeft,
            width: below.colRight - below.colLeft,
          }}
        />
      )}
      <span
        className={`cs-guide-gap${modifiers}`}
        style={{ top: (above.bottom + below.top) / 2, left: below.colRight }}
      >
        {gap}px
      </span>
    </>
  )
}

/**
 * In the table-of-contents column where there is one (1200px and up), level
 * with the top of the component. Without it, pinned to the component's corner.
 */
const Label = ({ box }) => {
  const gutter = box.left - box.inset >= 160
  return gutter ? (
    <div
      className="cs-guide-label cs-guide-label--gutter"
      style={{ top: box.top, left: box.inset, width: box.left - box.inset - 24 }}
    >
      <code>{box.type}</code>
      {box.note && <span>{box.note}</span>}
    </div>
  ) : (
    <div className="cs-guide-label" style={{ top: box.top, left: Math.max(box.left, box.inset) }}>
      <code>{box.type}</code>
    </div>
  )
}

export default function SpacingGuides({ children }) {
  const ref = React.useRef(null)
  const [boxes, setBoxes] = React.useState([])
  const [on, setOn] = React.useState(true)

  React.useEffect(() => {
    const root = ref.current
    if (!root || !on) return

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setBoxes(measure(root)))
    }

    // Images load and fonts swap in after first paint, and each one moves
    // every component below it; a breakpoint can change a component's
    // height. Watching every wrapper catches all of it.
    const observer = new ResizeObserver(update)
    observer.observe(root)
    root.querySelectorAll("[data-demo-type]").forEach((el) => observer.observe(el))
    document.fonts?.ready.then(update)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [on])

  return (
    <div ref={ref} className={`cs-guides${on ? " cs-guides--on" : ""}`}>
      {children}

      {on && (
        <div className="cs-guides-layer" aria-hidden="true">
          {boxes.map((box, i) => (
            <React.Fragment key={i}>
              {box.paddingTop > 0 && <Padding box={box} top={box.top} height={box.paddingTop} />}
              {box.paddingBottom > 0 && (
                <Padding box={box} top={box.bottom - box.paddingBottom} height={box.paddingBottom} />
              )}
              {i > 0 && <Gap above={boxes[i - 1]} below={box} />}
              <Label box={box} />
            </React.Fragment>
          ))}
        </div>
      )}

      <button
        type="button"
        className="cs-guides-toggle"
        aria-pressed={on}
        onClick={() => setOn((value) => !value)}
      >
        {on ? "Hide spacing" : "Show spacing"}
      </button>
    </div>
  )
}
