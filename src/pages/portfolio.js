import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"

const PortfolioPage = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  const projects = [
    {
      title: "The name of project",
      description: "I'm responsible for UX Strategy + Design",
      brand: "Brand name",
      year: "2025",
      locked: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
    },
    {
      title: "The name of project",
      description: "I'm responsible for UX Strategy + Design",
      brand: "Brand name",
      year: "2025",
      locked: false,
      image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80"
    },
    {
      title: "The name of project",
      description: "I'm responsible for UX Strategy + Design",
      brand: "Brand name",
      year: "2025",
      locked: false,
      image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80"
    },
    {
      title: "The name of project",
      description: "I'm responsible for UX Strategy + Design",
      brand: "Brand name",
      year: "2025",
      locked: false,
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
    }
  ]

  const handleProjectClick = (project, e) => {
    if (project.locked) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <Layout>
      <div className="portfolio-container">
        <div className="container">
          <div className="intro">
            <h1 className="page-title">wrk</h1>
            <p className="page-description">
              I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-card"
                onClick={(e) => handleProjectClick(project, e)}
                style={{ cursor: project.locked ? 'pointer' : 'default' }}
              >
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                  {project.locked && (
                    <div className="lock-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z" fill="#A3A3A3"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="project-content">
                  <div className="project-info-row">
                    <div className="project-text">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>
                    <div className="project-meta">
                      <span className="project-brand">{project.brand}</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LockedProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <style jsx="true">{`
        .portfolio-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 101px 0px 60px 0px;
        }

        .intro {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
        }

        .page-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 100px;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
        }

        .project-image-wrapper {
          position: relative;
          height: 250px;
          width: 100%;
          overflow: hidden;
          border-radius: 4px 4px 0 0;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lock-icon {
          position: absolute;
          left: 17px;
          bottom: 17px;
        }

        .project-content {
          background: #2E2A2A;
          padding: 10px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          min-height: 100px;
          border-radius: 0 0 5px 5px;
        }

        .project-info-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .project-text {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .project-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .project-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .project-meta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          gap: 5px;
        }

        .project-brand,
        .project-year {
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.36px;
          color: var(--grey-misty);
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px 20px 60px 20px;
          }

          .project-info-row {
            flex-direction: column;
            gap: 15px;
          }

          .project-meta {
            align-items: flex-start;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="Portfolio" />

export default PortfolioPage
