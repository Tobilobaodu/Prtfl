import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * One very large statement, such as the "How might we" question a project was
 * designed around, with an optional run of words picked out in the accent.
 *
 * The highlight is plain text matched against the statement (the Studio
 * checks it appears there), so authors never need rich text for one coloured
 * phrase. If it no longer matches, the statement renders unhighlighted rather
 * than losing words.
 */
const KeyQuestion = ({ label, statement, highlight }) => {
  if (!statement) return null

  const at = highlight ? statement.indexOf(highlight) : -1

  return (
    <div className={`${styles.block} ${styles.keyQuestion}`}>
      {label && <p className={styles.label}>{label}</p>}
      <p className={styles.keyStatement}>
        {at === -1 ? (
          statement
        ) : (
          <>
            {statement.slice(0, at)}
            <span className={styles.keyHighlight}>{highlight}</span>
            {statement.slice(at + highlight.length)}
          </>
        )}
      </p>
    </div>
  )
}

export default KeyQuestion
