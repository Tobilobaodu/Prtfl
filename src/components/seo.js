/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, image, pathname, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
            twitterUsername
          }
        }
      }
    `
  )

  const meta = site.siteMetadata
  const metaDescription = description || meta.description
  const defaultTitle = meta?.title
  const fullTitle = defaultTitle && title ? `${title} | ${defaultTitle}` : title || defaultTitle

  // siteUrl was previously defined but never used, so pages shipped without a
  // canonical URL or an absolute og:image — links shared to LinkedIn/Slack had
  // no preview. Both are resolved against it here.
  const siteUrl = (meta?.siteUrl || "").replace(/\/$/, "")
  const canonical = pathname ? `${siteUrl}${pathname}` : siteUrl
  const rawImage = image || meta?.image
  const absoluteImage = rawImage?.startsWith("http") ? rawImage : `${siteUrl}${rawImage || ""}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={defaultTitle} />
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}

      <meta name="twitter:card" content={absoluteImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:creator" content={meta?.twitterUsername || meta?.author || ``} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}

      {children}
    </>
  )
}

export default Seo
