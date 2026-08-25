import * as React from "react"
import * as styles from "./blocks.module.css"

const ordinal = (i) => String(i + 1).padStart(2, "0")

/**
 * A bordered box of numbered one-line objectives.
 *
 * Items may be plain strings or objects with a `label`, because a Sanity array
 * of strings and an array of objects both end up here depending on how the
 * field was authored; normalising at the edge keeps the caller from caring.
 */
const labelOf = (item) => (typeof item === "string" ? item : item?.label)

const ObjectivesList = ({ items = [] }) => {
  const labels = items.map(labelOf).filter(Boolean)
  if (!labels.length) return null

  return (
    <ol className={`${styles.block} ${styles.objectives}`}>
      {labels.map((label, i) => (
        <li key={i} className={styles.objective}>
          {/* The <ol> conveys position; hide the painted ordinal from the
              accessibility tree so it is not announced twice. */}
          <span className={styles.ordinal} aria-hidden="true">
            {ordinal(i)}
          </span>
          <p className={styles.objectiveLabel}>{label}</p>
        </li>
      ))}
    </ol>
  )
}

export default ObjectivesList
