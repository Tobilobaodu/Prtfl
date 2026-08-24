import * as React from "react"
import { Link, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"
import HoverReel from "../components/HoverReel"

const SndbxPage = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState(null)
  // { id, el } — el is set only for keyboard focus. See HoverReel.
  const [hovered, setHovered] = React.useState(null)

  const projects = data?.allSanityProject?.edges?.map(edge => edge.node) || []

  // Rows are real links, so an unlocked project just navigates. Locked ones
  // intercept and show the gate instead — the destination page carries its own
  // gate too, so the no-JS path still lands somewhere correct.
  const handleProjectClick = (project, e) => {
    if (!project.locked) return
    e.preventDefault()
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handlePasswordCorrect = () => {
    if (selectedProject) {
      navigate(`/case-study/${selectedProject.slug.current}`)
    }
  }

  return (
    <Layout>
      <div className="sndbx-container">
        <div className="container">
          <div className="section-intro">
            <h1 className="section-title">sndbx</h1>
            <p className="section-description">
              These are self-initiated and exploratory projects I've worked on outside formal roles, they show how I test ideas, tools, and approaches without client constraints.
            </p>
          </div>

          {/* The clear lives on the list, not on each row — see index.js for
              why the 10px inter-row gap made per-row clearing flicker. */}
          <div className="projects-list" onMouseLeave={() => setHovered(null)}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/case-study/${project.slug.current}`}
                aria-label={`${project.title}${project.locked ? ' (password protected)' : ''}`}
                className={`project-item ${hovered?.id === project.id ? 'is-previewing' : ''}`}
                onClick={(e) => handleProjectClick(project, e)}
                onMouseEnter={() => setHovered({ id: project.id, el: null })}
                onFocus={(e) => setHovered({ id: project.id, el: e.currentTarget })}
                onBlur={() => setHovered(null)}
              >
                <div className="project-row">
                  <div className="project-name">{project.title}</div>
                  <div className="project-metadata">
                    <span className="brand-name">{project.client}</span>
                    <span className="dot-separator"></span>
                    <span className="project-year">{project.year}</span>
                    {project.locked && (
                      <svg className="lock-icon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66699 15.167V5.83366H4.66699V4.50033C4.66699 3.5781 4.9921 2.79188 5.64233 2.14166C6.2921 1.49188 7.0781 1.16699 8.00033 1.16699C8.92255 1.16699 9.70877 1.49188 10.359 2.14166C11.0088 2.79188 11.3337 3.5781 11.3337 4.50033V5.83366H13.3337V15.167H2.66699ZM6.00033 5.83366H10.0003V4.50033C10.0003 3.94477 9.80588 3.47255 9.41699 3.08366C9.0281 2.69477 8.55588 2.50033 8.00033 2.50033C7.44477 2.50033 6.97255 2.69477 6.58366 3.08366C6.19477 3.47255 6.00033 3.94477 6.00033 4.50033V5.83366ZM4.00033 13.8337H12.0003V7.16699H4.00033V13.8337ZM8.00033 11.8337C8.36699 11.8337 8.68099 11.7032 8.94233 11.4423C9.20321 11.181 9.33366 10.867 9.33366 10.5003C9.33366 10.1337 9.20321 9.81966 8.94233 9.55833C8.68099 9.29744 8.36699 9.16699 8.00033 9.16699C7.63366 9.16699 7.31988 9.29744 7.05899 9.55833C6.79766 9.81966 6.66699 10.1337 6.66699 10.5003C6.66699 10.867 6.79766 11.181 7.05899 11.4423C7.31988 11.7032 7.63366 11.8337 8.00033 11.8337Z" fill="#A3A3A3"/>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="project-divider"></div>
              </Link>
            ))}
          </div>

          <HoverReel projects={projects} active={hovered} />
        </div>
      </div>

      <LockedProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectSlug={selectedProject?.slug?.current}
        onPasswordCorrect={handlePasswordCorrect}
        projectTitle={selectedProject?.title}
      />

      <style>{`
        .sndbx-container {
          width: 100%;
          min-height: calc(100vh - 100px);
        }

        .container {
          max-width: var(--container-max);
          margin: 0;
          margin-left: 0;
          padding: 111px var(--gutter) 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .section-intro {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
        }

        .section-description {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .project-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
        }

        /* The row is an <a>; give it a real focus ring. :focus-visible so a
           mouse click does not leave one behind. */
        .project-item:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 4px;
        }

        /* The preview card covers the hovered row, so the row steps back
           rather than competing with it. Pointer-capable devices only —
           HoverReel does not mount anywhere else. */
        @media (hover: hover) and (pointer: fine) {
          .project-item .project-name,
          .project-item .project-metadata {
            transition: opacity 0.25s ease;
          }

          .project-item.is-previewing .project-name,
          .project-item.is-previewing .project-metadata {
            opacity: 0.35;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-item .project-name,
          .project-item .project-metadata {
            transition: none;
          }
        }

        .project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 120%;
          color: var(--black-pitch-nah);
        }

        .project-metadata {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .brand-name,
        .project-year {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        /* inline-block is load-bearing: the span is empty, and width/height do
           not apply to a non-replaced inline element — so without it the dot
           had zero width and never rendered at all. */
        .dot-separator {
          display: inline-block;
          width: 2.73px;
          height: 2.67px;
          border-radius: 50%;
          background: var(--grey-misty);
        }

        .lock-icon {
          width: 16px;
          height: 16px;
        }

        .project-divider {
          width: 100%;
          height: 0;
          opacity: 0.5;
          border-top: 0.5px solid rgba(29, 28, 28, 0.5);
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px var(--gutter) 60px;
          }

          .project-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .sndbx-container {
            background: var(--white-not-wyt);
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 134px var(--gutter) 0;
            gap: 20px;
          }

          /* .section-title, .section-description, .project-metadata,
             .brand-name/.project-year, .dot-separator and .lock-icon were
             restated here identically to the base rules and have been removed.
             Two of them were actively harmful: they asked for
             'Neue Haas Grotesk Display Pro', a family with no @font-face
             anywhere in the project, so the sandbox heading and intro fell
             through to the system UI font below 480px only. Dropping the rules
             restores var(--font-nhd).

             What remains is only what genuinely differs from the base. */

          .section-intro {
            gap: 10px;
          }

          .projects-list {
            gap: 20px;
          }

          .project-item {
            gap: 5px;
          }

          .project-row {
            gap: 5px;
          }

          .project-name {
            font-weight: 400;
          }

          /* .project-divider used to set a 1px rgba(236, 240, 241, 0.5)
             background here — a near-white line on the #F9F9F8 page — while
             never clearing the base rule's border-top, so mobile drew both.
             Removed: the base treatment now applies at every width. */
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSanityProject(
      filter: { showOnSandbox: { eq: true } }
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
          # Feeds the cursor-following preview. Both are already public on the
          # listing pages, so this exposes nothing new for locked projects.
          heroImage {
            asset {
              url
              metadata {
                palette {
                  dominant {
                    background
                  }
                }
              }
            }
          }
          hoverImage {
            asset {
              url
              metadata {
                palette {
                  dominant {
                    background
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="Sandbox" pathname={location?.pathname} />

export default SndbxPage
