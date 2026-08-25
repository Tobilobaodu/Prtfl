import * as React from "react"
import { sanityImageUrl } from "../../utils/sanityImage"
import * as styles from "./blocks.module.css"

/**
 * A grid of pods, each an icon beside a short heading and a paragraph. Two
 * columns on desktop, one below 768px.
 *
 * The grid is not fixed at four: any number of pods flows through the two
 * columns, so the block works as a 2, 4 or 6 up set without a variant.
 */
const IconPodGrid = ({ pods = [] }) => {
  if (!pods.length) return null

  return (
    <section className={`${styles.block} ${styles.iconGrid}`}>
      {pods.map((pod, i) => {
        const iconUrl = pod?.icon?.asset?.url
        return (
          <div key={pod?._key || i} className={styles.iconPod}>
            {/* Rendered only when there is an icon: an empty badge still
                reserves 42px plus the 20px gap, which reads as a hole rather
                than as alignment. */}
            {iconUrl && (
              <div className={styles.iconBadge}>
                {/* Rendered at 42x47; ask for 2x rather than the original. */}
                <img
                  src={sanityImageUrl(iconUrl, { width: 94 })}
                  alt=""
                  aria-hidden="true"
                  width="42"
                  height="47"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className={styles.iconCopy}>
              {pod?.heading && <h3 className={styles.iconHeading}>{pod.heading}</h3>}
              {pod?.body && <p className={`${styles.iconText} type-body-small`}>{pod.body}</p>}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default IconPodGrid
