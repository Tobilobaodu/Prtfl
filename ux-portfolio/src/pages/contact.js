import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
  return (
    <Layout>
      <div style={{
        maxWidth: `1000px`,
        margin: `0 auto`,
        padding: `2rem`,
      }}>
        <div style={{
          textAlign: `center`,
          marginBottom: `4rem`,
        }}>
          <h1 style={{
            fontSize: `3rem`,
            marginBottom: `1rem`,
            color: `#2c3e50`,
          }}>
            Let's Work Together
          </h1>
          <p style={{
            fontSize: `1.2rem`,
            color: `#5a6c7d`,
            maxWidth: `600px`,
            margin: `0 auto`,
            lineHeight: `1.7`,
          }}>
            I'm always interested in new opportunities and exciting projects.
            Whether you have a specific project in mind or just want to chat about design,
            I'd love to hear from you.
          </p>
        </div>

        <div style={{
          display: `grid`,
          gridTemplateColumns: `1fr 1fr`,
          gap: `4rem`,
          alignItems: `start`,
        }}>
          {/* Contact Form */}
          <div style={{
            background: `white`,
            padding: `3rem`,
            borderRadius: `12px`,
            boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1)`,
          }}>
            <h2 style={{
              fontSize: `2rem`,
              marginBottom: `2rem`,
              color: `#2c3e50`,
            }}>
              Send Me a Message
            </h2>

            <form style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `1.5rem`,
            }}>
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="project-type"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Project Type
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                    background: `white`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                >
                  <option value="">Select project type</option>
                  <option value="ux-design">UX Design</option>
                  <option value="ui-design">UI Design</option>
                  <option value="web-design">Web Design</option>
                  <option value="mobile-design">Mobile App Design</option>
                  <option value="design-system">Design System</option>
                  <option value="consulting">Design Consulting</option>
                  <option value="photography">Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                    background: `white`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                >
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="over-50k">Over $50,000</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: `block`,
                    marginBottom: `0.5rem`,
                    fontWeight: `bold`,
                    color: `#2c3e50`,
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                  style={{
                    width: `100%`,
                    padding: `1rem`,
                    border: `2px solid #e5e5e5`,
                    borderRadius: `8px`,
                    fontSize: `1rem`,
                    transition: `border-color 0.3s ease`,
                    boxSizing: `border-box`,
                    resize: `vertical`,
                    fontFamily: `inherit`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `#667eea`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `#e5e5e5`
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  color: `white`,
                  border: `none`,
                  padding: `1.2rem 2rem`,
                  borderRadius: `8px`,
                  fontSize: `1.1rem`,
                  fontWeight: `bold`,
                  cursor: `pointer`,
                  transition: `transform 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = `translateY(-2px)`
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = `translateY(0)`
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div style={{
              background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
              padding: `3rem`,
              borderRadius: `12px`,
              marginBottom: `2rem`,
            }}>
              <h2 style={{
                fontSize: `2rem`,
                marginBottom: `2rem`,
                color: `#2c3e50`,
              }}>
                Get In Touch
              </h2>

              <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `1.5rem`,
              }}>
                <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1rem`,
                }}>
                  <div style={{
                    width: `50px`,
                    height: `50px`,
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    borderRadius: `50%`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    color: `white`,
                    fontSize: `1.2rem`,
                  }}>
                    📧
                  </div>
                  <div>
                    <h3 style={{
                      margin: `0 0 0.5rem 0`,
                      color: `#2c3e50`,
                      fontSize: `1.1rem`,
                    }}>
                      Email
                    </h3>
                    <a
                      href="mailto:hello@uxdesigner.com"
                      style={{
                        color: `#667eea`,
                        textDecoration: `none`,
                        fontSize: `1rem`,
                      }}
                    >
                      hello@uxdesigner.com
                    </a>
                  </div>
                </div>

                <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1rem`,
                }}>
                  <div style={{
                    width: `50px`,
                    height: `50px`,
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    borderRadius: `50%`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    color: `white`,
                    fontSize: `1.2rem`,
                  }}>
                    📱
                  </div>
                  <div>
                    <h3 style={{
                      margin: `0 0 0.5rem 0`,
                      color: `#2c3e50`,
                      fontSize: `1.1rem`,
                    }}>
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      style={{
                        color: `#667eea`,
                        textDecoration: `none`,
                        fontSize: `1rem`,
                      }}
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1rem`,
                }}>
                  <div style={{
                    width: `50px`,
                    height: `50px`,
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    borderRadius: `50%`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    color: `white`,
                    fontSize: `1.2rem`,
                  }}>
                    💼
                  </div>
                  <div>
                    <h3 style={{
                      margin: `0 0 0.5rem 0`,
                      color: `#2c3e50`,
                      fontSize: `1.1rem`,
                    }}>
                      LinkedIn
                    </h3>
                    <a
                      href="https://linkedin.com/in/uxdesigner"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: `#667eea`,
                        textDecoration: `none`,
                        fontSize: `1rem`,
                      }}
                    >
                      linkedin.com/in/uxdesigner
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `12px`,
              boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1)`,
              textAlign: `center`,
            }}>
              <div style={{
                width: `60px`,
                height: `60px`,
                background: `linear-gradient(135deg, #4CAF50 0%, #45a049 100%)`,
                borderRadius: `50%`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                color: `white`,
                fontSize: `1.5rem`,
                margin: `0 auto 1rem`,
              }}>
                ✓
              </div>
              <h3 style={{
                color: `#2c3e50`,
                marginBottom: `1rem`,
                fontSize: `1.3rem`,
              }}>
                Available for Projects
              </h3>
              <p style={{
                color: `#5a6c7d`,
                marginBottom: `1.5rem`,
                lineHeight: `1.6`,
              }}>
                I'm currently accepting new projects with availability starting next month.
                I typically work with 2-3 clients at a time to ensure quality and attention to detail.
              </p>
              <div style={{
                fontSize: `0.9rem`,
                color: `#667eea`,
                fontWeight: `bold`,
              }}>
                Typical response time: 24-48 hours
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section style={{
          background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
          padding: `4rem 2rem`,
          borderRadius: `12px`,
          marginTop: `4rem`,
        }}>
          <h2 style={{
            fontSize: `2.5rem`,
            marginBottom: `2rem`,
            color: `#2c3e50`,
            textAlign: `center`,
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`,
            gap: `2rem`,
            maxWidth: `1000px`,
            margin: `0 auto`,
          }}>
            <div style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `8px`,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}>
              <h3 style={{
                color: `#667eea`,
                marginBottom: `1rem`,
                fontSize: `1.2rem`,
              }}>
                What's your typical project timeline?
              </h3>
              <p style={{
                color: `#5a6c7d`,
                lineHeight: `1.6`,
              }}>
                Project timelines vary based on scope and complexity. A typical UX design project
                takes 4-8 weeks from research to final deliverables, while smaller projects can be
                completed in 2-4 weeks.
              </p>
            </div>

            <div style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `8px`,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}>
              <h3 style={{
                color: `#667eea`,
                marginBottom: `1rem`,
                fontSize: `1.2rem`,
              }}>
                Do you work with international clients?
              </h3>
              <p style={{
                color: `#5a6c7d`,
                lineHeight: `1.6`,
              }}>
                Absolutely! I work with clients worldwide and am comfortable with different time zones.
                Most of my communication happens through email, video calls, and project management tools.
              </p>
            </div>

            <div style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `8px`,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}>
              <h3 style={{
                color: `#667eea`,
                marginBottom: `1rem`,
                fontSize: `1.2rem`,
              }}>
                What materials do you need to start?
              </h3>
              <p style={{
                color: `#5a6c7d`,
                lineHeight: `1.6`,
              }}>
                To get started, I typically need access to your brand guidelines (if available),
                information about your target audience, project goals, and any existing research or
                analytics data you might have.
              </p>
            </div>

            <div style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `8px`,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}>
              <h3 style={{
                color: `#667eea`,
                marginBottom: `1rem`,
                fontSize: `1.2rem`,
              }}>
                Do you provide ongoing support?
              </h3>
              <p style={{
                color: `#5a6c7d`,
                lineHeight: `1.6`,
              }}>
                Yes! I offer post-launch support and can help with implementation questions,
                iterations based on user feedback, and ongoing design system maintenance.
              </p>
            </div>
          </div>
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
export const Head = () => <Seo title="Contact" />

export default ContactPage
