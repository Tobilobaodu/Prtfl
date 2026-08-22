import * as React from "react"
import { graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"
import PageLoader from "../components/PageLoader"

const IndexPage = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [hoveredProject, setHoveredProject] = React.useState(null)
  const [selectedProject, setSelectedProject] = React.useState(null)
  const [emailCopied, setEmailCopied] = React.useState(false)

  const projects = data?.allSanityProject?.edges?.map(edge => edge.node) || []
  const preview = projects.find(p => p.id === hoveredProject)

  const handleProjectClick = (project, e) => {
    e.preventDefault()
    setSelectedProject(project)

    if (project.locked) {
      setModalOpen(true)
    } else {
      navigate(`/case-study/${project.slug.current}`)
    }
  }

  // Enter/Space should activate a project row the same way a click does.
  const handleProjectKeyDown = (project, e) => {
    if (e.key !== "Enter" && e.key !== " ") return
    handleProjectClick(project, e)
  }

  const handlePasswordCorrect = () => {
    if (selectedProject) {
      navigate(`/case-study/${selectedProject.slug.current}`)
    }
  }

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("oluwatobiodu@outlook.com").then(() => {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    })
  }

  return (
    <Layout>
      <PageLoader />
      <div className="home-container">
        <div className="container">
          <section className="bio-section">
            <div className="bio">
              <p className="bio-text">
                I'm a <strong>Product Designer</strong> who helps companies turn complex digital journeys into simple, useful experiences. Over the past seven years, I've used research, behavioural insight, and UI design to improve usability, conversion, and customer confidence. I've worked with high-growth startups and now lead design at OSB Group, shaping accessible financial products from early ideas to implementation. I enjoy partnering closely with people across product and engineering to make meaningful improvements that customers can actually feel.
              </p>
            </div>
          </section>

          <section className="projects-section">
            <div className="projects-list">
              {projects.map((project) => (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${project.title}${project.locked ? ' (password protected)' : ''}`}
                  className={`project-item clickable ${project.locked ? 'locked' : ''}`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onFocus={() => setHoveredProject(project.id)}
                  onBlur={() => setHoveredProject(null)}
                  onClick={(e) => handleProjectClick(project, e)}
                  onKeyDown={(e) => handleProjectKeyDown(project, e)}
                >
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-meta">
                      <span className="project-brand">{project.client}</span>
                      <span className="dot" aria-hidden="true">●</span>
                      <span className="project-year">{project.year}</span>
                      {project.locked && (
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M2.66699 15.167V5.83366H4.66699V4.50033C4.66699 3.5781 4.9921 2.79188 5.64233 2.14166C6.2921 1.49188 7.0781 1.16699 8.00033 1.16699C8.92255 1.16699 9.70877 1.49188 10.359 2.14166C11.0088 2.79188 11.3337 3.5781 11.3337 4.50033V5.83366H13.3337V15.167H2.66699ZM6.00033 5.83366H10.0003V4.50033C10.0003 3.94477 9.80588 3.47255 9.41699 3.08366C9.0281 2.69477 8.55588 2.50033 8.00033 2.50033C7.44477 2.50033 6.97255 2.69477 6.58366 3.08366C6.19477 3.47255 6.00033 3.94477 6.00033 4.50033V5.83366ZM4.00033 13.8337H12.0003V7.16699H4.00033V13.8337ZM8.00033 11.8337C8.36699 11.8337 8.68099 11.7032 8.94233 11.4423C9.20321 11.181 9.33366 10.867 9.33366 10.5003C9.33366 10.1337 9.20321 9.81966 8.94233 9.55833C8.68099 9.29744 8.36699 9.16699 8.00033 9.16699C7.63366 9.16699 7.31988 9.29744 7.05899 9.05833C6.79766 9.31966 6.66699 9.63366 6.66699 10.5003C6.66699 10.867 6.79766 11.181 7.05899 11.4423C7.31988 11.7032 7.63366 11.8337 8.00033 11.8337Z" fill="#A3A3A3"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="project-divider"></div>
                </div>
              ))}
            </div>

            {/* Keyed by project id rather than list index, so reordering in
                Sanity cannot desync the preview from the hovered row. */}
            {preview && (preview.hoverImage?.asset?.gatsbyImageData || preview.heroImage?.asset?.gatsbyImageData) && (
              <div className="project-image-preview">
                <GatsbyImage
                  image={getImage((preview.hoverImage || preview.heroImage).asset.gatsbyImageData)}
                  alt=""
                  className="project-image"
                />
              </div>
            )}
          </section>

          <section className="socials-section">
            <div className="social-links">
              <button type="button" className="social-link email-copy-btn" onClick={handleEmailCopy}>
                <span>{emailCopied ? 'Copied!' : 'Email'}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g clipPath="url(#clip0_2822_1218)">
                    <path d="M10.6667 0.666992H1.33337V11.3337H2.66671V2.00033H10.6667V0.666992ZM14 3.33366H4.00004V15.3337H14V3.33366ZM12.6667 14.0003H5.33337V4.66699H12.6667V14.0003Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2822_1218">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <a href="https://www.behance.net/tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Behance</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 2V14H14V8H12.6667V12.6667H3.33333V3.33333H8V2H2ZM9.33333 2V3.33333H11.724L5.52865 9.52865L6.47135 10.4714L12.6667 4.27604V6.66667H14V2H9.33333Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://dribbble.com/tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Dribbble</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 2V14H14V8H12.6667V12.6667H3.33333V3.33333H8V2H2ZM9.33333 2V3.33333H11.724L5.52865 9.52865L6.47135 10.4714L12.6667 4.27604V6.66667H14V2H9.33333Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://github.com/Tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Github</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 2V14H14V8H12.6667V12.6667H3.33333V3.33333H8V2H2ZM9.33333 2V3.33333H11.724L5.52865 9.52865L6.47135 10.4714L12.6667 4.27604V6.66667H14V2H9.33333Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>

      <LockedProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectSlug={selectedProject?.slug?.current}
        onPasswordCorrect={handlePasswordCorrect}
        projectTitle={selectedProject?.title}
      />

    </Layout>
  )
}

export const query = graphql`
  query {
    allSanityProject(
      filter: { showOnHomepage: { eq: true } }
      limit: 10
    ) {
      edges {
        node {
          id
          title
          client
          year
          locked
          slug {
            current
          }
          heroImage {
            asset {
              gatsbyImageData
            }
          }
          hoverImage {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="Home" pathname={location?.pathname} />

export default IndexPage
