/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path")

// Sentinel slug that matches no project. Locked case studies are built with
// this as their content slug so the page query resolves to null and their body
// never reaches the static output (public/page-data/**). The real content is
// served at runtime by netlify/functions/get-case-study.js, gated on a signed
// token from netlify/functions/verify-password.js.
const NO_CONTENT_SLUG = "__locked__"

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create case study pages
  const caseStudyResult = await graphql(`
    {
      allSanityProject {
        edges {
          node {
            locked
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (caseStudyResult.errors) {
    throw caseStudyResult.errors
  }

  const caseStudyTemplate = path.resolve(`src/templates/case-study.js`)

  caseStudyResult.data.allSanityProject.edges.forEach(({ node }) => {
    // Only create pages for projects that have slugs set
    if (node.slug?.current) {
      const locked = node.locked === true

      createPage({
        path: `case-study/${node.slug.current}`,
        component: caseStudyTemplate,
        context: {
          slug: node.slug.current,
          locked,
          contentSlug: locked ? NO_CONTENT_SLUG : node.slug.current,
        },
      })
    }
  })
}

// Gatsby's develop webpack config injects eslint-webpack-plugin using
// ESLint v8-only options (extensions, useEslintrc, resolvePluginsRelativeTo,
// rulePaths), which crashes `gatsby develop` on ESLint v9. Lint stays
// available via `npm run lint` (flat config); just don't run it in the bundler.
exports.onCreateWebpackConfig = ({ stage, getConfig, actions }) => {
  if (stage === `develop`) {
    const config = getConfig()
    config.plugins = (config.plugins || []).filter(
      (plugin) =>
        !(plugin && plugin.constructor && plugin.constructor.name === `ESLintWebpackPlugin`)
    )
    actions.replaceWebpackConfig(config)
  }
}
