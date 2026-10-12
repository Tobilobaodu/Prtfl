import * as React from "react"
import * as styles from "./blocks.module.css"
import { sanityImageUrl } from "../../utils/sanityImage"

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

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/**
 * White text unless it would fall under 3:1 against the panel, then dark.
 * 3:1 is the WCAG AA bar for large text, which the quote and name are.
 * Preferring white keeps the Figma design's white-on-colour look for any
 * mid-tone, including the site orange, where dark text would score higher.
 *
 * The role line is 16px regular in the design, so strictly it needs 4.5:1,
 * which white reaches on darker panels (the raspberry, near-black) but not on
 * the site orange (3.5:1) or the design's own red (4.2:1). Kept as designed.
 */
function textOn(bg) {
  return contrast(bg, LIGHT_TEXT) >= 3 ? LIGHT_TEXT : DARK_TEXT
}

/**
 * The quote mark: Material Icons' "format_quote", the icon the Figma frame
 * uses, with its viewBox trimmed to the drawn shape (14 x 10 of the 24px grid)
 * so CSS can size and place the mark itself rather than its padding. It
 * fills with currentColor, so it always matches the quote text.
 */
const QuoteMark = ({ className }) => (
  <svg className={className} viewBox="5 7 14 10" aria-hidden="true" focusable="false">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill="currentColor" />
  </svg>
)

const isHex = (value) => /^#[0-9a-f]{6}$/i.test(value ?? "")

/**
 * A quotation on a solid colour panel (Figma "Quote", 3835-26): a hanging
 * double quote mark, the quote, then an optional avatar beside the speaker's
 * name and role.
 *
 * The panel colour is picked per quote in the Studio (@sanity/color-input),
 * else the case study's accent colour (`accent`, a #rrggbb string), else the
 * site orange; the text colour, which the mark shares, follows from it.
 *
 * <figure>/<figcaption> rather than a bare div: the speaker is a caption for
 * the quotation, and <blockquote> gives the quoted text the right semantics
 * for anything reading the page structurally. The mark is drawn, not read:
 * <blockquote> already says it is a quotation.
 *
 * `attribution` holds the role; it predates the `name` field.
 */
const PullQuote = ({ quote, name, attribution, avatar, color, accent }) => {
  if (!quote) return null

  const bg = isHex(color?.hex) ? color.hex : isHex(accent) ? accent : FALLBACK_BG
  const avatarUrl = avatar?.asset?.url
  const hasCaption = name || attribution || avatarUrl

  return (
    <figure
      className={`${styles.block} ${styles.quote}`}
      style={{ "--quote-bg": bg, "--quote-fg": textOn(bg) }}
    >
      <blockquote className={styles.quoteText}>
        <QuoteMark className={styles.quoteMark} />
        {quote}
      </blockquote>
      {hasCaption && (
        <figcaption className={styles.quoteBy}>
          {avatarUrl && (
            <img
              className={styles.quoteAvatar}
              src={sanityImageUrl(avatarUrl, { width: 144, height: 144, fit: "crop" })}
              alt=""
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
          )}
          {(name || attribution) && (
            <span className={styles.quoteWho}>
              {name && <span className={styles.quoteName}>{name}</span>}
              {attribution && <span className={styles.quoteRole}>{attribution}</span>}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

export default PullQuote
