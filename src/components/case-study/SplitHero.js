import * as React from "react"
import { sanityImageProps } from "../../utils/sanityImage"
import { slugify } from "../../utils/slugify"
import * as styles from "./blocks.module.css"

const LockGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337Z"
      fill="currentColor"
    />
  </svg>
)

/**
 * Split hero: headline, body and an optional call to action on the left, an
 * image on the right. Collapses to a single column at the same width the case
 * study body itself does.
 *
 * The call to action is deliberately generic — a label plus an optional URL —
 * rather than being wired to the password gate, so the block is reusable on
 * unlocked case studies. It renders as an anchor only when there is somewhere
 * to go; otherwise it is a plain span, never an inert <button>.
 */
const SplitHero = ({ headline, body, image, ctaLabel, ctaUrl, ctaLocked }) => {
  const url = image?.asset?.url
  const id = headline ? slugify(headline) : undefined
  const isLink = Boolean(ctaUrl)
  const CtaTag = isLink ? "a" : "span"
  const external = isLink && /^https?:\/\//.test(ctaUrl)

  return (
    <section id={id} className={`${styles.block} ${styles.hero}`}>
      <div className={styles.heroCopy}>
        {headline && <h2 className={styles.heroHeadline}>{headline}</h2>}
        {body && <p className={`${styles.heroBody} type-body-small`}>{body}</p>}
        {ctaLabel && (
          <CtaTag
            className={styles.cta}
            {...(isLink
              ? {
                  href: ctaUrl,
                  ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                }
              : {})}
          >
            {ctaLocked && <LockGlyph />}
            <span>{ctaLabel}</span>
          </CtaTag>
        )}
      </div>

      {url && (
        <div className={styles.heroMedia}>
          <img
            {...sanityImageProps(url, { width: 960, sizes: "(max-width: 1199px) 100vw, 40vw" })}
            alt={image?.alt || ""}
          />
        </div>
      )}
    </section>
  )
}

export default SplitHero
