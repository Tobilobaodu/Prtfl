'use client'

import * as React from "react"
import Link from "next/link"
import { getLenis } from "../lib/lenis"
import { CONTACT_EMAIL } from "../lib/site"
import {
  WIPE_EASE,
  WIPE_EASE_FALLBACK,
  WIPE_DURATION_MS,
  supportsLinearEasing,
} from "../lib/curves"
import * as styles from "./ContactPanel.module.css"

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

// The close runs the intro loader's exit: a 100ms head start, then the wipe,
// while the content sinks back over 600ms (PageLoader.module.css). The panel
// unmounts once the longer of the two has finished.
const EXIT_DELAY_MS = 100
const CONTENT_EXIT_MS = 600
const UNMOUNT_AFTER_MS = Math.max(EXIT_DELAY_MS + WIPE_DURATION_MS, CONTENT_EXIT_MS)

/**
 * "Get in touch", built from the Figma frames Contact (3829:14), Tablet -
 * Contact (3831:2677) and Mobile - Contact (3831:2803). It replaced the
 * /contact page, which now redirects to /?contact and opens this.
 *
 * It opens over whatever page is showing, behind the same backdrop as the
 * password modal and the menu. Opening plays the loader's wipe in reverse (the
 * edge comes in from the right, or up from the bottom on mobile); closing
 * plays it back out the same way, timed as the loader's exit.
 *
 * `open` is what the caller wants; `phase` is where the animation is, so the
 * panel can stay mounted through its exit after `open` goes false.
 */
const ContactPanel = ({ open, onClose }) => {
  const [phase, setPhase] = React.useState("closed") // closed | enter | open | exit
  const [copied, setCopied] = React.useState(false)
  const [ease, setEase] = React.useState(WIPE_EASE_FALLBACK)

  const dialogRef = React.useRef(null)
  const closeRef = React.useRef(null)
  const previouslyFocused = React.useRef(null)

  React.useEffect(() => {
    setEase(supportsLinearEasing() ? WIPE_EASE : WIPE_EASE_FALLBACK)
  }, [])

  // Drive the phases from `open`. "enter" paints the closed state for one frame
  // so the transition to "open" has something to run from.
  React.useEffect(() => {
    if (open) {
      setPhase("enter")
      let raf2
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase("open"))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }
    setPhase((p) => (p === "closed" ? p : "exit"))
    const t = setTimeout(() => setPhase("closed"), UNMOUNT_AFTER_MS)
    return () => clearTimeout(t)
  }, [open])

  // Focus and scroll lock, as LockedProjectModal does them: the lock goes on
  // <html> as well as <body>, and Lenis is stopped, or the page still scrolls.
  React.useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement

    const rootStyle = document.documentElement.style
    const originalOverflow = document.body.style.overflow
    const originalRootOverflow = rootStyle.overflow
    document.body.style.overflow = "hidden"
    rootStyle.overflow = "hidden"
    getLenis()?.stop()

    return () => {
      document.body.style.overflow = originalOverflow
      rootStyle.overflow = originalRootOverflow
      getLenis()?.start()
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus()
      }
    }
  }, [open])

  // Focus moves in once the panel exists: on the render where `open` turns
  // true it has not mounted yet, so the lock effect above can't do it.
  React.useEffect(() => {
    if (phase === "enter") closeRef.current?.focus()
  }, [phase])

  // Escape closes; Tab cycles within the panel.
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  if (phase === "closed") return null

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL).then(
      () => setCopied(true),
      // Clipboard blocked (insecure origin, denied permission): fall back to
      // the mail client so the button still gets them to the address.
      () => { window.location.href = `mailto:${CONTACT_EMAIL}` }
    )
  }

  return (
    <div
      className={styles.root}
      data-phase={phase}
      style={{
        "--contact-wipe": `${WIPE_DURATION_MS}ms`,
        "--contact-ease": ease,
      }}
    >
      <div className={styles.overlay} aria-hidden="true" onClick={onClose} />

      <div
        ref={dialogRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
      >
        <span className={styles.shadow} aria-hidden="true" />
        <div className={styles.panel}>
          <div className={styles.content}>
            <h2 id="contact-panel-title" className={styles.title}>Get in touch</h2>
            <p className={styles.lede}>
              Got a project, an idea you would like to collaborate on
            </p>

            <button type="button" className={styles.copy} onClick={copyEmail}>
              <span className={styles.copyShadow} aria-hidden="true" />
              <span className={styles.copyFace} aria-hidden="true" />
              <span className={styles.copyLabel}>
                <span aria-live="polite">{copied ? "Email copied" : "Copy email address"}</span>
                <img src="/svg/content_copy.svg" width={18} height={18} alt="" />
              </span>
            </button>

            <p className={styles.footer}>
              View some of{" "}
              <Link href="/portfolio" className={styles.footerLink} onClick={onClose}>
                my work
              </Link>{" "}
              or download my{" "}
              <a href="/Tobiloba_Odu_CV.docx" download className={styles.footerLink}>
                resume
              </a>
            </p>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <img src="/svg/close_circle.svg" width={24} height={24} alt="" />
        </button>
      </div>
    </div>
  )
}

export default ContactPanel
