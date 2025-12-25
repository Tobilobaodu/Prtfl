/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path")

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
      createPage({
        path: `case-study/${node.slug.current}`,
        component: caseStudyTemplate,
        context: {
          slug: node.slug.current,
        },
      })
    }
  })

  // Keep existing DSG page
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
