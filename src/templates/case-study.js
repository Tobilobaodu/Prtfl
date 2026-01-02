import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Component renderers for different Sanity component types
const TextBlock = ({ content, type, blockType }) => {
  // Use type field if available, otherwise fall back to blockType for backward compatibility
  const blockTypeValue = type || blockType || 'bodyText'

  const typeClass = {
    sectionTitle: 'text-section-title',
    bodyText: 'text-body',
    tag: 'text-tag'
  }[blockTypeValue]

  // Helper function to extract plain text from rich content blocks
  const extractPlainText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return ''
    return blocks.map(block =>
      block.children?.map(child => child.text).join('') || ''
    ).join('\n\n')
  }

  // Helper function to render rich text with formatting
  const renderRichText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null

    return blocks.map((block, index) => {
      if (block._type === 'block') {
        return (
          <p key={index} style={{
            margin: 0,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            fontWeight: 'inherit',
            color: 'inherit'
          }}>
            {block.children?.map((child, childIndex) => {
              let style = {}
              if (child.marks?.includes('strong')) {
                style.fontWeight = 'bold'
              }
              if (child.marks?.includes('em')) {
                style.fontStyle = 'italic'
              }

              return (
                <span key={childIndex} style={style}>
                  {child.text}
                </span>
              )
            })}
          </p>
        )
      }
      return null
    })
  }

  if (blockTypeValue === 'sectionTitle') {
    return (
      <h2 className={typeClass}>{extractPlainText(content)}</h2>
    )
  }

  if (blockTypeValue === 'tag') {
    return (
      <div className={typeClass}>{extractPlainText(content)}</div>
    )
  }

  // Body text with rich content (WYSIWYG editor)
  if (blockTypeValue === 'bodyText') {
    return (
      <div className={typeClass}>
        {renderRichText(content)}
      </div>
    )
  }

  // Fallback
  return (
    <p className={typeClass}>{extractPlainText(content)}</p>
  )
}

const ImageComponent = ({ layout, images, imageHeight, enableGaps = true, fullHeightImage = 1 }) => {
  const heightClass = 'height-fixed-800'

  if (layout === 'single' && images?.[0]) {
    return (
      <div className={`image-single ${heightClass}`}>
        <img
          src={images[0]?.asset?.url || ''}
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
              src={image?.asset?.url || ''}
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
              src={image?.asset?.url || ''}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  if ((layout === 'grid-4-horizontal' || layout === 'grid-4-square') && images?.length === 4) {
    const gridClass = layout === 'grid-4-horizontal' ? 'grid-4-horizontal' : 'grid-4-square'
    return (
      <div className={`image-grid ${gridClass} ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img
              src={image?.asset?.url || ''}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'grid-5' && images?.length === 5) {
    return (
      <div className={`image-grid grid-5 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className={`grid-item ${index === 0 ? 'full-width' : ''}`}>
            <img
              src={image?.asset?.url || ''}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )
  }

  return null
}

const SectionTitleBlock = ({ title }) => {
  return (
    <h2 className="text-section-title">{title}</h2>
  )
}

const TagBlock = ({ tag }) => {
  return (
    <div className="text-tag">{tag}</div>
  )
}

const SectionDivider = ({ tag, title, dividerStyle }) => {
  return (
    <div className="section-divider">
      {tag && <div className="section-tag">{tag}</div>}
      {title && <h2 className="section-title">{title}</h2>}
    </div>
  )
}

const VideoComponent = ({ videoFile, videoUrl, posterImage, autoplay, loop, muted, caption }) => {
  try {
    // Determine video source
    const videoSrc = videoFile?.asset?.url || videoUrl

    if (!videoSrc) {
      return (
        <div className="video-error">
          <p>Video source not available</p>
        </div>
      )
    }

    // Get poster image if available
    const posterSrc = posterImage?.asset?.gatsbyImageData
      ? getImage(posterImage.asset.gatsbyImageData)?.images?.fallback?.src
      : null

    return (
      <div className="video-container">
        <video
          controls
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          poster={posterSrc}
          className="video-player"
          preload="metadata"
        >
          <source src={videoSrc} type={videoFile ? "video/mp4" : undefined} />
          Your browser does not support the video tag.
        </video>
        {caption && (
          <p className="video-caption">{caption}</p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Video component error:', error)
    return (
      <div className="video-error">
        <p>Unable to load video</p>
      </div>
    )
  }
}

const Spacer = ({ size }) => {
  const pixelSize = parseInt(size) || 20 // Default to 20px if invalid

  return <div className="spacer" style={{ height: `${pixelSize}px` }} />
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
                case 'sectionTitleBlock':
                  return <SectionTitleBlock key={index} {...component} />
                case 'tagBlock':
                  return <TagBlock key={index} {...component} />
                case 'imageComponent':
                  return <ImageComponent key={index} {...component} />
                case 'videoComponent':
                  return <VideoComponent key={index} {...component} />
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
          gap: 0px;
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
          border-radius: 0px;
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

        .grid-4-horizontal {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .grid-4-square {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }

        .grid-5 {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto auto;
        }

        .grid-5 .grid-item.full-width {
          grid-column: 1 / -1;
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
          border-radius: 0px;
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

        /* Video Component Styles */
        .video-container {
          width: 100%;
          margin: 20px 0;
        }

        .video-player {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: contain;
          background: #000;
        }

        .video-caption {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
          margin-top: 10px;
          text-align: center;
        }

        .video-error {
          padding: 20px;
          text-align: center;
          color: var(--grey-misty);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .video-error p {
          margin: 0;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
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
          content {
            _type
            children {
              _type
              marks
              text
            }
          }
        }
        ... on SanitySectionTitleBlock {
          _type
          title
        }
        ... on SanityTagBlock {
          _type
          tag
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
        ... on SanityVideoComponent {
          _type
          videoFile {
            asset {
              url
            }
          }
          videoUrl
          posterImage {
            asset {
              gatsbyImageData
            }
          }
          autoplay
          loop
          muted
          caption
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
