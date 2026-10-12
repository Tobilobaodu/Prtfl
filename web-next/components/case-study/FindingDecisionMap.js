import * as React from "react"
import * as styles from "./blocks.module.css"
import { ArrowRight } from "./icons"

/**
 * Rows tracing each finding, with where it came from, to the decision it led
 * to. The arrow is drawn only; hidden text reads "led to" in its place, so
 * each row is announced as one sentence.
 */
const FindingDecisionMap = ({ rows = [] }) => {
  const items = (rows || []).filter((r) => r?.finding || r?.decision)
  if (!items.length) return null

  return (
    <ul className={`${styles.block} ${styles.map}`}>
      {items.map((r, i) => (
        <li key={r._key || i} className={styles.mapRow}>
          <p className={styles.mapFinding}>
            {r.finding}
            {r.source && <span className={styles.mapSource}> ({r.source})</span>}
          </p>
          <ArrowRight className={styles.mapArrow} />
          <span className={styles.srOnly}> led to </span>
          <p className={styles.mapDecision}>{r.decision}</p>
        </li>
      ))}
    </ul>
  )
}

export default FindingDecisionMap
