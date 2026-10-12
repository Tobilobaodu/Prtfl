import * as React from "react"
import * as styles from "./blocks.module.css"
import { ArrowRight } from "./icons"

const ordinal = (i) => String(i + 1).padStart(2, "0")

/**
 * The steps of a journey as tinted cards, each with a big accent number, and
 * an arrow on every card but the last pointing on to the next.
 *
 * An <ol>, numbered from position like NumberedFindings, so reordering the
 * steps in Sanity can never leave "03" ahead of "02". The arrows are drawn
 * only; the list order is what says the steps follow one another.
 */
const JourneyCards = ({ title, steps = [] }) => {
  const items = (steps || []).filter((s) => s?.step || s?.value)
  if (!items.length) return null

  return (
    <div className={`${styles.block} ${styles.journey}`}>
      {title && <p className={`${styles.label} ${styles.blockTitle}`}>{title}</p>}
      <ol className={styles.journeyList}>
        {items.map((s, i) => (
          <li key={s._key || i} className={styles.journeyCard}>
            <div className={styles.journeyHead}>
              <p className={styles.label}>
                {ordinal(i)} {s.step}
              </p>
              {i < items.length - 1 && <ArrowRight className={styles.journeyArrow} />}
            </div>
            <p className={styles.journeyValue}>{s.value}</p>
            {s.body && <p className={styles.bodyText}>{s.body}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default JourneyCards
