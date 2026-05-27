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
    sectionTitle: 'text-section-title',
    bodyText: 'text-body',
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

const slugify = (str) => str?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''

const SectionDivider = ({ tag, title, dividerStyle = 'line' }) => {
  const id = slugify(title || tag)
  return (
    <div id={id} className={`section-divider section-anchor divider-style-${dividerStyle}`}>
      {tag && <div className="section-tag">{tag}</div>}
      {title && <h2 className="section-title">{title}</h2>}
    </div>
  )
}

const IconHeadingBlock = ({ icon, heading, bodyParagraphs }) => {
  const iconUrl = icon?.asset?.url
  const id = heading ? slugify(heading) : undefined
  return (
    <div id={id} className="icon-heading-block">
      {iconUrl && (
        <div className="ihb-icon">
          <img src={iconUrl} alt="" loading="lazy" />
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

    const ALLOWED_VIDEO_HOSTS = ['cdn.sanity.io', 'asset.sanity.io']
    const rawVideoUrl = videoFile?.asset?.url || videoUrl
    if (!rawVideoUrl) return <div className="video-error"><p>Video source not available</p></div>
    let videoSrc = null
    try {
      const parsed = new URL(rawVideoUrl)
      if (videoFile || ALLOWED_VIDEO_HOSTS.includes(parsed.hostname)) {
        videoSrc = rawVideoUrl
      }
    } catch {
      // invalid URL
    }
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
      {(slide?.statLeft || slide?.statRight) && (
        <div className="slider-stats-bar">
          {slide.statLeft && <span className="slider-stat">{slide.statLeft}</span>}
          {slide.statRight && <span className="slider-stat">{slide.statRight}</span>}
        </div>
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

const TableOfContents = ({ components, activeId }) => {
  const sections = components
    .filter(c => c._type === 'iconHeadingBlock' && c.heading)
    .map(c => ({ label: c.heading, id: slugify(c.heading) }))

  if (!sections.length) return null

  return (
    <nav className="toc">
      <p className="toc-heading">Table of Contents</p>
      <ul className="toc-list">
        {sections.map((s, i) => (
          <li key={i} className="toc-item">
            <a
              href={`#${s.id}`}
              className={`toc-link${activeId === s.id ? ' toc-link--active' : ''}`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Shared arrow-out icon used by all social links
const ArrowOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2V14H14V8H12.6667V12.6667H3.33333V3.33333H8V2H2ZM9.33333 2V3.33333H11.724L5.52865 9.52865L6.47135 10.4714L12.6667 4.27604V6.66667H14V2H9.33333Z" fill="currentColor"/>
  </svg>
)

// Copy icon used for the Email button
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2822_1218)">
      <path d="M10.6667 0.666992H1.33337V11.3337H2.66671V2.00033H10.6667V0.666992ZM14 3.33366H4.00004V15.3337H14V3.33366ZM12.6667 14.0003H5.33337V4.66699H12.6667V14.0003Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_2822_1218">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

const CaseStudyFooter = ({ relatedProjects }) => {
  const [copied, setCopied] = React.useState(false)

  const handleEmailCopy = () => {
    navigator.clipboard.writeText('tobilobaodu@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
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
        <div className="social-links">
          <button className="social-link email-copy-btn" onClick={handleEmailCopy}>
            <span>{copied ? 'Copied!' : 'Email'}</span>
            <CopyIcon />
          </button>
          <a href="https://www.behance.net/tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
            <span>Behance</span>
            <ArrowOutIcon />
          </a>
          <a href="https://dribbble.com/tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
            <span>Dribbble</span>
            <ArrowOutIcon />
          </a>
          <a href="https://github.com/Tobilobaodu" target="_blank" rel="noopener noreferrer" className="social-link">
            <span>Github</span>
            <ArrowOutIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

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

  const [activeId, setActiveId] = React.useState(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const anchors = document.querySelectorAll('.icon-heading-block')
    anchors.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [components])

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

        <div className="cs-body-layout">
          <aside className="cs-toc-col">
            <TableOfContents components={components} activeId={activeId} />
          </aside>

          <div className="cs-content-col">
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

        html {
          scroll-behavior: smooth;
        }

        .cs-body-layout {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 60px;
          max-width: 1240px;
          margin: 0 auto;
          padding: 60px 0px 100px;
          align-items: start;
        }

        .cs-toc-col {
          position: sticky;
          top: 739px;
        }

        .toc-heading {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--grey-misty);
          margin: 0 0 16px;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .toc-item { margin: 0; }

        .toc-link {
          padding-left: 20px;
          position: relative;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--grey-misty);
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1.4;
        }

        .toc-link:hover { color: var(--white-heavenly); }

        .toc-link--active {
          color: var(--white-heavenly);
        }

        .toc-link--active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: #FBBF24;
        }

        .cs-content-col {
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

        .type-body-small        { font-size: 15px;   line-height: 140%; font-weight: 400; letter-spacing: 0.03em; }
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

        .section-divider { display: flex; flex-direction: column; gap: 10px; scroll-margin-top: 100px; }

        .divider-style-line::before {
          content: '';
          display: block;
          border-top: 0.5px solid rgba(255,253,241,0.46);
          margin-bottom: 16px;
        }
        .divider-style-double-line::before {
          content: '';
          display: block;
          border-top: 3px double rgba(255,253,241,0.46);
          margin-bottom: 16px;
        }
        .divider-style-dotted::before {
          content: '';
          display: block;
          border-top: 1px dotted rgba(255,253,241,0.46);
          margin-bottom: 16px;
        }
        .divider-style-none::before { display: none; }

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
          scroll-margin-top: 100px;
        }

        .ihb-icon {
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .ihb-icon img {
          object-fit: contain;
          display: block;
        }

        .ihb-heading {
          text-align: center;
          margin-bottom: 20px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
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

        .slider-stats-bar {
          display: flex;
          justify-content: space-between;
          padding: 14px 0 4px;
        }

        .slider-stat {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--white-heavenly);
          letter-spacing: 0.42px;
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
          border-top: solid #FFFDF175 0.5px;
        }

        .cs-footer-projects {
          padding: 60px 0 40px;
        }

        .cs-footer-projects-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 32.5px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
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

        /* Social links */
        .social-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          color: var(--grey-misty);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .social-link:hover { color: #ffffff; }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .cs-body-layout { padding: 40px 20px 100px; gap: 40px; }
          .cs-footer { padding: 0 20px 60px; }
          .project-title { font-size: 45px; }
        }

        @media (max-width: 1024px) {
          .cs-body-layout { grid-template-columns: 1fr; }
          .cs-toc-col { display: none; }
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
          .cs-body-layout { padding: 40px 39px 100px; gap: 40px; }
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
          .cs-footer-bottom { flex-wrap: wrap; gap: 16px; }
          .social-links { flex-wrap: wrap; gap: 12px; }
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
