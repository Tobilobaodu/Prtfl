/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

// Runs before first paint. The intro loader is server-rendered so it appears
// instantly on a first visit; for repeat visits in the same session this marks
// <html> so CSS hides the loader before it can flash. Keep the storage key in
// sync with LOADER_SESSION_KEY in src/components/PageLoader.js.
const LOADER_SKIP_SCRIPT = `
try {
  if (window.sessionStorage.getItem('loader_shown') === 'true') {
    document.documentElement.classList.add('loader-skip');
  }
} catch (e) {}
`

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: `en` })

  setPreBodyComponents([
    React.createElement("script", {
      key: "loader-skip",
      dangerouslySetInnerHTML: { __html: LOADER_SKIP_SCRIPT },
    }),
  ])
}
