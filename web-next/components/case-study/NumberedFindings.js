import * as React from "react"
import * as styles from "./blocks.module.css"

// 1 -> "01". Two digits up to 99, then however many the number needs.
const ordinal = (i) => String(i + 1).padStart(2, "0")

/**
 * An ordered list of findings: an orange ordinal, a heading, and a paragraph,
 * separated by hairline rules.
 *
 * Rendered as an <ol> because the numbering carries meaning — a screen reader
 * should announce these as an ordered list of three, and the ordinals are
 * derived from position rather than authored, so reordering in Sanity cannot
 * leave "03" sitting above "02".
 */
const NumberedFindings = ({ items = [] }) => {
  if (!items.length) return null

  return (
    <ol className={`${styles.block} ${styles.findings}`}>
      {items.map((item, i) => (
        <li key={item?._key || i} className={styles.finding}>
          {/* aria-hidden: the <ol> already conveys the position, so exposing
              the painted number would have it announced twice. */}
          <span className={styles.ordinal} aria-hidden="true">
            {ordinal(i)}
          </span>
          <div>
            {item?.heading && <h3 className={styles.findingHeading}>{item.heading}</h3>}
            {item?.body && <p className={`${styles.findingBody} type-body-small`}>{item.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default NumberedFindings
