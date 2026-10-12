import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * A small label above a large statement on a dark panel, e.g. the target a
 * project's groups agreed on. Unlike PullQuote it is the author's own
 * statement, not a quotation, so the label leads and there is no attribution.
 */
const CalloutBanner = ({ label, statement }) => {
  if (!statement) return null

  return (
    <div className={`${styles.block} ${styles.callout}`}>
      {label && <p className={styles.calloutLabel}>{label}</p>}
      <p className={styles.calloutStatement}>{statement}</p>
    </div>
  )
}

export default CalloutBanner
