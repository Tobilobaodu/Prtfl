import * as React from "react"

/**
 * Line icons shared by the case-study blocks. Decorative everywhere they are
 * used — the order or relationship they draw is also carried by the markup
 * (an ordered list, or hidden "led to" text) — so they are hidden from
 * assistive tech. They take the text colour unless the caller sets one.
 */

export const ArrowRight = ({ size = 20, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

/** A U-turn arrow, for work sent back to an earlier step. */
export const ArrowReturn = ({ size = 20, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
)
