import * as React from "react"
import * as styles from "./blocks.module.css"

// The site orange, for a quote with no colour of its own and no case study
// accent colour.
const FALLBACK_BG = "#EE550E"
const LIGHT_TEXT = "#FFFFFF"
const DARK_TEXT = "#1D1C1C" // --black-pitch-nah

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * White text unless it would fall under 3:1 against the panel, then dark.
 * 3:1 is the WCAG AA bar for large text, and everything in the panel is large
 * bold text (the attribution is 19px bold, over the 18.66px line). Preferring
 * white keeps the design's white-on-colour look for any mid-tone, including
 * the site orange, where dark text would technically score higher.
 */
function textOn(bg) {
  const whiteContrast = 1.05 / (luminance(bg) + 0.05)
  return whiteContrast >= 3 ? LIGHT_TEXT : DARK_TEXT
}

const isHex = (value) => /^#[0-9a-f]{6}$/i.test(value ?? "")

/**
 * A quotation on a solid colour panel, with the attribution beneath. The
 * panel colour is picked per quote in the Studio (@sanity/color-input), else
 * the case study's accent colour (`accent`, a #rrggbb string), else the site
 * orange; the text colour follows from it.
 *
 * <figure>/<figcaption> rather than a bare div: the attribution is a caption
 * for the quotation, and <blockquote> gives the quoted text the right
 * semantics for anything reading the page structurally.
 */
const PullQuote = ({ quote, attribution, color, accent }) => {
  if (!quote) return null

  const bg = isHex(color?.hex) ? color.hex : isHex(accent) ? accent : FALLBACK_BG

  return (
    <figure
      className={`${styles.block} ${styles.quote}`}
      style={{ "--quote-bg": bg, "--quote-fg": textOn(bg) }}
    >
      <blockquote className={styles.quoteText}>{quote}</blockquote>
      {attribution && <figcaption className={styles.quoteAttribution}>{attribution}</figcaption>}
    </figure>
  )
}

export default PullQuote
