import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LeftActive from "../Assets/SVG/Left_Active.svg"
import LeftDisabled from "../Assets/SVG/Left_Disabled.svg"
import RightActive from "../Assets/SVG/Right_Active.svg"
import RightDisabled from "../Assets/SVG/Right_Disabled.svg"

const TextBlock = ({ content, type, blockType }) => {
  const blockTypeValue = type || blockType || 'type-body-small'

  const typeClass = {
    // Legacy values (kept for backwards compatibility)
    sectionTitle: 'text-section-title',
    bodyText: 'text-body',
    // New typography styles
    'type-body-small': 'type-body-small',
    'type-body-small-semibold': 'type-body-small-semibold',
    'type-body-small-bold': 'type-body-small-bold',
    'type-body-xsmall': 'type-body-xsmall',
    'type-title-xsmall': 'type-title-xsmall',
    'type-title-small': 'type-title-small',
    'type-title-medium': 'type-title-medium',
    'type-title-large': 'type-title-large',
    'type-display-small': 'type-display-small',
    'type-display-medium': 'type-display-medium',
    'type-display-large': 'type-display-large',
    'type-display-xlarge': 'type-display-xlarge',
    tag: 'text-tag'
  }[blockTypeValue] || 'type-body-small'

  const extractPlainText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return ''
    return blocks.map(block =>
      block.children?.map(child => child.text).join('') || ''
    ).join('\n\n')
  }

  const renderRichText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null
    return blocks.map((block, index) => {
      if (block._type === 'block') {
        return (
          <p key={index} style={{ margin: 0, fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
            {block.children?.map((child, childIndex) => {
              let style = {}
              if (child.marks?.includes('strong')) style.fontWeight = 'bold'
              if (child.marks?.includes('em')) style.fontStyle = 'italic'
              return <span key={childIndex} style={style}>{child.text}</span>
            })}
          </p>
        )
      }
      return null
    })
  }

  if (blockTypeValue === 'tag') return <div className={typeClass}>{extractPlainText(content)}</div>
  if (blockTypeValue === 'sectionTitle') return <h2 className={typeClass}>{extractPlainText(content)}</h2>
  if (blockTypeValue.startsWith('type-display-')) return <h2 className={typeClass}>{extractPlainText(content)}</h2>
  if (blockTypeValue.startsWith('type-title-')) return <h3 className={typeClass}>{extractPlainText(content)}</h3>
  return <div className={typeClass}>{renderRichText(content)}</div>
}

const HeroSection = ({ headline, subtext, heroImage }) => {
  const imageUrl = heroImage?.asset?.url
  return (
    <div className="hero-section-component">
      <div className="hero-section-text">
        {headline && <h1 className="hero-section-headline">{headline}</h1>}
        {subtext && <p className="hero-section-subtext">{subtext}</p>}
      </div>
      {imageUrl && (
        <div className="hero-section-image">
          <img src={imageUrl} alt={headline || 'Hero image'} />
        </div>
      )}
    </div>
  )
}

const ImageComponent = ({ layout, images, enableGaps = true, fullHeightImage = 1 }) => {
  const heightClass = 'height-fixed-800'

  if (layout === 'single' && images?.[0]) {
    return (
      <div className={`image-single ${heightClass}`}>
        <img src={images[0]?.asset?.url || ''} alt="Project image" className="section-image" />
      </div>
    )
  }

  if (layout === 'grid-2' && images?.length === 2) {
    return (
      <div className={`image-grid grid-2 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img src={image?.asset?.url || ''} alt={`Project image ${index + 1}`} />
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'grid-3' && images?.length === 3) {
    const fullHeightIndex = (fullHeightImage || 1) - 1
    return (
      <div className={`image-grid grid-3 ${heightClass} ${enableGaps ? 'gaps-enabled' : 'gaps-disabled'}`}>
        {images.map((image, index) => (
          <div key={index} className={`grid-item ${index === fullHeightIndex ? 'full-height' : ''}`}>
            <img src={image?.asset?.url || ''} alt={`Project image ${index + 1}`} />
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
            <img src={image?.asset?.url || ''} alt={`Project image ${index + 1}`} />
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
            <img src={image?.asset?.url || ''} alt={`Project image ${index + 1}`} />
          </div>
        ))}
      </div>
    )
  }

  return null
}

const SectionTitleBlock = ({ title }) => <h2 className="text-section-title">{title}</h2>

const TagBlock = ({ tag }) => <div className="text-tag">{tag}</div>

const SectionDivider = ({ tag, title }) => (
  <div className="section-divider">
    {tag && <div className="section-tag">{tag}</div>}
    {title && <h2 className="section-title">{title}</h2>}
  </div>
)

const IconHeadingBlock = ({ icon, heading, bodyParagraphs }) => {
  const iconUrl = icon?.asset?.url
  return (
    <div className="icon-heading-block">
      {iconUrl && (
        <div className="ihb-icon">
          <img src={iconUrl} alt="" width="49" height="49" loading="lazy" />
        </div>
      )}
      {heading && <h2 className="ihb-heading type-display-small">{heading}</h2>}
      {bodyParagraphs?.length > 0 && (
        <div className="ihb-body">
          {bodyParagraphs.map((para, i) => (
            <p key={i} className="ihb-para type-body-small">{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}

const VideoComponent = ({ videoFile, videoUrl, posterImage, autoplay, loop, muted, caption }) => {
  try {
    const extractYouTubeId = (url) => {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
      ]
      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
      }
      return null
    }

    const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'))

    if (isYouTube) {
      const videoId = extractYouTubeId(videoUrl)
      if (!videoId) return <div className="video-error"><p>Invalid YouTube URL</p></div>

      const embedParams = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        playlist: loop ? videoId : '',
        rel: '0',
        modestbranding: '1'
      })

      return (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`}
            className="video-player"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video"
          />
          {caption && <p className="video-caption">{caption}</p>}
        </div>
      )
    }

    const videoSrc = videoFile?.asset?.url || videoUrl
    if (!videoSrc) return <div className="video-error"><p>Video source not available</p></div>

    const posterSrc = posterImage?.asset?.gatsbyImageData
      ? getImage(posterImage.asset.gatsbyImageData)?.images?.fallback?.src
      : null

    return (
      <div className="video-container">
        <video controls autoPlay={autoplay} loop={loop} muted={muted} poster={posterSrc} className="video-player" preload="metadata">
          <source src={videoSrc} type={videoFile ? "video/mp4" : undefined} />
          Your browser does not support the video tag.
        </video>
        {caption && <p className="video-caption">{caption}</p>}
      </div>
    )
  } catch (error) {
    console.error('Video component error:', error)
    return <div className="video-error"><p>Unable to load video</p></div>
  }
}

const Spacer = ({ size }) => {
  const pixelSize = parseInt(size) || 20
  return <div className="spacer" style={{ height: `${pixelSize}px` }} />
}

const SliderComponent = ({ slides }) => {
  const [current, setCurrent] = React.useState(0)
  if (!slides?.length) return null

  const isFirst = current === 0
  const isLast = current === slides.length - 1
  const prev = () => { if (!isFirst) setCurrent(i => i - 1) }
  const next = () => { if (!isLast) setCurrent(i => i + 1) }

  const slide = slides[current]
  const imageUrl = slide?.image?.asset?.url

  return (
    <div className="slider-component">
      {imageUrl && (
        <img
          className="slider-image"
          src={imageUrl}
          alt={slide?.image?.alt || `Slide ${current + 1}`}
          loading="lazy"
        />
      )}
      <div className="slider-controls-bar">
        <button onClick={prev} disabled={isFirst} aria-label="Previous slide" className="slider-arrow-btn">
          <img src={isFirst ? LeftDisabled : LeftActive} alt="Previous slide" width="25" height="25" />
        </button>
        <div className="slider-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`slider-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button onClick={next} disabled={isLast} aria-label="Next slide" className="slider-arrow-btn">
          <img src={isLast ? RightDisabled : RightActive} alt="Next slide" width="25" height="25" />
        </button>
      </div>
    </div>
  )
}

const CaseStudyFooter = ({ relatedProjects }) => (
  <footer className="cs-footer">
    {/* More projects */}
    <div className="cs-footer-projects">
      <h3 className="cs-footer-projects-title">More projects</h3>
      <div className="cs-footer-projects-list">
        {relatedProjects.map((project, index) => (
          <Link
            key={index}
            to={`/case-study/${project.slug?.current || ''}`}
            className="cs-footer-project-link"
          >
            <div className="cs-footer-project-row">
              <span className="cs-footer-project-name">{project.title}</span>
              <div className="cs-footer-project-meta">
                <span className="cs-footer-project-client">{project.client}</span>
                <span className="cs-footer-project-year">{project.year}</span>
              </div>
            </div>
            <div className="cs-footer-divider" />
          </Link>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="cs-footer-bottom">
      <div className="cs-footer-bottom-left">
        {/* Logo */}
        <svg width="69" height="21" viewBox="0 0 69 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TXDI logo">
          <path d="M4.97874 1.0038H10.0213V20H4.97874V1.0038Z" fill="#EE550E"/>
          <path d="M0 6.20068V1H15V6.20068H0Z" fill="#EE550E"/>
          <path d="M20.5423 5.08242L24.7244 1L40 15.9116L35.8179 19.994L20.5423 5.08242Z" fill="#EE550E"/>
          <path d="M35.2756 1.00598L39.4577 5.0884L24.1821 20L20 15.9176L35.2756 1.00598Z" fill="#EE550E"/>
          <path d="M45.0396 3.82042L48.7724 0L59 10.4678L55.2672 14.2882L45.0396 3.82042Z" fill="#EE550E"/>
          <path d="M55.2276 6.71177L58.9604 10.5322L48.7328 21L45 17.1796L55.2276 6.71177Z" fill="#EE550E"/>
          <path d="M64 1H69V20H64V1Z" fill="#EE550E"/>
        </svg>
        <span className="cs-footer-location">Lagos. London. Wherever.</span>
        {/* Socials */}
        <div className="cs-footer-socials">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="cs-footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="cs-footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="cs-footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
      <span className="cs-footer-copyright">© {new Date().getFullYear()} TXDI. All rights reserved.</span>
    </div>
  </footer>
)

const CaseStudyTemplate = ({ data }) => {
  const caseStudy = data?.sanityCaseStudy
  const project = caseStudy?.project

  React.useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.id = 'case-study-menu-override'
    styleEl.innerHTML = `
      .menu-link { color: #FFFFFF !important; }
      .menu-link:hover { color: #EE550E !important; }
    `
    document.head.appendChild(styleEl)
    return () => {
      const el = document.getElementById('case-study-menu-override')
      if (el) el.remove()
    }
  }, [])

  const cmsRelatedProjects = caseStudy?.relatedProjects || []
  const autoRelatedProjects = data?.allSanityProject?.edges?.map(edge => edge.node) || []
  const relatedProjects = cmsRelatedProjects.length > 0 ? cmsRelatedProjects : autoRelatedProjects

  const components = caseStudy?._rawComponents || []
  const firstComponent = components[0]
  const hasHeroSectionComponent = firstComponent?._type === 'heroSection'

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
    <Layout>
      <div className="case-study-page">

        {!hasHeroSectionComponent && project.heroImage?.asset?.gatsbyImageData && (
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

            {!hasHeroSectionComponent && (
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
            )}

            {components.map((component, index) => {
              if (!component || !component._type) return null
              switch (component._type) {
                case 'heroSection':
                  return <HeroSection key={index} {...component} />
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
                case 'sliderComponent':
                  return <SliderComponent key={index} {...component} />
                case 'iconHeadingBlock':
                  return <IconHeadingBlock key={index} {...component} />
                default:
                  return null
              }
            })}
          </div>
        </div>

        <CaseStudyFooter relatedProjects={relatedProjects} />
      </div>

      <style jsx="true">{`
        .case-study-page {
          background: var(--black-nue-black) url("/noise.png");
          background-size: 100px 100px;
          background-blend-mode: normal;
          min-height: 100vh;
          margin: -100px 0 0 -100px;
          position: relative;
        }

        .hero-section-component {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          padding: 60px 0;
        }

        .hero-section-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero-section-headline {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 80px;
          font-weight: 500;
          line-height: 95%;
          color: var(--white-heavenly);
          margin: 0;
        }

        .hero-section-subtext {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 400;
          line-height: 140%;
          color: var(--white-heavenly);
          margin: 0;
        }

        .hero-section-image {
          width: 465px;
          height: 550px;
          overflow: hidden;
          justify-self: end;
        }

        .hero-section-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1024px) {
          .hero-section-component {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 40px 0;
          }
          .hero-section-headline { font-size: 45px; }
          .hero-section-image {
            width: 100%;
            height: 350px;
            justify-self: stretch;
          }
        }

        @media (max-width: 480px) {
          .hero-section-headline { font-size: 45px; }
          .hero-section-image { width: 313px; height: 350px; }
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

        .meta-label { color: var(--orange); }

        .project-intro-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

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

        /* ── Typography utility classes ── */
        .type-body-small,
        .type-body-small-semibold,
        .type-body-small-bold,
        .type-body-xsmall,
        .type-title-xsmall,
        .type-title-small,
        .type-title-medium,
        .type-title-large,
        .type-display-small,
        .type-display-medium,
        .type-display-large,
        .type-display-xlarge {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          color: var(--white-heavenly);
          margin: 0;
        }

        .type-body-small        { font-size: 14px;   line-height: 120%; font-weight: 400; }
        .type-body-small-semibold { font-size: 14px; line-height: 120%; font-weight: 500; }
        .type-body-small-bold   { font-size: 14px;   line-height: 120%; font-weight: 700; }
        .type-body-xsmall       { font-size: 12px;   line-height: 120%; font-weight: 700; }
        .type-title-xsmall      { font-size: 18px;   line-height: 95%;  font-weight: 700; }
        .type-title-small       { font-size: 20px;   line-height: 95%;  font-weight: 700; }
        .type-title-medium      { font-size: 25px;   line-height: 130%; font-weight: 700; }
        .type-title-large       { font-size: 28px;   line-height: 95%;  font-weight: 700; }
        .type-display-small     { font-size: 32.5px; line-height: 95%;  font-weight: 700; }
        .type-display-medium    { font-size: 45px;   line-height: 100%; font-weight: 700; }
        .type-display-large     { font-size: 65px;   line-height: 100%; font-weight: 700; }
        .type-display-xlarge    { font-size: 80px;   line-height: 90%;  font-weight: 500; }

        .image-grid {
          display: grid;
          width: 100%;
          height: 800px;
        }

        .image-grid.gaps-enabled { gap: 20px; }
        .image-grid.gaps-disabled { gap: 0px; }
        .grid-2 { grid-template-columns: 1fr 1fr; }
        .grid-3 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
        .grid-3 .grid-item.full-height { grid-row: span 2; }
        .grid-4-horizontal { grid-template-columns: 1fr 1fr 1fr 1fr; }
        .grid-4-square { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
        .grid-5 { grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: auto auto; }
        .grid-5 .grid-item.full-width { grid-column: 1 / -1; }
        .grid-item { overflow: hidden; }
        .grid-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .height-fixed-800 { height: 800px; }
        .image-single.height-fixed-800 { height: 800px; }
        .image-single img { width: 100%; height: 100%; object-fit: cover; }

        .section-divider { display: flex; flex-direction: column; gap: 10px; }

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

        /* ── Icon Heading Block ── */
        .icon-heading-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .ihb-icon {
          width: 49px;
          height: 49px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .ihb-icon img {
          width: 49px;
          height: 49px;
          object-fit: contain;
          display: block;
        }

        .ihb-heading {
          text-align: center;
          margin-bottom: 20px;
        }

        .ihb-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
          width: 100%;
        }

        .ihb-para {
          margin: 0;
          letter-spacing: 0.42px;
        }

        @media (max-width: 480px) {
          .ihb-heading { font-size: 25px; }
        }

        /* ── Video Component ── */
        .video-container { width: 100%; margin: 20px 0; }

        .video-player {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: contain;
          background: #000;
        }

        .video-player[src*="youtube.com"],
        .video-player[src*="youtu.be"] {
          aspect-ratio: 16 / 9;
          height: auto;
          min-height: 200px;
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

        /* ── Slider Component ── */
        .slider-component {
          width: 100%;
          margin-left: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .slider-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .slider-controls-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 0 20px;
        }

        .slider-arrow-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }

        .slider-arrow-btn:disabled { cursor: default; }

        .slider-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .slider-dot {
          width: 10px;
          height: 3px;
          border-radius: 1.7px;
          background: white;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .slider-dot.active {
          width: 24px;
          border-radius: 4px;
          background: #EE550E;
        }

        @media (max-width: 768px) {
          .slider-component { width: 100%; margin-left: 0; }
        }

        @media (max-width: 480px) {
          .slider-component {
            width: calc(100% + 78px);
            margin-left: -39px;
          }
        }

        /* ── Case Study Footer ── */
        .cs-footer {
          width: 100%;
          padding: 0 100px 60px;
        }

        /* More projects */
        .cs-footer-projects {
          padding: 60px 0 40px;
        }

        .cs-footer-projects-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
          text-transform: uppercase;
          margin: 0 0 24px;
        }

        .cs-footer-projects-list {
          display: flex;
          flex-direction: column;
        }

        .cs-footer-project-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: all 0.2s ease;
        }

        .cs-footer-project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
        }

        .cs-footer-project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--white-not-wyt, #f9f9f8);
          transition: color 0.2s ease;
        }

        .cs-footer-project-meta {
          display: flex;
          gap: 12px;
        }

        .cs-footer-project-client,
        .cs-footer-project-year {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
          transition: color 0.2s ease;
        }

        .cs-footer-project-link:hover .cs-footer-project-name { color: #EE550E; }
        .cs-footer-project-link:hover .cs-footer-project-client,
        .cs-footer-project-link:hover .cs-footer-project-year { color: #ffffff; }

        .cs-footer-divider {
          width: 100%;
          height: 0;
          border-top: 0.5px solid rgba(236, 240, 241, 0.2);
        }

        /* Bottom bar */
        .cs-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 0.5px solid rgba(236, 240, 241, 0.2);
        }

        .cs-footer-bottom-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .cs-footer-location {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .cs-footer-socials {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cs-footer-social-link {
          color: var(--grey-misty);
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .cs-footer-social-link:hover { color: #ffffff; }

        .cs-footer-copyright {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .main-content { padding: 40px 20px 100px; }
          .cs-footer { padding: 0 20px 60px; }
          .project-title { font-size: 45px; }
        }

        @media (max-width: 768px) {
          .case-study-page { margin: 0; }
          .project-title { font-size: 35px; }
          .project-meta-row { flex-direction: column; gap: 10px; }
          .cs-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .case-study-page {
            background: #232020 url("/noise.png");
            background-size: 100px 100px;
            background-blend-mode: normal;
            margin: 0;
            padding: 0;
          }
          .hero-image { width: 100%; height: 346px; margin-top: 0; }
          .main-content { padding: 40px 39px 100px; }
          .container { max-width: 100%; margin: 0; display: flex; flex-direction: column; gap: 165px; }
          .project-intro { display: flex; flex-direction: column; gap: 20px; }
          .project-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 32.5px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            max-width: 100%;
          }
          .project-meta-row { display: flex; flex-direction: column; gap: 10px; }
          .meta-item {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }
          .meta-label { color: #EE550E; }
          .project-intro-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }
          .cs-footer { padding: 0 39px 60px; }
          .cs-footer-bottom-left { flex-wrap: wrap; gap: 14px; }
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    sanityCaseStudy(project: { slug: { current: { eq: $slug } } }) {
      id
      _rawComponents(resolveReferences: { maxDepth: 10 })
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
      relatedProjects {
        id
        title
        client
        year
        slug {
          current
        }
      }
    }
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
