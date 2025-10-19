import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"

const SndbxPage = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  const projects = [
    { title: "The name of project", brand: "Brand name", year: "2021", locked: true },
    { title: "Banking the right way", brand: "Prosperity Bank", year: "2021", locked: true },
    { title: "Learning the right way", brand: "Sterling University", year: "2020", locked: true },
    { title: "Servicing new customer", brand: "Motomi", year: "2019", locked: false },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018", locked: false },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018", locked: false },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018", locked: false },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018", locked: false }
  ]

  const handleProjectClick = (project, e) => {
    if (project.locked) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <Layout>
      <div className="sndbx-container">
        <div className="container">
          <div className="section-intro">
            <h1 className="section-title">sndbx</h1>
            <p className="section-description">
              I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products.
            </p>
          </div>

          <div className="projects-list">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-item"
                onClick={(e) => handleProjectClick(project, e)}
                style={{ cursor: project.locked ? 'pointer' : 'default' }}
              >
                <div className="project-row">
                  <div className="project-name">{project.title}</div>
                  <div className="project-metadata">
                    <span className="brand-name">{project.brand}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <LockedProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <style jsx="true">{`
        .sndbx-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 111px 0 60px 0;
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
        }

        .project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
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

        .dot-separator {
          width: 2.73px;
          height: 2.67px;
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
            padding: 100px 20px 60px 20px;
          }

          .project-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="Sandbox" />

export default SndbxPage
