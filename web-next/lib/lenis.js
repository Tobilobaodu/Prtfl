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
 * getLenis() returns null before the first mount and after the last consumer
 * releases, so every caller must still handle null. It no longer returns null
 * for the whole session under reduced motion — see REDUCED_DURATION below.
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
const BASE_OPTIONS = {
  // Cubic-out. Raise the exponent for a sharper stop.
  easing: (t) => 1 - Math.pow(1 - t, 3),
  wheelMultiplier: 1,
  smoothWheel: true,
  // Touch stays native. Smoothed touch fights the platform's own momentum and
  // reads as broken on iOS.
  syncTouch: false,
  // Driven by the shared ticker so Lenis writes the frame's scroll offset
  // before HoverReel measures rows against it.
  autoRaf: false,

  // Part of the same deliberate override as REDUCED_DURATION below, and
  // required for it to have any effect.
  //
  // Lenis carries its OWN reduced-motion handling, separate from this module's:
  //
  //   get prefersReducedMotion() {
  //     return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches
  //   }
  //
  // and when that is true it forces `lerp = 1, duration = undefined` on every
  // non-programmatic scroll — instant, whatever duration we pass. So merely
  // constructing the instance under `reduce` was not enough: measured, it still
  // gave 9 animated frames per wheel notch against 38 for everyone else. This
  // is the switch that actually removes the difference.
  respectReducedMotion: false,
}

/** Lower for a tighter feel, higher for more glide. */
const DURATION = 0.7

/**
 * Duration used when the visitor prefers reduced motion.
 *
 * DELIBERATE OVERRIDE — read before changing.
 *
 * This module used to destroy the instance outright under `prefers-reduced-
 * motion: reduce`, which is the conventional behaviour. It no longer does, at
 * the site owner's explicit direction, because leaving it on meant the smooth
 * scroll was invisible on any machine with the OS animation setting off.
 *
 * It is deliberately EQUAL to DURATION, so reduced-motion visitors get exactly
 * the same scrolling as everyone else. A shorter value was tried first — 0.25
 * gave 9 animated frames per wheel notch against 38 for a normal visitor, which
 * is smoother than native but visibly not the same thing, and the point of the
 * override was to remove the difference rather than shrink it.
 *
 * To soften it instead, set this to something below DURATION. To restore the
 * conventional behaviour, put `&& !reduced` back in reconcile() and this whole
 * constant becomes unnecessary.
 */
const REDUCED_DURATION = DURATION

const optionsFor = (isReduced) => ({
  ...BASE_OPTIONS,
  duration: isReduced ? REDUCED_DURATION : DURATION,
})

let instance = null
let unsubscribe = null
let consumers = 0
let reduced = false
// Which variant the live instance was built with, so a preference flip can be
// detected. null whenever there is no instance.
let builtReduced = null

/** @returns {import('lenis').default | null} */
export const getLenis = () => instance

function teardown() {
  unsubscribe?.()
  unsubscribe = null
  instance?.destroy()
  instance = null
  builtReduced = null
}

function reconcile() {
  if (consumers < 1) {
    if (instance) teardown()
    return
  }

  // Rebuild when the preference flips. Lenis reads `duration` from the options
  // it was constructed with, so mutating the module constant would not reach a
  // live instance — it has to be replaced.
  if (instance && builtReduced !== reduced) teardown()

  if (!instance) {
    instance = new Lenis(optionsFor(reduced))
    builtReduced = reduced
    unsubscribe = subscribe((time) => instance.raf(time), PRIORITY_SCROLL)
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

/**
 * Reduced motion no longer tears the instance down — it rebuilds it with
 * REDUCED_DURATION instead. See the note on that constant for why, and for how
 * to restore the conventional behaviour.
 */
export function setReducedMotion(next) {
  reduced = next
  reconcile()
}
