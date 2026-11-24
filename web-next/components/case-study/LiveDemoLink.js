import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * The "View live demo ↗" link on its own. It opens in a new tab so the reader
 * keeps their place in the case study. A demo picked from the Studio list wins
 * over a typed URL. Renders nothing without either.
 */
export const DemoLink = ({ demo, linkUrl, linkLabel }) => {
  const href = demo || linkUrl
  if (!href) return null

  return (
    <a className={styles.demoLink} href={href} target="_blank" rel="noopener noreferrer">
      {linkLabel || "View live demo"}
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  )
}

/**
 * The block: optional text on the left, the link on the right, the same row
 * the Before and After Slider shows under its frame.
 */
const LiveDemoLink = ({ text, demo, linkUrl, linkLabel }) => {
  if (!demo && !linkUrl) return null

  return (
    <div className={`${styles.block} ${styles.demoRow}`}>
      {text && <p className={styles.footnote}>{text}</p>}
      <DemoLink demo={demo} linkUrl={linkUrl} linkLabel={linkLabel} />
    </div>
  )
}

export default LiveDemoLink
