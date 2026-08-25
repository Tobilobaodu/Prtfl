import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * A quotation with an orange rule down its left edge and a small-caps
 * attribution beneath.
 *
 * <figure>/<figcaption> rather than a bare div: the attribution is a caption
 * for the quotation, and <blockquote> gives the quoted text the right
 * semantics for anything reading the page structurally.
 */
const PullQuote = ({ quote, attribution }) => {
  if (!quote) return null

  return (
    <figure className={`${styles.block} ${styles.quote}`}>
      <blockquote className={styles.quoteText}>{quote}</blockquote>
      {attribution && <figcaption className={styles.quoteAttribution}>{attribution}</figcaption>}
    </figure>
  )
}

export default PullQuote
