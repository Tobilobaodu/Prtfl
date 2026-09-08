import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { subscribe, PRIORITY_SCROLL } from "./ticker"

/**
 * Owns the site's single Lenis instance.
 *
 * Creation lives here rather than in SmoothScroll's effect because the guard
 * has to be module-scoped to actually mean "one instance". A guard held in the
 * effect's closure only prevents *that* component instance from building a
 * second Lenis — and Gatsby mounts the wrapRootElement tree twice (measured:
 * two effect runs, zero cleanups between them), so two components each built
 * their own. Both then handled the same wheel event: stopping the one the modal
 * could reach left the other still scrolling the page behind it.
 *
 * Refcounted rather than a bare boolean so the second mount is a no-op and the
 * instance is only torn down once the last consumer has gone.
 *
 * A singleton rather than a React context because the consumers are a click
 * handler in the case-study page, a modal's scroll lock, and Gatsby's
 * onRouteUpdate — and that last one lives outside the React tree entirely.
 *
 * getLenis() returns null before the first mount and for the whole session when
 * the visitor prefers reduced motion, so every caller must handle null.
 */

// lerp is the only value that changes the feel: lower is heavier, higher is
// tighter. Judge it on a long case study, not the home page — that one is a
// single viewport tall and has nothing to scroll.
const OPTIONS = {
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothWheel: true,
  // Touch stays native. Smoothed touch fights the platform's own momentum and
  // reads as broken on iOS.
  syncTouch: false,
  // Driven by the shared ticker so Lenis writes the frame's scroll offset
  // before HoverReel measures rows against it.
  autoRaf: false,
}

let instance = null
let unsubscribe = null
let consumers = 0
let reduced = false

/** @returns {import('lenis').default | null} */
export const getLenis = () => instance

function reconcile() {
  const wanted = consumers > 0 && !reduced

  if (wanted && !instance) {
    instance = new Lenis(OPTIONS)
    unsubscribe = subscribe((time) => instance.raf(time), PRIORITY_SCROLL)
    return
  }

  if (!wanted && instance) {
    unsubscribe?.()
    unsubscribe = null
    instance.destroy()
    instance = null
  }
}

export function acquireLenis() {
  consumers += 1
  reconcile()
}

export function releaseLenis() {
  consumers = Math.max(0, consumers - 1)
  reconcile()
}

/** Reduced motion tears the instance down regardless of how many consumers hold it. */
export function setReducedMotion(next) {
  reduced = next
  reconcile()
}
