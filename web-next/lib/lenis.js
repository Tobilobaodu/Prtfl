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

// duration + easing, NOT lerp. Lenis takes whichever pair is set and duration
// wins — see Animate.advance in lenis/dist/lenis.mjs:
//
//   if (this.duration && this.easing) { ...fixed curve, completes at 1 }
//   else if (this.lerp)               { damp(...); completed only when
//                                       Math.round(value) === Math.round(to) }
//
// That rounding condition is why `lerp: 0.1` felt rigid. Measured in a browser:
// a single wheel notch covered 60% of its distance in the first 200ms and then
// spent a further second crawling the last 11%, because an exponential damp
// approaches its target asymptotically and cannot finish until the two values
// round equal. It also has no ease-in at all — motion begins at peak velocity.
//
// duration + easing runs a designed curve that starts, eases and ends. Raise
// `duration` for a heavier glide, lower it for a tighter, more immediate feel.
// Judge it on a long case study, not the home page — that one is a single
// viewport tall and has nothing to scroll.
// Measured in a browser, single wheel notch, time to reach 99% of the target:
//
//   lerp: 0.1 (was)          ~830ms   60% of the distance inside 200ms, then a
//                                     full second crawling the last 11%
//   duration 1.05, expo-out   715ms   still heavily front-loaded
//   duration 0.7, cubic-out   583ms   even decay, and it actually stops
//
// Cubic-out is the one that stopped feeling rigid: expo spends its whole budget
// in the first third and then inches, which reads as the page shooting off and
// then refusing to settle. Cubic distributes the movement and ends decisively.
const OPTIONS = {
  duration: 0.7,
  // Cubic-out. Raise the exponent for a sharper stop, lower `duration` for a
  // tighter feel, raise it for more glide.
  easing: (t) => 1 - Math.pow(1 - t, 3),
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
