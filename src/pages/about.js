import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => (
  <Layout>
    <div style={{
      maxWidth: `800px`,
      margin: `0 auto`,
      padding: `2rem`,
    }}>
      <h1 style={{
        fontSize: `3rem`,
        marginBottom: `2rem`,
        color: `#2c3e50`,
        textAlign: `center`,
      }}>
        About Me
      </h1>

      <div style={{
        display: `grid`,
        gridTemplateColumns: `1fr 1fr`,
        gap: `3rem`,
        alignItems: `start`,
        marginBottom: `3rem`,
      }}>
        <div>
          <div style={{
            width: `300px`,
            height: `300px`,
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            borderRadius: `50%`,
            margin: `0 auto 2rem`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `white`,
            fontSize: `1.2rem`,
          }}>
            Profile Photo
          </div>
        </div>

        <div>
          <h2 style={{
            fontSize: `2rem`,
            marginBottom: `1rem`,
            color: `#2c3e50`,
          }}>
            Hi, I'm [Your Name]
          </h2>
          <p style={{
            fontSize: `1.1rem`,
            lineHeight: `1.7`,
            color: `#5a6c7d`,
            marginBottom: `1.5rem`,
          }}>
            I'm a passionate UX designer with over [X] years of experience creating
            intuitive and engaging digital experiences. I believe that great design
            is not just about making things look beautiful, but about solving real
            problems for real people.
          </p>
          <p style={{
            fontSize: `1.1rem`,
            lineHeight: `1.7`,
            color: `#5a6c7d`,
            marginBottom: `1.5rem`,
          }}>
            My approach combines user research, interaction design, and visual design
            to create products that users love and businesses value. I'm particularly
            passionate about accessibility, inclusive design, and creating seamless
            experiences across all devices and platforms.
          </p>
        </div>
      </div>

      <section style={{ marginBottom: `3rem` }}>
        <h2 style={{
          fontSize: `2.5rem`,
          marginBottom: `2rem`,
          color: `#2c3e50`,
          textAlign: `center`,
        }}>
          Skills & Expertise
        </h2>
        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
          gap: `2rem`,
        }}>
          <div style={{
            background: `white`,
            padding: `2rem`,
            borderRadius: `8px`,
            boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            textAlign: `center`,
          }}>
            <h3 style={{ color: `#667eea`, marginBottom: `1rem` }}>Design</h3>
            <ul style={{
              listStyle: `none`,
              padding: 0,
              textAlign: `left`,
            }}>
              <li>User Research</li>
              <li>Information Architecture</li>
              <li>Interaction Design</li>
              <li>Visual Design</li>
              <li>Prototyping</li>
            </ul>
          </div>

          <div style={{
            background: `white`,
            padding: `2rem`,
            borderRadius: `8px`,
            boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            textAlign: `center`,
          }}>
            <h3 style={{ color: `#667eea`, marginBottom: `1rem` }}>Tools</h3>
            <ul style={{
              listStyle: `none`,
              padding: 0,
              textAlign: `left`,
            }}>
              <li>Figma</li>
              <li>Adobe Creative Suite</li>
              <li>Sketch</li>
              <li>Principle</li>
              <li>InVision</li>
            </ul>
          </div>

          <div style={{
            background: `white`,
            padding: `2rem`,
            borderRadius: `8px`,
            boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            textAlign: `center`,
          }}>
            <h3 style={{ color: `#667eea`, marginBottom: `1rem` }}>Technical</h3>
            <ul style={{
              listStyle: `none`,
              padding: 0,
              textAlign: `left`,
            }}>
              <li>HTML/CSS</li>
              <li>JavaScript</li>
              <li>Design Systems</li>
              <li>Accessibility</li>
              <li>Usability Testing</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{
        background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
        padding: `3rem`,
        borderRadius: `8px`,
        textAlign: `center`,
      }}>
        <h2 style={{
          fontSize: `2.5rem`,
          marginBottom: `1rem`,
          color: `#2c3e50`,
        }}>
          Let's Work Together
        </h2>
        <p style={{
          fontSize: `1.1rem`,
          color: `#5a6c7d`,
          marginBottom: `2rem`,
          maxWidth: `600px`,
          margin: `0 auto 2rem`,
        }}>
          I'm always interested in new opportunities and exciting projects.
          Whether you have a specific project in mind or just want to chat about design,
          I'd love to hear from you.
        </p>
        <a
          href="mailto:hello@uxdesigner.com"
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
          Get In Touch
        </a>
      </section>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="About" />

export default AboutPage
