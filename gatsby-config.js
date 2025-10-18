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
    title: `TOBI - UX Designer Portfolio`,
    description: `Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.`,
    author: `Tobi`,
    siteUrl: `https://tobilobaodu.com/`,
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TOBI - UX Designer Portfolio`,
        short_name: `TOBI`,
        start_url: `/`,
        background_color: `#F9F9F8`,
        theme_color: `#EE550E`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
