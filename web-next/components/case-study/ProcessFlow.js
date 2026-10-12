import * as React from "react"
import * as styles from "./blocks.module.css"
import { ArrowRight, ArrowReturn } from "./icons"

/**
 * Steps joined by arrows on a tinted panel, each naming who owned it, with an
 * optional note (and return arrow) for work sent back to an earlier step. A
 * highlighted step takes the accent rule along its top.
 *
 * An <ol>: the order is the point. The arrows sit inside each item but the
 * last, so they wrap with their step on narrow screens instead of dangling at
 * the start of a line.
 */
const ProcessFlow = ({ title, steps = [], loopNote }) => {
  const items = (steps || []).filter((s) => s?.title)
  if (!items.length) return null

  return (
    <div className={`${styles.block} ${styles.flow}`}>
      {title && <p className={styles.label}>{title}</p>}
      <ol className={styles.flowSteps}>
        {items.map((s, i) => (
          <li key={s._key || i} className={styles.flowItem}>
            <div className={s.highlight ? `${styles.flowStep} ${styles.flowStepHighlight}` : styles.flowStep}>
              <p className={styles.flowTitle}>{s.title}</p>
              {s.owner && <p className={styles.flowOwner}>{s.owner}</p>}
            </div>
            {i < items.length - 1 && <ArrowRight className={styles.flowArrow} />}
          </li>
        ))}
      </ol>
      {loopNote && (
        <p className={styles.flowLoop}>
          <ArrowReturn className={styles.flowLoopIcon} />
          <span>{loopNote}</span>
        </p>
      )}
    </div>
  )
}

export default ProcessFlow
