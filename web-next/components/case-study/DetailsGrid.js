import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * Label and text pairs, e.g. Role / Timeline / Team / Constraint, or how the
 * research was run, with an optional caveat underneath.
 *
 * A <dl>: each label names the text after it, which is exactly what a
 * description list says to assistive tech.
 */
const DetailsGrid = ({ title, layout, items = [], note }) => {
  const rows = (items || []).filter((item) => item?.label || item?.body)
  if (!rows.length) return null

  return (
    <div className={`${styles.block} ${styles.details}`}>
      {title && <p className={`${styles.label} ${styles.blockTitle}`}>{title}</p>}
      <dl className={layout === "wide" ? styles.detailsWide : styles.detailsCompact}>
        {rows.map((item, i) => (
          <div key={item._key || i} className={styles.detail}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={styles.detailBody}>{item.body}</dd>
          </div>
        ))}
      </dl>
      {note && <p className={styles.footnote}>{note}</p>}
    </div>
  )
}

export default DetailsGrid
