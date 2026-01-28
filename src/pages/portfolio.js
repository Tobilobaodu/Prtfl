import * as React from "react"
import { Link, graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LockedProjectModal from "../components/LockedProjectModal"

const PortfolioPage = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const projects = data?.allSanityProject?.edges?.map(edge => edge.node) || []

  const handleProjectClick = (project, e) => {
    if (project.locked) {
      e.preventDefault()
      setModalOpen(true)
    } else {
      // Navigate to case study page
      navigate(`/case-study/${project.slug.current}`)
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
              >
                <div className="project-image-wrapper">
                  {project.heroImage?.asset?.gatsbyImageData && (
                    <GatsbyImage
                      image={getImage(project.heroImage.asset.gatsbyImageData)}
                      alt={project.title}
                      className="project-image"
                    />
                  )}
                  {project.locked && (
                    <div className="lock-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z" fill="#A3A3A3" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="project-content">
                  {/* Default State (Dark Theme) */}
                  <div className="state default-state">
                    <div className="project-info-row">
                      <div className="project-text">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.shortDescription}</p>
                      </div>
                      <div className="project-meta">
                        <span className="project-brand">{project.client}</span>
                        <span className="project-year">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover State (Light Theme) */}
                  <div className="state hover-state">
                    <div className="project-info-row">
                      <div className="project-text">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.shortDescription}</p>
                      </div>
                      <div className="project-meta">
                        <span className="project-brand">{project.client}</span>
                        <span className="project-year">{project.year}</span>
                      </div>
                    </div>
                    <button className="view-project-btn">
                      {project.locked && (
                        <svg className="btn-lock-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z" fill="currentColor" />
                        </svg>
                      )}
                      VIEW PROJECT
                    </button>
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

        /* CARD CONTAINER */
        .project-card {
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
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

        /* CONTENT CONTAINER */
        .project-content {
          position: relative;
          min-height: 150px;
          background: #2E2A2A;
          transition: min-height 0.3s ease;
        }

        /* STATES */
        .state {
          padding: 25px 25px;
          display: flex;
          flex-direction: column;
          border-radius: 0 0 5px 5px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transition: opacity 0.2s ease;
          box-sizing: border-box;
        }

        /* DEFAULT STATE (DARK) */
        .default-state {
          position: relative;
          background: #2E2A2A;
          z-index: 1;
          opacity: 1;
          justify-content: space-between;
          height: 100%;
        }

        /* HOVER STATE (LIGHT) */
        .hover-state {
          background: #ECF0F1; /* Updated background */
          border: 1px solid #E5E5E5; /* Preserved border based on border-top: none existence */
          border-top: none;
          opacity: 0;
          z-index: 2;
          justify-content: space-between;
          pointer-events: none;
        }

        /* HOVER TRIGGER */
        .project-card:hover .default-state {
          opacity: 0;
        }

        .project-card:hover .hover-state {
          opacity: 1;
          pointer-events: auto;
        }

        .project-card:hover .project-content {
          min-height: 220px;
        }

        /* TYPOGRAPHY - SHARED LAYOUT */
        .project-info-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          /* height: 100%; Only needed for default if we want vertical alignment */
        }

        .default-state .project-info-row {
            height: 100%; /* Default state needs full height for meta alignment */
        }
        
        .hover-state .project-info-row {
            margin-bottom: 10px; /* Spacing before button */
        }

        .project-text {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        /* DEFAULT STATE STYLES */
        .default-state .project-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .default-state .project-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
          max-width: 90%;
        }

        .default-state .project-meta {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 5px;
          height: 100%;
        }

        .default-state .project-brand,
        .default-state .project-year {
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.36px;
          color: var(--grey-misty);
        }

        /* HOVER STATE STYLES */
        .hover-state .project-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: #1D1C1C;
        }

        .hover-state .project-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end; /* Right align */
          gap: 5px;
          justify-content: flex-start; /* Top align */
        }

        .hover-state .project-brand {
          font-size: 12px;
          font-weight: 600;
          color: #A3A3A3;
        }

        .hover-state .project-year {
          font-size: 12px;
          color: #A3A3A3;
        }

        .hover-state .project-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%; 
          letter-spacing: 0.42px; 
          color: #777;
          margin-bottom: 20px;
          max-width: 90%; 
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-project-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 153px;
          height: 45px;
          background: #26282B;
          color: #F9F9F8; /* Not wyt */
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: auto;
          transition: all 0.2s ease;
          border: none; /* Reset border from previous style */
          flex-shrink: 0;
        }
        
        .view-project-btn:hover {
          color: #1D1C1C;
          background: #EE550E;
        }

        .btn-lock-icon {
          margin-bottom: 2px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px 20px 60px 20px;
          }

          /* Disable hover logic on mobile: Always show Default, Hide Hover */
          .project-card:hover .default-state {
             opacity: 1;
          }
          .project-card:hover .hover-state {
             opacity: 0;
             display: none;
          }

          .default-state .project-info-row {
            flex-direction: column;
            gap: 15px;
          }
           
           .default-state .project-meta {
             align-items: flex-start;
             justify-content: flex-start;
             height: auto;
           }
        }

        @media (max-width: 480px) {
          .portfolio-container {
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 134px 40px 0 40px;
          }

          .intro {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
          }

          .page-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #1D1C1C;
          }

          .page-description {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

          .projects-grid {
            padding-bottom: 100px;
          }

          .project-card {
            border-radius: 5px;
            cursor: pointer;
          }
          
          .project-card:hover {
            transform: none;
          }

          .project-image-wrapper {
            height: 281px;
            border-radius: 5px 5px 0 0;
          }
          
          .project-image {
             border-radius: 5px 5px 0 0;
          }

          .project-content {
            background: #2E2A2A;
            padding: 0; 
            min-height: auto; /* Reset min-height */
            height: auto;
          }

          /* Reset desktop state styles for mobile */
          .state {
            position: relative;
            top: auto;
            left: auto;
            height: auto;
          }
          
          .default-state {
            min-height: auto;
            padding: 21px 20px;
            height: 75px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          
          .hover-state {
            display: none !important;
          }

          .default-state .project-info-row {
            flex-direction: row;
            align-items: flex-start;
            gap: 0;
          }

          .default-state .project-text {
            gap: 4px;
            flex: initial;
          }
          
          .default-state .project-title {
             font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
             font-size: 14px;
             font-weight: 400;
             color: #FFF;
          }
          
          .default-state .project-description {
             font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
             font-size: 12px;
             letter-spacing: 0.36px;
             color: #A3A3A3;
          }

          .default-state .project-meta {
            align-items: flex-end;
            justify-content: center;
            height: auto;
            gap: 5px;
          }
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSanityProject(filter: {featured: {eq: true}}) {
      edges {
        node {
          id
          title
          client
          year
          heroImage {
            asset {
              gatsbyImageData
            }
          }
          shortDescription
          locked
          slug {
            current
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="Portfolio" />

export default PortfolioPage
