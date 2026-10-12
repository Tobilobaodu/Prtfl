import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * Options considered, side by side, each with a status badge, a title and a
 * description. The chosen option takes an accent rule along its top and a
 * solid badge; the others an outlined one.
 *
 * The badge is dark rather than accent-filled: it is 12px text, and white on
 * most accent colours (the site orange included) falls short of 4.5:1. The
 * badge text itself ("The direction I took") is what tells a screen reader
 * which option was chosen.
 */
const OptionsComparison = ({ options = [] }) => {
  const items = (options || []).filter((o) => o?.title)
  if (!items.length) return null

  return (
    <div className={`${styles.block} ${styles.options}`}>
      {items.map((o, i) => (
        <div
          key={o._key || i}
          className={o.chosen ? `${styles.option} ${styles.optionChosen}` : styles.option}
        >
          {o.status && <p className={styles.optionBadge}>{o.status}</p>}
          <h3 className={styles.optionTitle}>{o.title}</h3>
          {o.body && <p className={styles.bodyText}>{o.body}</p>}
        </div>
      ))}
    </div>
  )
}

export default OptionsComparison
