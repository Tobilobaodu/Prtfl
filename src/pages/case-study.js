import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import HeroSection from "../components/HeroSection"

const CaseStudyPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // Inject white nav link override for dark background
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const relatedProjects = [
    { title: "The name of project", brand: "Brand name", year: "2021" },
    { title: "Banking the right way", brand: "Prosperity Bank", year: "2021" },
    { title: "Learning the right way", brand: "Sterling University", year: "2020" },
    { title: "Servicing new customer", brand: "Motomi", year: "2019" },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018" },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018" },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018" },
    { title: "Calabar coaster road", brand: "Brand name", year: "2018" }
  ]

  // ---------------------------------------------------------------------------
  // Example: replace this with real Sanity data once GraphQL query is wired up.
  // When heroSection data exists in the components array, the default .hero-image
  // block below is hidden automatically.
  // ---------------------------------------------------------------------------
  const heroSectionData = null // e.g. from pageContext.components.find(c => c._type === 'heroSection')

  return (
    <>
      <div className="case-study-page">
        <nav className="case-study-nav">
          <Link to="/" className="logo">
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.32 0.420583H20.9026V13.5066H17.32V0.420583Z" fill="#1D1C1C" />
              <path d="M13.7827 4.00059V0.417969H24.4399V4.00059H13.7827Z" fill="#1D1C1C" />
              <path d="M29.8021 3.25667L32.5949 0.463867L42.796 10.665L40.0032 13.4578L29.8021 3.25667Z" fill="#1D1C1C" />
              <path d="M39.641 0.467958L42.4338 3.26076L32.2327 13.4618L29.4399 10.669L39.641 0.467958Z" fill="#1D1C1C" />
              <path d="M47.8228 2.53329L50.3561 0L57.2972 6.94114L54.7639 9.47443L47.8228 2.53329Z" fill="#1D1C1C" />
              <path d="M54.737 4.45053L57.2703 6.98382L50.3292 13.925L47.7959 11.3917L54.737 4.45053Z" fill="#1D1C1C" />
              <path d="M62.2974 0.419922H65.88V13.5059H62.2974V0.419922Z" fill="#1D1C1C" />
              <path d="M0.467529 30.1208L12.0387 23.9991L21.05 30.2917L33.2018 23.9248L41.1544 30.5356L52.6744 23.9912L61.2189 30.4902L69.8286 24.2208L78.7221 29.8124L79.1951 29.2476" stroke="#EE550E" strokeWidth="2" />
            </svg>
          </Link>
          <button className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>

        {/* Hero: use HeroSection component if heroSectionData exists, otherwise fall back to project hero image */}
        {heroSectionData ? (
          <HeroSection
            headline={heroSectionData.headline}
            subtext={heroSectionData.subtext}
            heroImage={heroSectionData.heroImage}
          />
        ) : (
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80" alt="Case study hero" />
          </div>
        )}

        <div className="main-content">
          <div className="container">
            <div className="project-intro">
              <h1 className="project-title">The name of the project goes here</h1>
              <div className="project-meta-row">
                <div className="meta-item">
                  <span className="meta-label">Client:</span>
                  <span className="meta-value"> Sterling University Learning App</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Project type:</span>
                  <span className="meta-value"> Mobile & Desktop</span>
                </div>
              </div>
              <p className="project-intro-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <div className="image-gallery-hero">
                <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200&q=80" alt="Project showcase" />
                <div className="gallery-indicators">
                  <div className="indicator active"></div>
                  <div className="indicator"></div>
                  <div className="indicator"></div>
                </div>
              </div>
            </div>

            <section className="content-section">
              <h2 className="section-title">The Ask:</h2>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80" alt="The Ask" className="section-image" />
            </section>

            <section className="content-section">
              <div className="tag">01 Discovery</div>
              <h2 className="section-title">Discovery stage: statement</h2>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <div className="image-row">
                <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80" alt="Discovery 1" />
                <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80" alt="Discovery 2" />
                <img src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=300&q=80" alt="Discovery 3" />
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80" alt="Discovery 4" />
              </div>
              <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200&q=80" alt="Discovery full" className="section-image" />
            </section>

            <section className="content-section">
              <div className="tag">02 Strategy</div>
              <h2 className="section-title">Strategy: statement</h2>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <div className="image-row">
                <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80" alt="Strategy 1" />
                <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80" alt="Strategy 2" />
              </div>
            </section>

            <section className="content-section">
              <div className="tag">03 Strategy</div>
              <h2 className="section-title">Strategy: statement</h2>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <div className="image-row">
                <img src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=300&q=80" alt="Strategy 3" />
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80" alt="Strategy 4" />
              </div>
              <h3 className="subsection-title">Section title</h3>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </section>

            <section className="content-section">
              <h2 className="section-title">Gallery</h2>
              <div className="image-row">
                <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80" alt="Gallery 1" />
                <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80" alt="Gallery 2" />
              </div>
              <h3 className="subsection-title">Section title</h3>
              <p className="section-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </section>
          </div>
        </div>

        <div className={`side-panel ${isMenuOpen ? 'open' : ''}`}>
          <h3 className="panel-title">more projects</h3>
          <div className="view-more">View more</div>
          <div className="panel-projects">
            {relatedProjects.map((project, index) => (
              <div key={index} className="panel-project">
                <div className="panel-project-row">
                  <div className="panel-project-name">{project.title}</div>
                  <div className="panel-project-meta">
                    <span className="panel-brand">{project.brand}</span>
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
          background: var(--black-nue-black) url("/noise.png");
          background-size: 100px 100px;
          background-blend-mode: normal;
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
          position: relative;
          transition: all 0.3s ease;
        }

        .menu-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: var(--white-not-wyt);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
          z-index: -1;
        }

        .menu-icon:hover::before {
          width: 32px;
          height: 32px;
        }

        .hero-image {
          width: 100%;
          height: 434px;
          overflow: hidden;
        }

        .hero-image img {
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

        .image-gallery-hero {
          position: relative;
          height: 439px;
        }

        .image-gallery-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .gallery-indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
        }

        .indicator {
          height: 2.5px;
          width: 42px;
          background: var(--white-heavenly);
        }

        .indicator.active {
          background: var(--orange);
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tag {
          display: inline-flex;
          padding: 5px;
          background: var(--yellow);
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--black-pitch-nah);
          width: fit-content;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .subsection-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
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

        .section-image {
          width: 100%;
          height: 385px;
          object-fit: cover;
          border-radius: 4px;
        }

        .image-row {
          display: flex;
          gap: 20px;
        }

        .image-row img {
          flex: 1;
          height: 272px;
          object-fit: cover;
          border-radius: 5px;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .image-grid img {
          width: 100%;
          height: 272px;
          object-fit: cover;
          border-radius: 4px;
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

        .view-more {
          position: absolute;
          left: 19px;
          top: 352px;
          transform: rotate(-90deg);
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
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

          .image-row {
            flex-wrap: wrap;
          }

          .image-row img {
            flex: 1 1 calc(50% - 10px);
          }
        }

        @media (max-width: 768px) {
          .case-study-nav {
            padding: 32px 20px;
          }

          .project-title {
            font-size: 35px;
          }

          .image-grid {
            grid-template-columns: 1fr;
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

          .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

          .image-gallery-hero {
            position: relative;
            height: 439px;
          }

          .image-gallery-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .gallery-indicators {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 5px;
          }

          .indicator {
            height: 2.5px;
            width: 13.667px;
            background: #FFF;
          }

          .indicator.active {
            background: #EE550E;
          }

          .content-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .tag {
            display: flex;
            padding: 5px;
            justify-content: center;
            align-items: center;
            background: #FBBF24;
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            color: #1D1C1C;
            align-self: flex-start;
          }

          .section-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            align-self: flex-start;
          }

          .subsection-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 20px;
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

          .section-image {
            width: 100%;
            height: 385px;
            object-fit: cover;
            align-self: stretch;
          }

          .image-row {
            display: flex;
            height: 82.868px;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
            align-self: stretch;
          }

          .image-row img {
            flex: 1 0 0;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
          }

          .image-grid {
            display: grid;
            height: 564px;
            row-gap: 20px;
            column-gap: 20px;
            align-self: stretch;
            grid-template-rows: repeat(2, minmax(0, 1fr));
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .image-grid img {
            flex: 1 0 0;
            align-self: stretch;
            object-fit: cover;
          }

          .side-panel {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export const Head = () => <Seo title="Case Study" />

export default CaseStudyPage
