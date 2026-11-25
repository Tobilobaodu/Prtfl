'use client'

import * as React from "react"
import * as styles from "./PhoneDemo.module.css"
import { DemoLink } from "./LiveDemoLink"

/**
 * A live HTML demo inside an iPhone frame, with notes that follow the screen.
 *
 * The frame (public/device/) is laid out at its native 450 x 920 and scaled as
 * one piece. Its screen area, 402 x 874 at (24, 23), holds the demo in an
 * iframe; the status bar and the bezel sit on top and never take taps.
 *
 * Notes: each one names a part of the demo marked data-annotate="name". On
 * every frame the block finds that part inside the iframe and shows the note
 * only while the part can be seen: on the current screen, not scrolled away,
 * not under the status bar, tab bar or a sheet. That is checked by asking the
 * demo what sits at the part's anchor point, so it works for any demo without
 * knowing how it builds its screens. A screen with no notes shows none.
 *
 * Wide column: notes in the margins with a line to their part. Narrow column:
 * numbered pins on the screen and the notes listed under the phone.
 *
 * Reading inside the iframe needs the demo to be served from this site; a demo
 * elsewhere still shows and works, just without notes.
 */

const SCREEN_W = 402
const DEVICE_W = 450
const DEVICE_H = 920
const STATUS_H = 54 // status bar height inside the screen
const NOTE_W = 220
const GAP = 32 // between the phone and a note column
const WIDE_PHONE_W = 360

const PhoneDemo = ({ demo, linkUrl, linkLabel, caption, statusBar = "dark", notes = [] }) => {
  const src = demo || linkUrl
  const list = (notes || []).filter((n) => n && n.target && n.title)
  const hasNotes = list.length > 0

  const [showNotes, setShowNotes] = React.useState(true)
  const [frameKey, setFrameKey] = React.useState(0)

  const stageRef = React.useRef(null)
  const sizerRef = React.useRef(null)
  const deviceRef = React.useRef(null)
  const frameRef = React.useRef(null)
  const linesRef = React.useRef(null)
  const hlRef = React.useRef(null)
  const emptyRef = React.useRef(null)
  const noteRefs = React.useRef([])
  const pinRefs = React.useRef([])
  const itemRefs = React.useRef([])
  const hover = React.useRef(-1)

  // Tapping a part that has a note flashes the note.
  const onFrameLoad = React.useCallback(() => {
    let doc
    try { doc = frameRef.current.contentDocument } catch { return }
    if (!doc) return
    doc.addEventListener("click", (e) => {
      const part = e.target.closest?.("[data-annotate]")
      if (!part) return
      list.forEach((n, i) => {
        if (n.target !== part.dataset.annotate) return
        for (const el of [noteRefs.current[i], itemRefs.current[i]]) {
          if (!el) continue
          el.classList.add(styles.flash)
          setTimeout(() => el.classList.remove(styles.flash), 900)
        }
      })
    }, true)
  }, [list.map((n) => n.target).join()]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let raf = 0
    let onScreen = false

    const tick = () => {
      raf = 0
      if (!onScreen) return
      raf = requestAnimationFrame(tick)
      update()
    }

    const update = () => {
      const wide = stage.clientWidth >= WIDE_PHONE_W + 2 * (NOTE_W + GAP)
      stage.dataset.layout = hasNotes && wide ? "wide" : "compact"

      const sizer = sizerRef.current
      const s = sizer.clientWidth / DEVICE_W
      deviceRef.current.style.setProperty("--s", s)
      sizer.style.height = `${DEVICE_H * s}px`
      if (!hasNotes) return

      let doc, win
      try { doc = frameRef.current.contentDocument; win = frameRef.current.contentWindow } catch { /* another site */ }

      const S = stage.getBoundingClientRect()
      const F = frameRef.current.getBoundingClientRect()
      const P = sizer.getBoundingClientRect()
      const k = F.width / SCREEN_W
      const ox = F.left - S.left
      const oy = F.top - S.top
      const placed = { left: [], right: [] }
      let shown = 0
      let lit = null

      list.forEach((n, i) => {
        const loc = doc && win ? locate(doc, win, n.target) : null
        const parts = [noteRefs.current[i], pinRefs.current[i], ...linePair(linesRef.current, i)]
        for (const el of parts) if (el) el.style.opacity = loc ? 1 : 0
        const note = noteRefs.current[i]
        if (note) { note.style.pointerEvents = loc ? "auto" : "none"; note.setAttribute("aria-hidden", loc ? "false" : "true") }
        itemRefs.current[i]?.classList.toggle(styles.off, !loc)
        if (!loc) return
        shown++

        const box = { x: ox + loc.r.left * k, y: oy + loc.r.top * k, w: loc.r.width * k, h: loc.r.height * k }
        const side = n.side === "left" ? "left" : "right"
        const ax = clamp(side === "left" ? box.x : box.x + box.w, ox + 4, ox + F.width - 4)
        const ay = oy + loc.y * k
        placed[side].push({ i, ax, ay })
        const pin = pinRefs.current[i]
        if (pin) { pin.style.left = `${ax}px`; pin.style.top = `${ay}px` }
        if (hover.current === i) lit = box
      })

      // Stack each side's notes beside their parts without overlapping.
      const H = stage.clientHeight
      for (const side of ["left", "right"]) {
        let floor = 0
        placed[side].sort((a, b) => a.ay - b.ay).forEach(({ i, ax, ay }) => {
          const note = noteRefs.current[i]
          if (!note) return
          const h = note.offsetHeight
          const top = Math.min(Math.max(ay - h / 2, floor), H - h)
          floor = top + h + 12
          const x = side === "left" ? P.left - S.left - GAP - NOTE_W : P.right - S.left + GAP
          note.style.left = `${x}px`
          note.style.top = `${top}px`
          const sx = side === "left" ? x + NOTE_W : x
          const sy = top + h / 2
          const bend = side === "left" ? sx + 14 : sx - 14
          const [path, dot] = linePair(linesRef.current, i)
          path?.setAttribute("d", `M${sx} ${sy}H${bend}L${ax} ${ay}`)
          dot?.setAttribute("cx", ax)
          dot?.setAttribute("cy", ay)
        })
      }

      const hl = hlRef.current
      if (hl) {
        hl.style.opacity = lit ? 1 : 0
        if (lit) Object.assign(hl.style, { left: `${lit.x - 4}px`, top: `${lit.y - 4}px`, width: `${lit.w + 8}px`, height: `${lit.h + 8}px` })
      }
      if (emptyRef.current) emptyRef.current.style.opacity = shown ? 0 : 1
    }

    // Only track the demo while the block is on screen.
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(stage)
    update()
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [hasNotes, list.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!src) return null

  return (
    <figure className={styles.block} data-notes={showNotes ? "on" : "off"}>
      {hasNotes && (
        <div className={styles.toolbar}>
          <label>
            <input type="checkbox" checked={showNotes} onChange={(e) => setShowNotes(e.target.checked)} /> Show notes
          </label>
          <button type="button" onClick={() => setFrameKey((k) => k + 1)}>Reset demo</button>
        </div>
      )}

      <div className={styles.stage} ref={stageRef} data-layout="compact">
        {hasNotes && (
          <svg className={styles.lines} ref={linesRef} aria-hidden="true">
            {list.map((n, i) => (
              <g key={i}><path /><circle r="4" /></g>
            ))}
          </svg>
        )}

        <div className={styles.phone}>
          <div className={styles.sizer} ref={sizerRef}>
            <div className={styles.device} ref={deviceRef}>
              <div className={styles.screen}>
                <iframe
                  key={frameKey}
                  ref={frameRef}
                  src={src}
                  title={caption || "Interactive app demo"}
                  loading="lazy"
                  onLoad={onFrameLoad}
                />
              </div>
              <div className={styles.status} data-tone={statusBar === "light" ? "light" : "dark"} aria-hidden="true" />
              <img className={styles.bezel} src="/device/iphone-bezel.png" alt="" draggable="false" />
            </div>
          </div>
        </div>

        {list.map((n, i) => (
          <React.Fragment key={i}>
            <div
              className={styles.note}
              ref={(el) => (noteRefs.current[i] = el)}
              onMouseEnter={() => (hover.current = i)}
              onMouseLeave={() => (hover.current = -1)}
              aria-hidden="true"
            >
              <strong><span className={styles.num}>{i + 1}</span>{n.title}</strong>
              {n.text && <p>{n.text}</p>}
            </div>
            <span className={styles.pin} ref={(el) => (pinRefs.current[i] = el)} aria-hidden="true">{i + 1}</span>
          </React.Fragment>
        ))}

        {hasNotes && <div className={styles.highlight} ref={hlRef} aria-hidden="true" />}
      </div>

      {hasNotes && (
        <>
          <p className={styles.empty} ref={emptyRef} aria-hidden="true">No notes on this screen</p>
          <ol className={styles.list}>
            {list.map((n, i) => (
              <li
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => (hover.current = i)}
                onMouseLeave={() => (hover.current = -1)}
              >
                <strong><span className={styles.num}>{i + 1}</span>{n.title}</strong>
                {n.text && <p>{n.text}</p>}
              </li>
            ))}
          </ol>
        </>
      )}

      <figcaption className={styles.footer}>
        {caption && <span>{caption}</span>}
        <DemoLink demo={demo} linkUrl={linkUrl} linkLabel={linkLabel || "Open demo in a new tab"} />
      </figcaption>
    </figure>
  )
}

/** Where a named part sits in the demo, or null if a visitor can't see it. */
function locate(doc, win, name) {
  const el = doc.querySelector(`[data-annotate="${name}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (!r.width && !r.height) return null // display: none, e.g. another screen
  const y = r.top + Math.min(r.height / 2, 28)
  if (y < STATUS_H || y > win.innerHeight - 1) return null
  const x = clamp(r.left + r.width / 2, 1, win.innerWidth - 1)
  const hit = doc.elementFromPoint(x, y) // covered by a sheet, tab bar or status bar?
  if (!hit || !(hit === el || el.contains(hit))) return null
  return { r, y }
}

function linePair(svg, i) {
  const g = svg?.children[i]
  return g ? [g.children[0], g.children[1]] : []
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

export default PhoneDemo
