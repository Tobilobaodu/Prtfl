import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PhotographyPage = () => {
  const photoCategories = [
    {
      id: 1,
      title: "Street Photography",
      description: "Capturing the essence of urban life and everyday moments",
      count: 24,
      coverColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
      id: 2,
      title: "Portrait Photography",
      description: "Exploring human emotions and connections through portraiture",
      count: 18,
      coverColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      id: 3,
      title: "Nature & Landscape",
      description: "Finding beauty in natural environments and landscapes",
      count: 32,
      coverColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
      id: 4,
      title: "Architecture",
      description: "Documenting the built environment and urban structures",
      count: 15,
      coverColor: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
    },
    {
      id: 5,
      title: "Travel Photography",
      description: "Stories and moments captured during my travels",
      count: 28,
      coverColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
      id: 6,
      title: "Abstract & Experimental",
      description: "Creative experiments with light, form, and composition",
      count: 12,
      coverColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ]

  return (
    <Layout>
      <div style={{
        maxWidth: `1200px`,
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
            Photography Portfolio
          </h1>
          <p style={{
            fontSize: `1.2rem`,
            color: `#5a6c7d`,
            maxWidth: `700px`,
            margin: `0 auto`,
            lineHeight: `1.7`,
          }}>
            When I'm not designing digital experiences, I capture moments through photography.
            My work explores the intersection of design principles and visual storytelling,
            focusing on composition, light, and human connection.
          </p>
        </div>

        {/* Photography Categories Grid */}
        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`,
          gap: `2rem`,
          marginBottom: `4rem`,
        }}>
          {photoCategories.map((category) => (
            <div
              key={category.id}
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
                background: category.coverColor,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`,
                color: `white`,
                textAlign: `center`,
                padding: `2rem`,
              }}>
                <div style={{
                  fontSize: `4rem`,
                  marginBottom: `1rem`,
                  opacity: `0.8`,
                }}>
                  📷
                </div>
                <h3 style={{
                  fontSize: `1.5rem`,
                  marginBottom: `0.5rem`,
                }}>
                  {category.title}
                </h3>
                <p style={{
                  fontSize: `0.9rem`,
                  opacity: `0.9`,
                }}>
                  {category.count} photos
                </p>
              </div>

              <div style={{ padding: `2rem` }}>
                <p style={{
                  color: `#5a6c7d`,
                  marginBottom: `1.5rem`,
                  lineHeight: `1.6`,
                }}>
                  {category.description}
                </p>

                <button
                  style={{
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    color: `white`,
                    border: `none`,
                    padding: `0.8rem 1.5rem`,
                    borderRadius: `25px`,
                    fontSize: `1rem`,
                    cursor: `pointer`,
                    transition: `transform 0.3s ease`,
                    width: `100%`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = `translateY(-2px)`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = `translateY(0)`
                  }}
                >
                  View Gallery
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Photos Section */}
        <section style={{
          background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
          padding: `4rem 2rem`,
          borderRadius: `12px`,
          marginBottom: `4rem`,
        }}>
          <h2 style={{
            fontSize: `2.5rem`,
            marginBottom: `2rem`,
            color: `#2c3e50`,
            textAlign: `center`,
          }}>
            Featured Work
          </h2>

          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: `1.5rem`,
          }}>
            {[1, 2, 3, 4, 5, 6].map((photo) => (
              <div
                key={photo}
                style={{
                  height: `250px`,
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  borderRadius: `8px`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  color: `white`,
                  fontSize: `1.2rem`,
                  transition: `transform 0.3s ease`,
                  cursor: `pointer`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `scale(1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `scale(1)`
                }}
              >
                Featured Photo {photo}
              </div>
            ))}
          </div>
        </section>

        {/* About Photography Section */}
        <section style={{
          background: `white`,
          padding: `4rem 2rem`,
          borderRadius: `12px`,
          boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1)`,
          textAlign: `center`,
        }}>
          <h2 style={{
            fontSize: `2.5rem`,
            marginBottom: `2rem`,
            color: `#2c3e50`,
          }}>
            Design Through Photography
          </h2>

          <div style={{
            maxWidth: `800px`,
            margin: `0 auto`,
            lineHeight: `1.8`,
          }}>
            <p style={{
              fontSize: `1.1rem`,
              color: `#5a6c7d`,
              marginBottom: `2rem`,
            }}>
              Photography has always been an integral part of my creative process. The principles
              I apply in UX design—composition, balance, contrast, and storytelling—are the same
              ones that guide my photography work. Each image is an opportunity to tell a story,
              evoke emotion, and capture a moment in time.
            </p>

            <p style={{
              fontSize: `1.1rem`,
              color: `#5a6c7d`,
              marginBottom: `2rem`,
            }}>
              My photography journey began as a way to document my travels and has evolved into
              a deeper exploration of visual communication. I believe that understanding light,
              composition, and human connection makes me a better designer, and being a designer
              makes me more intentional about the stories I tell through my lens.
            </p>

            <div style={{
              display: `flex`,
              justifyContent: `center`,
              gap: `2rem`,
              marginTop: `3rem`,
              flexWrap: `wrap`,
            }}>
              <div style={{
                textAlign: `center`,
              }}>
                <div style={{
                  fontSize: `3rem`,
                  color: `#667eea`,
                  marginBottom: `0.5rem`,
                }}>
                  📸
                </div>
                <h3 style={{
                  color: `#2c3e50`,
                  marginBottom: `0.5rem`,
                }}>
                  Documentary Style
                </h3>
                <p style={{
                  color: `#5a6c7d`,
                  maxWidth: `200px`,
                }}>
                  Capturing authentic moments and real stories
                </p>
              </div>

              <div style={{
                textAlign: `center`,
              }}>
                <div style={{
                  fontSize: `3rem`,
                  color: `#667eea`,
                  marginBottom: `0.5rem`,
                }}>
                  🎨
                </div>
                <h3 style={{
                  color: `#2c3e50`,
                  marginBottom: `0.5rem`,
                }}>
                  Visual Design
                </h3>
                <p style={{
                  color: `#5a6c7d`,
                  maxWidth: `200px`,
                }}>
                  Applying design principles to photography
                </p>
              </div>

              <div style={{
                textAlign: `center`,
              }}>
                <div style={{
                  fontSize: `3rem`,
                  color: `#667eea`,
                  marginBottom: `0.5rem`,
                }}>
                  🌍
                </div>
                <h3 style={{
                  color: `#2c3e50`,
                  marginBottom: `0.5rem`,
                }}>
                  Global Perspective
                </h3>
                <p style={{
                  color: `#5a6c7d`,
                  maxWidth: `200px`,
                }}>
                  Drawing inspiration from diverse cultures
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          padding: `4rem 2rem`,
          borderRadius: `12px`,
          textAlign: `center`,
          color: `white`,
        }}>
          <h2 style={{
            fontSize: `2.5rem`,
            marginBottom: `1rem`,
          }}>
            Interested in a Collaboration?
          </h2>
          <p style={{
            fontSize: `1.1rem`,
            marginBottom: `2rem`,
            maxWidth: `600px`,
            margin: `0 auto 2rem`,
            opacity: `0.9`,
          }}>
            Whether you need photography for your brand, event coverage, or just want to
            discuss creative projects, I'd love to hear from you.
          </p>
          <Link
            to="/contact"
            style={{
              background: `white`,
              color: `#667eea`,
              padding: `1rem 2rem`,
              textDecoration: `none`,
              borderRadius: `25px`,
              fontSize: `1.1rem`,
              display: `inline-block`,
              transition: `transform 0.3s ease`,
              fontWeight: `bold`,
            }}
          >
            Get In Touch
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
export const Head = () => <Seo title="Photography" />

export default PhotographyPage
