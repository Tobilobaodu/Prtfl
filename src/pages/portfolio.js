import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PortfolioPage = () => {
  const projects = [
    {
      id: 1,
      title: "Mobile App Design",
      category: "Mobile Design",
      description: "A comprehensive mobile app design project focusing on user experience and accessibility for a fitness tracking application.",
      image: "mobile-app",
      tags: ["UI/UX Design", "Mobile", "Prototyping"],
      link: "/portfolio/mobile-app-design"
    },
    {
      id: 2,
      title: "Web Platform Redesign",
      category: "Web Design",
      description: "Complete redesign of a web platform focusing on modern UX principles and user feedback for an e-commerce site.",
      image: "web-platform",
      tags: ["Web Design", "E-commerce", "User Research"],
      link: "/portfolio/web-platform-redesign"
    },
    {
      id: 3,
      title: "Design System",
      category: "Design Systems",
      description: "Creating a comprehensive design system for consistent user experiences across multiple products and platforms.",
      image: "design-system",
      tags: ["Design Systems", "Components", "Documentation"],
      link: "/portfolio/design-system"
    },
    {
      id: 4,
      title: "Dashboard Interface",
      category: "Web Application",
      description: "User-centered design for a complex dashboard interface, improving data visualization and user workflow efficiency.",
      image: "dashboard",
      tags: ["Dashboard", "Data Visualization", "Web App"],
      link: "/portfolio/dashboard-interface"
    },
    {
      id: 5,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image: "brand-identity",
      tags: ["Branding", "Logo Design", "Guidelines"],
      link: "/portfolio/brand-identity"
    },
    {
      id: 6,
      title: "E-commerce Mobile App",
      category: "Mobile Design",
      description: "Mobile-first design approach for an e-commerce application, focusing on seamless shopping experience and conversion optimization.",
      image: "ecommerce-mobile",
      tags: ["Mobile Commerce", "UX Optimization", "Conversion"],
      link: "/portfolio/ecommerce-mobile"
    }
  ]

  const categories = ["All", "Mobile Design", "Web Design", "Design Systems", "Branding"]

  return (
    <Layout>
      <div style={{
        maxWidth: `1200px`,
        margin: `0 auto`,
        padding: `2rem`,
      }}>
        <div style={{
          textAlign: `center`,
          marginBottom: `3rem`,
        }}>
          <h1 style={{
            fontSize: `3rem`,
            marginBottom: `1rem`,
            color: `#2c3e50`,
          }}>
            Portfolio
          </h1>
          <p style={{
            fontSize: `1.2rem`,
            color: `#5a6c7d`,
            maxWidth: `600px`,
            margin: `0 auto`,
          }}>
            A collection of my recent work showcasing user-centered design solutions
            across various industries and platforms.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: `flex`,
          justifyContent: `center`,
          marginBottom: `3rem`,
          flexWrap: `wrap`,
          gap: `1rem`,
        }}>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                padding: `0.5rem 1.5rem`,
                border: `2px solid #667eea`,
                background: `transparent`,
                color: `#667eea`,
                borderRadius: `25px`,
                cursor: `pointer`,
                fontSize: `1rem`,
                transition: `all 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = `#667eea`
                e.target.style.color = `white`
              }}
              onMouseLeave={(e) => {
                e.target.style.background = `transparent`
                e.target.style.color = `#667eea`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`,
          gap: `2rem`,
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: `white`,
                borderRadius: `12px`,
                boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1)`,
                overflow: `hidden`,
                transition: `transform 0.3s ease, box-shadow 0.3s ease`,
                cursor: `pointer`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateY(-5px)`
                e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.15)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(0)`
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(0, 0, 0, 0.1)`
              }}
            >
              <div style={{
                height: `250px`,
                background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                color: `white`,
                fontSize: `1.2rem`,
                position: `relative`,
              }}>
                <span>{project.title} Preview</span>
                <div style={{
                  position: `absolute`,
                  top: `1rem`,
                  left: `1rem`,
                  background: `rgba(255, 255, 255, 0.9)`,
                  color: `#667eea`,
                  padding: `0.3rem 0.8rem`,
                  borderRadius: `15px`,
                  fontSize: `0.8rem`,
                  fontWeight: `bold`,
                }}>
                  {project.category}
                </div>
              </div>

              <div style={{ padding: `2rem` }}>
                <h3 style={{
                  fontSize: `1.5rem`,
                  marginBottom: `1rem`,
                  color: `#2c3e50`,
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: `#5a6c7d`,
                  marginBottom: `1.5rem`,
                  lineHeight: `1.6`,
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  gap: `0.5rem`,
                  marginBottom: `1.5rem`,
                }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
                        color: `#667eea`,
                        padding: `0.3rem 0.8rem`,
                        borderRadius: `15px`,
                        fontSize: `0.8rem`,
                        fontWeight: `500`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={project.link}
                  style={{
                    color: `#667eea`,
                    textDecoration: `none`,
                    fontWeight: `bold`,
                    fontSize: `1.1rem`,
                    display: `inline-flex`,
                    alignItems: `center`,
                    transition: `color 0.3s ease`,
                  }}
                >
                  View Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section style={{
          background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
          padding: `4rem 2rem`,
          borderRadius: `12px`,
          textAlign: `center`,
          marginTop: `4rem`,
        }}>
          <h2 style={{
            fontSize: `2.5rem`,
            marginBottom: `1rem`,
            color: `#2c3e50`,
          }}>
            Interested in Working Together?
          </h2>
          <p style={{
            fontSize: `1.1rem`,
            color: `#5a6c7d`,
            marginBottom: `2rem`,
            maxWidth: `600px`,
            margin: `0 auto 2rem`,
          }}>
            I'm always open to discussing new opportunities and interesting projects.
            Let's create something amazing together.
          </p>
          <Link
            to="/contact"
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
            Start a Project
          </Link>
        </section>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Portfolio" />

export default PortfolioPage
