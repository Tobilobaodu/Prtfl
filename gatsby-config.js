/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Tobiloba Odu - Experienced Product Designer Portfolio`,
    description: `Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.`,
    author: `Tobiloba Odu`,
    siteUrl: `https://tobilobaodu.com/`,
  },
  flags: {
    DEV_SSR: true, // Enable custom 404 page in development
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
