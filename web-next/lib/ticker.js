/**
 * One requestAnimationFrame loop that everything subscribes to.
 *
 * Two independent rAF loops have no defined ordering relative to each other.
 * That matters here because HoverReel reads getBoundingClientRect() on the
 * hovered row every frame while Lenis is writing the document's scroll offset
 * every frame: if HoverReel's callback happens to run first, the preview card
 * renders against last frame's scroll position and trails its row by ~7-16ms
 * whenever you scroll with the pointer over the project list.
 *
 * Subscribers are therefore ordered by an explicit priority rather than by
 * insertion. Insertion order would be wrong: React runs effects child-first, so
 * HoverReel (a descendant) would register ahead of SmoothScroll (the root
 * wrapper) on any mount where both subscribe in the same commit.
 *
 * The loop only runs while something is subscribed, so an idle page costs
 * nothing.
 */

/** Writes the frame's scroll offset. Must run before anything that reads it. */
export const PRIORITY_SCROLL = 0
/** Measures scrolled elements. */
export const PRIORITY_DEFAULT = 10

let subscribers = []
let running = false

function frame(time) {
  // Iterate a snapshot: a callback may unsubscribe itself (HoverReel does, on
  // unmount) and splicing the live array mid-loop would skip the next entry.
  for (const sub of subscribers.slice()) sub.fn(time)

  if (subscribers.length) {
    requestAnimationFrame(frame)
  } else {
    running = false
  }
}

/**
 * Register a per-frame callback. Returns an unsubscribe function.
 *
 * @param {(time: number) => void} fn — receives the rAF timestamp, the same
 *   value a bare requestAnimationFrame callback would get.
 * @param {number} [priority] — lower runs earlier within a frame.
 * @returns {() => void}
 */
export function subscribe(fn, priority = PRIORITY_DEFAULT) {
  const sub = { fn, priority }

  subscribers.push(sub)
  // Stable sort, so equal priorities keep insertion order.
  subscribers.sort((a, b) => a.priority - b.priority)

  if (!running) {
    running = true
    requestAnimationFrame(frame)
  }

  return () => {
    subscribers = subscribers.filter((s) => s !== sub)
  }
}
