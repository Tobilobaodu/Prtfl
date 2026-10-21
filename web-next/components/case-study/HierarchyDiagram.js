import * as React from "react"
import * as styles from "./blocks.module.css"

const clickText = (count, label) => label || `${count} click${count === 1 ? "" : "s"}`

/** One square per click, then the figure in words: the squares are decoration. */
const ClickRow = ({ term, count, label, after }) => (
  <div className={styles.hierClickRow}>
    <dt className={`${styles.label} ${styles.hierClickTerm}`}>{term}</dt>
    <dd className={styles.hierClickValue}>
      <span className={styles.hierSquares} aria-hidden="true">
        {/* Capped at the Studio's maximum, so a bad value cannot draw hundreds. */}
        {Array.from({ length: Math.min(Math.round(count), 12) }, (_, i) => (
          <span key={i} className={after ? `${styles.hierSquare} ${styles.hierSquareAfter}` : styles.hierSquare} />
        ))}
      </span>
      {clickText(count, label)}
    </dd>
  </div>
)

/**
 * A site map on a tinted panel: the top level page as a dark bar, the
 * sections under it as cards with their pages listed, and optionally a before
 * and after click count drawn as one square per click.
 *
 * The sections take their column count from how many there are, as CardGrid's
 * cards do (see .cols1–.cols4 in the stylesheet). The click comparison only
 * shows when both counts are set: one side alone has nothing to compare
 * against.
 */
const HierarchyDiagram = ({
  title,
  note,
  root,
  sections = [],
  clicksBefore,
  clicksBeforeLabel,
  clicksAfter,
  clicksAfterLabel,
}) => {
  const items = (sections || []).filter((s) => s?.title)
  if (!root || !items.length) return null

  const cols = items.length <= 4 ? items.length : 3
  const showClicks = clicksBefore > 0 && clicksAfter > 0

  return (
    <div className={`${styles.block} ${styles.hierarchy}`}>
      {(title || note) && (
        <div className={styles.hierHead}>
          {title && <p className={styles.label}>{title}</p>}
          {note && <p className={styles.hierNote}>{note}</p>}
        </div>
      )}

      <p className={styles.hierRoot}>{root}</p>

      <ul className={`${styles.hierSections} ${styles[`cols${cols}`]}`} aria-label={`Sections under ${root}`}>
        {items.map((s, i) => (
          <li key={s._key || i} className={styles.hierSection}>
            <p className={styles.hierSectionTitle}>{s.title}</p>
            {s.items?.length > 0 && (
              <ul className={styles.hierPages}>
                {s.items.map((page, j) => (
                  <li key={j}>{page}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {showClicks && (
        <dl className={styles.hierClicks}>
          <ClickRow term="Before" count={clicksBefore} label={clicksBeforeLabel} />
          <ClickRow term="After" count={clicksAfter} label={clicksAfterLabel} after />
        </dl>
      )}
    </div>
  )
}

export default HierarchyDiagram
