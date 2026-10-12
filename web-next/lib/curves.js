/**
 * An easing curve sampled from motion.dev's App Store example
 * (examples.motion.dev/react/app-store), measured frame by frame at 60fps.
 *
 * It is a spring in the original. Each point is the progress at one 1/60s
 * frame, so the curve only matches the original at its paired duration.
 *
 * The wipe runs as a CSS transition through `linear()`, which replays the points
 * without a spring library; browsers without it (Safari < 17.2) get the
 * cubic-bezier fallback of roughly the same shape.
 */

/** The paywall backdrop's clip-path wipe. Sharp ease-out: ~80% in the first third. */
export const WIPE_EASE =
  'linear(0, 0.031, 0.097, 0.221, 0.364, 0.483, 0.574, 0.646, 0.704, 0.751, 0.791, 0.826, 0.855, 0.88, 0.901, 0.92, 0.936, 0.95, 0.961, 0.971, 0.979, 0.986, 0.991, 0.995, 0.998, 0.999, 1)'
export const WIPE_DURATION_MS = 450

export const WIPE_EASE_FALLBACK = 'cubic-bezier(0.25, 1, 0.5, 1)'

/** Whether this browser understands `linear()` easing. */
export function supportsLinearEasing() {
  return typeof CSS !== 'undefined' && CSS.supports('transition-timing-function', 'linear(0, 1)')
}
