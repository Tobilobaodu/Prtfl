import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"

const IndexPage = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [hoveredProject, setHoveredProject] = React.useState(null)

  const projects = [
    { 
      title: "The name of project", 
      brand: "Brand name", 
      year: "2021", 
      locked: true,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Banking the right way", 
      brand: "Prosperity Bank", 
      year: "2021", 
      locked: true,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Learning the right way", 
      brand: "Sterling University", 
      year: "2020", 
      locked: true,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Servicing new customer", 
      brand: "Motomi", 
      year: "2019", 
      locked: false,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Calabar coaster road", 
      brand: "Brand name", 
      year: "2018", 
      locked: false,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Calabar coaster road", 
      brand: "Brand name", 
      year: "2018", 
      locked: false,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Calabar coaster road", 
      brand: "Brand name", 
      year: "2018", 
      locked: false,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
    { 
      title: "Calabar coaster road", 
      brand: "Brand name", 
      year: "2018", 
      locked: false,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c72dfddb8accc6f0a3622beec96ded26d79ed3f3?width=1080"
    },
  ]

  const handleProjectClick = (project, e) => {
    if (project.locked) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <Layout>
      <div className="home-container">
        <div className="container">
          <section className="bio-section">
            <div className="bio">
              <p className="bio-text">
                I'm a <strong>multidisciplinary designer</strong> passionate about design, technology, and how they both shape our lives and experience. I've extensive experience in marketing and driving sustainable growth, and have contributed to the success of some of Africa's biggest startups.
              </p>
            </div>
          </section>

          <section className="projects-section">
            <div className="projects-list">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`project-item ${project.locked ? 'clickable locked' : ''}`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={(e) => handleProjectClick(project, e)}
                >
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-meta">
                      <span className="project-brand">{project.brand}</span>
                      <span className="dot">●</span>
                      <span className="project-year">{project.year}</span>
                      {project.locked && (
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.66699 15.167V5.83366H4.66699V4.50033C4.66699 3.5781 4.9921 2.79188 5.64233 2.14166C6.2921 1.49188 7.0781 1.16699 8.00033 1.16699C8.92255 1.16699 9.70877 1.49188 10.359 2.14166C11.0088 2.79188 11.3337 3.5781 11.3337 4.50033V5.83366H13.3337V15.167H2.66699ZM6.00033 5.83366H10.0003V4.50033C10.0003 3.94477 9.80588 3.47255 9.41699 3.08366C9.0281 2.69477 8.55588 2.50033 8.00033 2.50033C7.44477 2.50033 6.97255 2.69477 6.58366 3.08366C6.19477 3.47255 6.00033 3.94477 6.00033 4.50033V5.83366ZM4.00033 13.8337H12.0003V7.16699H4.00033V13.8337ZM8.00033 11.8337C8.36699 11.8337 8.68099 11.7032 8.94233 11.4423C9.20321 11.181 9.33366 10.867 9.33366 10.5003C9.33366 10.1337 9.20321 9.81966 8.94233 9.55833C8.68099 9.29744 8.36699 9.16699 8.00033 9.16699C7.63366 9.16699 7.31988 9.29744 7.05899 9.05833C6.79766 9.31966 6.66699 9.63366 6.66699 10.5003C6.66699 10.867 6.79766 11.181 7.05899 11.4423C7.31988 11.7032 7.63366 11.8337 8.00033 11.8337Z" fill="#A3A3A3"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="project-divider"></div>
                </div>
              ))}
            </div>

            {hoveredProject !== null && (
              <div className="project-image-preview">
                <img 
                  src={projects[hoveredProject].image} 
                  alt={projects[hoveredProject].title}
                />
              </div>
            )}
          </section>

          <section className="socials-section">
            <div className="social-links">
              <a href="mailto:your.email@example.com" className="social-link">
                <span>Email</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H12V10H2V4Z" stroke="currentColor" strokeWidth="1"/>
                  <path d="M2 4L7 8L12 4" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Behance</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Dribble</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Github</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>

      <LockedProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <style jsx="true">{`
        .home-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
          position: relative;
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 0px 0px;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .bio-section {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .bio-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .bio-text strong {
          font-weight: 700;
        }

        .projects-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .project-item {
          position: relative;
          transition: opacity 0.2s ease;
        }

        .project-item.clickable {
          cursor: pointer;
        }

        .project-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .project-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          color: var(--black-pitch-nah);
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .project-brand,
        .project-year {
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .dot {
          font-size: 4px;
          color: var(--grey-misty);
        }

        .project-divider {
          width: 100%;
          height: 1px;
          background: rgba(29, 28, 28, 0.5);
          opacity: 0.5;
        }

        .project-image-preview {
          position: fixed;
          right: 100px;
          top: 159px;
          width: 540px;
          height: 481px;
          pointer-events: none;
          z-index: 50;
          animation: fadeInImage 0.3s ease;
        }

        @keyframes fadeInImage {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .project-image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .socials-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: var(--socials-margin-top);
        }

        .social-links {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          flex-wrap: wrap;
        }

        .social-link {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--grey-just);
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          text-decoration: none;
          border-bottom: 1px solid var(--grey-just);
          padding-bottom: 1px;
          transition: all 0.3s ease;
        }

        .social-link svg {
          width: 14px;
          height: 14px;
        }

        .social-link:hover {
          color: var(--orange);
          border-bottom-color: var(--orange);
        }

        @media (max-width: 1200px) {
          .project-image-preview {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 60px 20px;
            gap: 80px;
          }

          .project-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .social-links {
            flex-direction: column;
            gap: 12px;
          }

          .project-image-preview {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .home-container {
            background: #F9F9F8;
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 134px 40px 0 40px;
            gap: 192px;
          }

          .bio-section {
            gap: 50px;
          }

          .bio {
            width: 100%;
          }

          .bio-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

          .bio-text strong {
            font-weight: 700;
          }

          .projects-section {
            gap: 10px;
          }

          .projects-list {
            gap: 10px;
          }

          .project-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .project-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            margin-bottom: 5px;
          }

          .project-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            color: #1D1C1C;
          }

          .project-meta {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .project-brand,
          .project-year {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #A3A3A3;
          }

          .dot {
            width: 2.73px;
            height: 2.674px;
            background: #A3A3A3;
            border-radius: 50%;
          }

          .project-meta svg {
            width: 16px;
            height: 16px;
          }

          .project-divider {
            width: 100%;
            height: 1px;
            opacity: 0.5;
            background: rgba(236, 240, 241, 0.5);
          }

          .socials-section {
            margin-top: 0;
          }

          .social-links {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            flex-wrap: wrap;
          }

          .social-link {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            color: #777;
            border-bottom: 1px solid #777;
            display: flex;
            align-items: center;
            gap: 5px;
            padding-bottom: 0;
          }

          .social-link svg {
            width: 14px;
            height: 14px;
          }

          .project-image-preview {
            display: none;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
