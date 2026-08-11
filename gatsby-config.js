/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const siteUrl = `https://tobilobaodu.com`

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Tobiloba Odu - Experienced Product Designer Portfolio`,
    description: `Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.`,
    author: `Tobiloba Odu`,
    siteUrl,
    // Default social preview image, served from static/.
    image: `/og-image.png`,
    twitterUsername: `@tobilobaodu`,
  },
  flags: {
    DEV_SSR: true, // Enable custom 404 page in development
  },
  plugins: [
    `gatsby-plugin-image`,
    // gatsby-plugin-sharp is required by gatsby-plugin-manifest to generate
    // icons; gatsby-transformer-sharp is its standard companion for
    // gatsby-plugin-image. Content images come from Sanity's CDN.
    //
    // gatsby-source-filesystem was removed: it pointed at src/images, which
    // only held two unused Gatsby starter images. With those deleted the
    // directory does not survive a fresh clone (git does not track empty
    // directories) and the plugin would fail the build on a missing path.
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
        dataset: process.env.SANITY_DATASET || 'production',
        token: process.env.SANITY_READ_TOKEN,
        watchMode: process.env.NODE_ENV === 'development',
        overlayDrafts: false,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Locked case studies are still real, linkable pages (they render a
        // public shell), so they stay in the sitemap.
        output: `/sitemap`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tobiloba Odu - Experienced Product Designer Portfolio`,
        short_name: `Tobiloba Odu`,
        start_url: `/`,
        background_color: `#F9F9F8`,
        theme_color: `#EE550E`,
        display: `minimal-ui`,
        icon: `src/Assets/logo/logo.svg`,
      },
    },
  ],
}
