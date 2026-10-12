import * as React from "react"
import * as styles from "./blocks.module.css"

const LAYOUTS = {
  row: styles.statsRow,
  cards: styles.statsCards,
  list: styles.statsList,
}

/**
 * Headline numbers, each with a short label and an optional tag ("Goal 01").
 * Three layouts from the same content:
 *   - row:   numbers side by side between two heavy rules (the top of a case study)
 *   - cards: very large numbers on tinted cards (the main results)
 *   - list:  smaller numbers in a ruled list (secondary results)
 *
 * A <ul> so a screen reader announces how many results there are; within each
 * item the tag, number and label read in order as one sentence.
 */
const StatsBand = ({ layout, stats = [], footnote }) => {
  const items = (stats || []).filter((s) => s?.value)
  if (!items.length) return null

  return (
    <div className={`${styles.block} ${styles.stats}`}>
      <ul className={LAYOUTS[layout] || styles.statsRow}>
        {items.map((s, i) => (
          <li key={s._key || i} className={styles.stat}>
            {s.tag && <p className={styles.label}>{s.tag}</p>}
            <p className={styles.statValue}>{s.value}</p>
            {s.label && <p className={styles.statLabel}>{s.label}</p>}
          </li>
        ))}
      </ul>
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </div>
  )
}

export default StatsBand
