import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Component renderers for different Sanity component types
const TextBlock = ({ content, blockType }) => {
  const typeClass = {
    sectionTitle: 'text-section-title',
    bodyText: 'text-body',
    tag: 'text-tag'
  }[blockType || 'bodyText']

  if (blockType === 'sectionTitle') {
    return (
      <h2 className={typeClass}>{content}</h2>
    )
  }

  if (blockType === 'tag') {
    return (
      <div className={typeClass}>{content}</div>
    )
  }

  // Default body text
  return (
    <p className={typeClass}>{content}</p>
  )
}

const ImageComponent = ({ layout, images, imageHeight, enableGaps = true, fullHeightImage = 1 }) => {
  const heightClass = 'height-fixed-800'

  if (layout === 'single' && images?.[0]) {
    return (
      <div className={`image-single ${heightClass}`}>
        <img
          src={images[0].asset.url}
          alt="Project image"
          className="section-image"
        />
      </div>
    )
  }

  if (layout === 'grid-2' && images?.length === 2) {
    return (
      <div className={`image-grid grid-2 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img
              src={image.asset.url}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'grid-3' && images?.length === 3) {
    const fullHeightIndex = (fullHeightImage || 1) - 1; // Convert 1-based to 0-based
    return (
      <div className={`image-grid grid-3 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className={`grid-item ${index === fullHeightIndex ? 'full-height' : ''}`}>
            <img
              src={image.asset.url}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'grid-4' && images?.length === 4) {
    return (
      <div className={`image-grid grid-4 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img
              src={image.asset.url}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  return null
}

const SectionDivider = ({ tag, title, dividerStyle }) => {
  return (
    <div className="section-divider">
      {tag && <div className="section-tag">{tag}</div>}
      {title && <h2 className="section-title">{title}</h2>}
    </div>
  )
}

const Spacer = ({ size }) => {
  const sizeClass = {
    small: 'spacer-small',
    medium: 'spacer-medium',
    large: 'spacer-large',
    xlarge: 'spacer-xlarge'
  }[size || 'medium']

  return <div className={`spacer ${sizeClass}`} />
}

const CaseStudyTemplate = ({ data }) => {
  const caseStudy = data?.sanityCaseStudy
  const project = caseStudy?.project
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Get related projects - prefer CMS field, fall back to automatic query
  const cmsRelatedProjects = caseStudy?.relatedProjects || []
  const autoRelatedProjects = data?.allSanityProject?.edges?.map(edge => edge.node) || []

  // Use CMS field if populated, otherwise use automatic selection
  const relatedProjects = cmsRelatedProjects.length > 0 ? cmsRelatedProjects : autoRelatedProjects

  if (!caseStudy || !project) {
    return (
      <Layout>
        <div style={{ padding: "100px 20px", textAlign: "center" }}>
          <h1>Case Study Not Found</h1>
          <p>The requested case study could not be found.</p>
          <Link to="/">← Back to Home</Link>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <div className="case-study-page">
        <nav className="case-study-nav">
          <Link to="/" className="logo">
            <svg width="69" height="21" viewBox="0 0 69 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.97874 1.0038H10.0213V20H4.97874V1.0038Z" fill="#EE550E"/>
              <path d="M0 6.20068V1H15V6.20068H0Z" fill="#EE550E"/>
              <path d="M20.5423 5.08242L24.7244 1L40 15.9116L35.8179 19.994L20.5423 5.08242Z" fill="#EE550E"/>
              <path d="M35.2756 1.00598L39.4577 5.0884L24.1821 20L20 15.9176L35.2756 1.00598Z" fill="#EE550E"/>
              <path d="M45.0396 3.82042L48.7724 0L59 10.4678L55.2672 14.2882L45.0396 3.82042Z" fill="#EE550E"/>
              <path d="M55.2276 6.71177L58.9604 10.5322L48.7328 21L45 17.1796L55.2276 6.71177Z" fill="#EE550E"/>
              <path d="M64 1H69V20H64V1Z" fill="#EE550E"/>
            </svg>
          </Link>
          <button className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6L18 18" stroke="#EE550E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#EE550E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </nav>

        {project.heroImage?.asset?.gatsbyImageData && (
          <div className="hero-image">
            <GatsbyImage
              image={getImage(project.heroImage.asset.gatsbyImageData)}
              alt={project.title}
              className="hero-image-content"
            />
          </div>
        )}

        <div className="main-content">
          <div className="container">
            <div className="project-intro">
              <h1 className="project-title">{project.title}</h1>
              <div className="project-meta-row">
                <div className="meta-item">
                  <span className="meta-label">Client:</span>
                  <span className="meta-value"> {project.client}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Project type:</span>
                  <span className="meta-value"> {project.projectType || "UX/UI Design"}</span>
                </div>
              </div>
              {project.introText && (
                <p className="project-intro-text">{project.introText}</p>
              )}
            </div>

            {/* Render case study components */}
            {caseStudy.components?.map((component, index) => {
              switch (component._type) {
                case 'textBlock':
                  return <TextBlock key={index} {...component} />
                case 'imageComponent':
                  return <ImageComponent key={index} {...component} />
                case 'sectionDivider':
                  return <SectionDivider key={index} {...component} />
                case 'spacer':
                  return <Spacer key={index} {...component} />
                default:
                  return null
              }
            })}
          </div>
        </div>

        <div className={`side-panel ${isMenuOpen ? 'open' : ''}`}>
          <h3 className="panel-title">more projects</h3>
          <div className="panel-projects">
            {relatedProjects.map((project, index) => (
              <div key={index} className="panel-project">
                <div className="panel-project-row">
                  <div className="panel-project-name">{project.title}</div>
                  <div className="panel-project-meta">
                    <span className="panel-brand">{project.client}</span>
                    <span className="panel-year">{project.year}</span>
                  </div>
                </div>
                <div className="panel-divider"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .case-study-page {
          background: var(--black-nue-black);
          min-height: 100vh;
          margin: -100px 0 0 -100px;
          position: relative;
        }

        .case-study-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 100px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
        }

        .logo svg {
          height: 21px;
          width: auto;
        }

        .menu-icon {
          width: 24px;
          height: 24px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .hero-image {
          width: 100%;
          height: 434px;
          overflow: hidden;
        }

        .hero-image-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-content {
          padding: 40px 100px 100px;
          position: relative;
        }

        .container {
          max-width: 1029px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .project-intro {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .project-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 65px;
          font-weight: 700;
          line-height: 100%;
          color: var(--white-heavenly);
          max-width: 590px;
        }

        .project-meta-row {
          display: flex;
          gap: 10px;
        }

        .meta-item {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .meta-label {
          color: var(--orange);
        }

        .project-intro-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .section-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        /* Text Block Types */
        .text-section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 32.5px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
          margin: 0;
        }

        .text-body {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .text-tag {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          background: #FBBF24;
          color: var(--black-nue-black);
          padding: 4px 12px;
          border-radius: 20px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Image Grid Styles */
        .image-grid {
          display: grid;
          width: 100%;
          height: 800px;
        }

        .image-grid.gaps-enabled {
          gap: 20px;
        }

        .image-grid.gaps-disabled {
          gap: 0px;
        }

        .grid-2 {
          grid-template-columns: 1fr 1fr;
        }

        .grid-3 {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }

        .grid-3 .grid-item.full-height {
          grid-row: span 2;
        }

        .grid-4 {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .grid-item {
          overflow: hidden;
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Fixed height for all grids */
        .height-fixed-800 {
          height: 800px;
        }

        .image-single.height-fixed-800 {
          height: 800px;
        }

        .image-single img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Section Divider Styles */
        .section-divider {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .section-tag {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          background: #FBBF24;
          color: var(--black-nue-black);
          padding: 4px 12px;
          border-radius: 20px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 32.5px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
          margin: 0;
        }

        .side-panel {
          position: fixed;
          right: -607px;
          top: 0;
          width: 607px;
          height: 100vh;
          background: var(--black-nue-ish-black);
          padding: 116px 109px 0;
          transition: right 0.3s ease-in-out;
          z-index: 50;
        }

        .side-panel.open {
          right: 0;
        }

        .panel-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--grey-just);
          margin-bottom: 106px;
        }



        .panel-projects {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .panel-project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--white-not-wyt);
        }

        .panel-project-meta {
          display: flex;
          gap: 5px;
        }

        .panel-brand,
        .panel-year {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .panel-divider {
          width: 100%;
          height: 0;
          opacity: 0.5;
          border-top: 0.5px solid rgba(236, 240, 241, 0.5);
          margin-top: 10px;
        }

        @media (max-width: 1200px) {
          .side-panel {
            position: relative;
            width: 100%;
            height: auto;
            padding: 60px 20px;
          }

          .main-content {
            padding: 40px 20px 100px;
          }

          .project-title {
            font-size: 45px;
          }
        }

        @media (max-width: 768px) {
          .case-study-nav {
            padding: 32px 20px;
          }

          .project-title {
            font-size: 35px;
          }

          .project-meta-row {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .case-study-page {
            background: #232020;
            margin: 0;
            padding: 0;
          }

          .case-study-nav {
            display: flex;
            width: 100%;
            padding: 30px 20px;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 84px;
            z-index: 100;
            background: transparent;
          }

          .hero-image {
            width: 100%;
            height: 346px;
            margin-top: 0;
          }

          .main-content {
            padding: 40px 39px 100px;
          }

          .container {
            max-width: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 165px;
          }

          .project-intro {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .project-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 32.5px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            max-width: 100%;
          }

          .project-meta-row {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .meta-item {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }

          .meta-label {
            color: #EE550E;
          }

          .project-intro-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }

          .content-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .section-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            align-self: flex-start;
          }

          .section-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
            align-self: flex-start;
          }
        }
      `}</style>
    </>
  )
}

export const query = graphql`
  query ($slug: String!) {
    sanityCaseStudy(project: { slug: { current: { eq: $slug } } }) {
      id
      components {
        ... on SanityTextBlock {
          _type
          blockType
          content
        }
        ... on SanityImageComponent {
          _type
          layout
          images {
            asset {
              url
            }
          }
          imageHeight
          enableGaps
          fullHeightImage
        }
        ... on SanitySectionDivider {
          _type
          tag
          title
          dividerStyle
        }
        ... on SanitySpacer {
          _type
          size
        }
      }
      project {
        id
        title
        client
        year
        projectType
        heroImage {
          asset {
            gatsbyImageData
          }
        }
        introText
        shortDescription
      }
    }
    # Related projects for side panel - exclude current project and locked projects
    allSanityProject(
      filter: {
        locked: { ne: true }
        slug: { current: { ne: $slug } }
      }
      limit: 8
    ) {
      edges {
        node {
          id
          title
          client
          year
          slug {
            current
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => {
  const project = data?.sanityCaseStudy?.project
  return <Seo title={project?.title || "Case Study"} />
}

export default CaseStudyTemplate
