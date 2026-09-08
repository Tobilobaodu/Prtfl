import * as React from "react"
import { sanityImageProps } from "../../utils/sanityImage"
import * as styles from "./blocks.module.css"

/**
 * A row of image cards, each an image above a title and a short description.
 * Three across on desktop, two on tablet, one on mobile.
 *
 * Each cell holds its 350:333 aspect ratio rather than a fixed height, so a
 * mixed set of portrait and landscape sources still produces a level row.
 */
const ImagePodGrid = ({ pods = [] }) => {
  if (!pods.length) return null

  return (
    <section className={`${styles.block} ${styles.podGrid}`}>
      {pods.map((pod, i) => {
        const url = pod?.image?.asset?.url
        return (
          <article key={pod?._key || i} className={styles.pod}>
            {url && (
              <div className={styles.podMedia}>
                <img
                  {...sanityImageProps(url, {
                    width: 700,
                    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
                  })}
                  alt={pod.image?.alt || pod.title || ""}
                />
              </div>
            )}
            {(pod?.title || pod?.description) && (
              <div className={styles.podCopy}>
                {pod.title && <h3 className={styles.podTitle}>{pod.title}</h3>}
                {pod.description && (
                  <p className={`${styles.podText} type-body-small`}>{pod.description}</p>
                )}
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}

export default ImagePodGrid
