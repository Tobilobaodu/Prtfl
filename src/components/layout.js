/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <header
        style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {data.site.siteMetadata?.title || `Title`}
            </Link>
          </h1>
          <nav style={{ marginTop: `1rem` }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
                marginRight: `1rem`,
              }}
              activeStyle={{
                fontWeight: `bold`,
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                color: `white`,
                textDecoration: `none`,
                marginRight: `1rem`,
              }}
              activeStyle={{
                fontWeight: `bold`,
              }}
            >
              About
            </Link>
            <Link
              to="/portfolio"
              style={{
                color: `white`,
                textDecoration: `none`,
                marginRight: `1rem`,
              }}
              activeStyle={{
                fontWeight: `bold`,
              }}
            >
              Portfolio
            </Link>
            <Link
              to="/photography"
              style={{
                color: `white`,
                textDecoration: `none`,
                marginRight: `1rem`,
              }}
              activeStyle={{
                fontWeight: `bold`,
              }}
            >
              Photography
            </Link>
            <Link
              to="/contact"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
              activeStyle={{
                fontWeight: `bold`,
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            padding: `1rem 0`,
            borderTop: `1px solid #e5e5e5`,
            textAlign: `center`,
            fontSize: `0.9rem`,
            color: `#666`,
          }}
        >
          © {new Date().getFullYear()} UX Designer Portfolio &middot; Built with Gatsby
        </footer>
      </div>
    </>
  )
}

export default Layout
