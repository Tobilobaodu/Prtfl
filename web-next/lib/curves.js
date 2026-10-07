/**
 * Easing curves sampled from motion.dev's App Store example
 * (examples.motion.dev/react/app-store), measured frame by frame at 60fps.
 *
 * Both are springs in the original. Each point is the progress at one 1/60s
 * frame, so a curve only matches the original at its paired duration.
 *
 * The wipe runs as a CSS transition through `linear()`, which replays the points
 * without a spring library; browsers without it (Safari < 17.2) get the
 * cubic-bezier fallback of roughly the same shape. The grow is driven from
 * requestAnimationFrame through curveAt(), so it needs no fallback.
 */

/** The paywall backdrop's clip-path wipe. Sharp ease-out: ~80% in the first third. */
export const WIPE_EASE =
  'linear(0, 0.031, 0.097, 0.221, 0.364, 0.483, 0.574, 0.646, 0.704, 0.751, 0.791, 0.826, 0.855, 0.88, 0.901, 0.92, 0.936, 0.95, 0.961, 0.971, 0.979, 0.986, 0.991, 0.995, 0.998, 0.999, 1)'
export const WIPE_DURATION_MS = 450

/** The tapped card's grow to its expanded view. Starts from rest, no overshoot. */
export const GROW_POINTS = [
  0, 0.002, 0.011, 0.031, 0.062, 0.111, 0.194, 0.305, 0.423, 0.535, 0.624, 0.695, 0.751, 0.797,
  0.835, 0.866, 0.895, 0.918, 0.935, 0.951, 0.964, 0.973, 0.982, 0.989, 0.996, 0.998, 1,
]
export const GROW_DURATION_MS = 450

/**
 * Progress at `t` (0–1) along a sampled curve, interpolating between points —
 * what `linear()` does, for animations driven from requestAnimationFrame.
 */
export function curveAt(points, t) {
  const x = Math.min(1, Math.max(0, t)) * (points.length - 1)
  const i = Math.floor(x)
  if (i >= points.length - 1) return points[points.length - 1]
  return points[i] + (points[i + 1] - points[i]) * (x - i)
}

export const WIPE_EASE_FALLBACK = 'cubic-bezier(0.25, 1, 0.5, 1)'

/** Whether this browser understands `linear()` easing. */
export function supportsLinearEasing() {
  return typeof CSS !== 'undefined' && CSS.supports('transition-timing-function', 'linear(0, 1)')
}
