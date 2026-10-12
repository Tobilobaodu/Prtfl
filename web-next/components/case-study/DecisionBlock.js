import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * A numbered design decision: a large accent number beside a "Decision 01"
 * label and the title, then labelled columns (The problem / What I did /
 * Evidence, or any labels the author picks).
 *
 * The number is authored rather than counted from position, because the
 * decisions on a page are interleaved with images and notes, and an author
 * may split them across sections.
 */
const DecisionBlock = ({ number, eyebrow, title, columns = [] }) => {
  if (!title) return null

  const n = Number.isFinite(number) ? String(number).padStart(2, "0") : null
  const label = eyebrow || (n ? `Decision ${n}` : null)
  const cols = (columns || []).filter((c) => c?.label || c?.body)

  return (
    <article className={`${styles.block} ${styles.decision}`}>
      <header className={styles.decisionHead}>
        {/* aria-hidden: the label already says "Decision 01". */}
        {n && (
          <span className={styles.decisionNumber} aria-hidden="true">
            {n}
          </span>
        )}
        <div className={styles.decisionTitles}>
          {label && <p className={styles.eyebrow}>{label}</p>}
          <h3 className={styles.decisionTitle}>{title}</h3>
        </div>
      </header>

      {cols.length > 0 && (
        <div className={styles.decisionColumns}>
          {cols.map((col, i) => (
            <div key={col._key || i} className={styles.decisionColumn}>
              {col.label && <p className={styles.label}>{col.label}</p>}
              {col.body && <p className={styles.bodyText}>{col.body}</p>}
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default DecisionBlock
