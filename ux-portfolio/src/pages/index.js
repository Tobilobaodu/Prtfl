import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    {/* Hero Section */}
    <section style={{
      textAlign: `center`,
      padding: `4rem 0`,
      background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
      marginBottom: `3rem`,
      borderRadius: `8px`,
    }}>
      <div style={{
        maxWidth: `800px`,
        margin: `0 auto`,
        padding: `0 2rem`,
      }}>
        <h1 style={{
          fontSize: `3rem`,
          marginBottom: `1rem`,
          color: `#2c3e50`,
        }}>
          Hi, I'm a UX Designer
        </h1>
        <p style={{
          fontSize: `1.2rem`,
          marginBottom: `2rem`,
          color: `#5a6c7d`,
          lineHeight: `1.6`,
        }}>
          I create intuitive and engaging user experiences that solve real problems.
          Welcome to my portfolio where I showcase my design journey, case studies,
          and creative projects.
        </p>
        <div>
          <Link
            to="/portfolio"
            style={{
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
              color: `white`,
              padding: `1rem 2rem`,
              textDecoration: `none`,
              borderRadius: `25px`,
              fontSize: `1.1rem`,
              marginRight: `1rem`,
              display: `inline-block`,
              transition: `transform 0.3s ease`,
            }}
          >
            View My Work
          </Link>
          <Link
            to="/about"
            style={{
              background: `transparent`,
              color: `#667eea`,
              padding: `1rem 2rem`,
              textDecoration: `none`,
              border: `2px solid #667eea`,
              borderRadius: `25px`,
              fontSize: `1.1rem`,
              display: `inline-block`,
              transition: `all 0.3s ease`,
            }}
          >
            Learn More About Me
          </Link>
        </div>
      </div>
    </section>

    {/* Featured Work Section */}
    <section style={{ marginBottom: `3rem` }}>
      <h2 style={{
        textAlign: `center`,
        marginBottom: `2rem`,
        fontSize: `2.5rem`,
        color: `#2c3e50`,
      }}>
        Featured Projects
      </h2>
      <div style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
        gap: `2rem`,
        marginBottom: `3rem`,
      }}>
        {/* Project Card 1 */}
        <div style={{
          background: `white`,
          borderRadius: `8px`,
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          overflow: `hidden`,
          transition: `transform 0.3s ease`,
        }}>
          <div style={{
            height: `200px`,
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `white`,
            fontSize: `1.2rem`,
          }}>
            Project Image Placeholder
          </div>
          <div style={{ padding: `1.5rem` }}>
            <h3 style={{ marginBottom: `0.5rem`, color: `#2c3e50` }}>
              Mobile App Design
            </h3>
            <p style={{ color: `#5a6c7d`, marginBottom: `1rem` }}>
              A comprehensive mobile app design project focusing on user experience and accessibility.
            </p>
            <Link
              to="/portfolio/mobile-app-design"
              style={{
                color: `#667eea`,
                textDecoration: `none`,
                fontWeight: `bold`,
              }}
            >
              View Case Study →
            </Link>
          </div>
        </div>

        {/* Project Card 2 */}
        <div style={{
          background: `white`,
          borderRadius: `8px`,
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          overflow: `hidden`,
          transition: `transform 0.3s ease`,
        }}>
          <div style={{
            height: `200px`,
            background: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `white`,
            fontSize: `1.2rem`,
          }}>
            Project Image Placeholder
          </div>
          <div style={{ padding: `1.5rem` }}>
            <h3 style={{ marginBottom: `0.5rem`, color: `#2c3e50` }}>
              Web Platform Redesign
            </h3>
            <p style={{ color: `#5a6c7d`, marginBottom: `1rem` }}>
              Complete redesign of a web platform focusing on modern UX principles and user feedback.
            </p>
            <Link
              to="/portfolio/web-platform-redesign"
              style={{
                color: `#667eea`,
                textDecoration: `none`,
                fontWeight: `bold`,
              }}
            >
              View Case Study →
            </Link>
          </div>
        </div>

        {/* Project Card 3 */}
        <div style={{
          background: `white`,
          borderRadius: `8px`,
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          overflow: `hidden`,
          transition: `transform 0.3s ease`,
        }}>
          <div style={{
            height: `200px`,
            background: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `white`,
            fontSize: `1.2rem`,
          }}>
            Project Image Placeholder
          </div>
          <div style={{ padding: `1.5rem` }}>
            <h3 style={{ marginBottom: `0.5rem`, color: `#2c3e50` }}>
              Design System
            </h3>
            <p style={{ color: `#5a6c7d`, marginBottom: `1rem` }}>
              Creating a comprehensive design system for consistent user experiences across products.
            </p>
            <Link
              to="/portfolio/design-system"
              style={{
                color: `#667eea`,
                textDecoration: `none`,
                fontWeight: `bold`,
              }}
            >
              View Case Study →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Photography Section */}
    <section style={{
      background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
      padding: `3rem 0`,
      borderRadius: `8px`,
      textAlign: `center`,
    }}>
      <h2 style={{
        marginBottom: `1rem`,
        fontSize: `2.5rem`,
        color: `#2c3e50`,
      }}>
        Photography Portfolio
      </h2>
      <p style={{
        marginBottom: `2rem`,
        fontSize: `1.1rem`,
        color: `#5a6c7d`,
        maxWidth: `600px`,
        margin: `0 auto 2rem`,
      }}>
        When I'm not designing interfaces, I capture moments through photography.
        My work explores the intersection of design and visual storytelling.
      </p>
      <Link
        to="/photography"
        style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          color: `white`,
          padding: `1rem 2rem`,
          textDecoration: `none`,
          borderRadius: `25px`,
          fontSize: `1.1rem`,
          display: `inline-block`,
          transition: `transform 0.3s ease`,
        }}
      >
        View Photography Portfolio
      </Link>
    </section>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
