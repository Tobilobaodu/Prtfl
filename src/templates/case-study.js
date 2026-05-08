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
  const blockTypeValue = type || blockType || 'bodyText'

  const typeClass = {
    sectionTitle: 'text-section-title',
    bodyText: 'text-body',
    tag: 'text-tag'
  }[blockTypeValue]

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

  if (blockTypeValue === 'sectionTitle') return <h2 className={typeClass}>{extractPlainText(content)}</h2>
  if (blockTypeValue === 'tag') return <div className={typeClass}>{extractPlainText(content)}</div>
  if (blockTypeValue === 'bodyText') return <div className={typeClass}>{renderRichText(content)}</div>
  return <p className={typeClass}>{extractPlainText(content)}</p>
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
      <div className="slider-stats-bar">
        <div className="slider-stats">
          {slide?.statLeft && <span className="slider-stat">{slide.statLeft}</span>}
          {slide?.statLeft && slide?.statRight && <div className="slider-stat-divider" />}
          {slide?.statRight && <span className="slider-stat">{slide.statRight}</span>}
        </div>
        <div className="slider-controls">
          <button onClick={prev} disabled={isFirst} aria-label="Previous slide" className="slider-arrow-btn">
            <img src={isFirst ? LeftDisabled : LeftActive} alt="Previous slide" width="40" height="40" />
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
            <img src={isLast ? RightDisabled : RightActive} alt="Next slide" width="40" height="40" />
          </button>
        </div>
      </div>
    </div>
  )
}

const CaseStudyTemplate = ({ data }) => {
  const caseStudy = data?.sanityCaseStudy
  const project = caseStudy?.project
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
              <Link key={index} to={`/case-study/${project.slug?.current || ''}`} className="panel-project-link">
                <div className="panel-project">
                  <div className="panel-project-row">
                    <div className="panel-project-name">{project.title}</div>
                    <div className="panel-project-meta">
                      <span className="panel-brand">{project.client}</span>
                      <span className="panel-year">{project.year}</span>
                    </div>
                  </div>
                  <div className="panel-divider"></div>
                </div>
              </Link>
            ))}
          </div>
          <button className="back-button" onClick={() => window.history.back()}>
            <span className="back-button-bg-orange"></span>
            <span className="back-button-bg-black"></span>
            <span className="back-button-content">
              <span className="back-arrow">←</span>
              <span className="back-text">Go back</span>
            </span>
          </button>
        </div>
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
          width: calc(100% + 200px);
          margin-left: -100px;
          background: #F0EBE0;
          overflow: hidden;
        }

        .slider-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .slider-stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 100px;
          gap: 24px;
        }

        .slider-stats {
          display: flex;
          align-items: center;
          flex: 1;
          gap: 0;
        }

        .slider-stat {
          flex: 1;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 120%;
        }

        .slider-stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(0, 0, 0, 0.15);
          flex-shrink: 0;
          margin: 0 40px;
        }

        .slider-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
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

        .slider-arrow-btn:disabled {
          cursor: default;
        }

        .slider-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
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
          .slider-component {
            width: 100%;
            margin-left: 0;
          }
          .slider-stats-bar {
            padding: 20px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .slider-controls {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .slider-component {
            width: calc(100% + 78px);
            margin-left: -39px;
          }
          .slider-stats-bar {
            padding: 20px 39px;
          }
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

        .side-panel.open { right: 0; }

        .panel-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--grey-just);
          margin-bottom: 106px;
        }

        .panel-projects { display: flex; flex-direction: column; gap: 10px; }

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

        .panel-project-meta { display: flex; gap: 5px; }

        .panel-brand, .panel-year {
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

        .panel-project-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: all 0.3s ease;
        }

        .panel-project-link:hover .panel-project-name { color: #EE550E; }
        .panel-project-link:hover .panel-brand,
        .panel-project-link:hover .panel-year { color: #FFFFFF; }

        .back-button {
          position: absolute;
          bottom: 109px;
          left: 109px;
          right: 109px;
          width: 164px;
          height: 55px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .back-button-bg-orange {
          position: absolute;
          width: 153px;
          height: 45px;
          background: #0000FF;
          left: 8px;
          top: 3px;
          transition: all 0.3s ease;
        }

        .back-button-bg-black {
          position: absolute;
          width: 153px;
          height: 45px;
          background: #F9F9F8;
          left: 11px;
          top: 0;
          transition: all 0.3s ease;
        }

        .back-button-content {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          left: 40px;
          top: 12.5px;
          color: #26282B;
          transition: all 0.3s ease;
        }

        .back-arrow {
          font-size: 20px;
          line-height: 1;
          color: #26282B;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .back-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 0.9em;
          letter-spacing: 2%;
          text-transform: uppercase;
          color: #26282B;
          transition: all 0.3s ease;
        }

        .back-button:hover .back-button-bg-orange { background: #F9F9F8; }
        .back-button:hover .back-button-bg-black { background: #0000FF; }
        .back-button:hover .back-button-content,
        .back-button:hover .back-arrow,
        .back-button:hover .back-text { color: #FFFFFF; }

        @media (max-width: 1200px) {
          .side-panel { position: relative; width: 100%; height: auto; padding: 60px 20px; }
          .main-content { padding: 40px 20px 100px; }
          .project-title { font-size: 45px; }
        }

        @media (max-width: 768px) {
          .case-study-page { margin: 0; }
          .project-title { font-size: 35px; }
          .project-meta-row { flex-direction: column; gap: 10px; }
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
