import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * Short cards on a tint, each a heading and a sentence or two, e.g. the groups
 * a design had to satisfy.
 *
 * The column count comes from the number of cards rather than auto-fit: four
 * cards sit four across in the case study column, and drop to two by two (not
 * three and an orphan) when the column narrows. Five or six sit three to a row.
 * See .cols1–.cols4 in the stylesheet.
 */
const CardGrid = ({ title, cards = [] }) => {
  const items = (cards || []).filter((c) => c?.heading)
  if (!items.length) return null

  const cols = items.length <= 4 ? items.length : 3

  return (
    <div className={`${styles.block} ${styles.cardGrid}`}>
      {title && <p className={`${styles.label} ${styles.blockTitle}`}>{title}</p>}
      <ul className={`${styles.cardList} ${styles[`cols${cols}`]}`}>
        {items.map((c, i) => (
          <li key={c._key || i} className={styles.card}>
            <h3 className={styles.cardHeading}>{c.heading}</h3>
            {c.body && <p className={styles.bodyText}>{c.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardGrid
