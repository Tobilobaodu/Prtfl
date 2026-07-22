import * as React from "react"
import { Link } from "gatsby"
import "./layout.css"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrollOpacity, setScrollOpacity] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 80
      const opacity = Math.min(scrollY / threshold, 1)
      setScrollOpacity(opacity)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className="navigation"
        style={{
          background: scrollOpacity > 0
            ? `rgba(255, 255, 255, ${0.05 * scrollOpacity})`
            : 'transparent',
          backdropFilter: scrollOpacity > 0
            ? `blur(${2.5 * scrollOpacity}px)`
            : 'none',
        }}
      >
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
        <button 
          className={`menu-icon ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5V10.5H19.5V13.5H13.5V19.5H10.5V13.5H4.5V10.5H10.5V4.5H13.5Z" fill="#EE550E" stroke="#EE550E" transform="rotate(45 12 12)"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path d="M13.5 4.5V10.5H19.5V13.5H13.5V19.5H10.5V13.5H4.5V10.5H10.5V4.5H13.5Z" fill="#EE550E" stroke="#EE550E"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <>
          <div className="menu-blur-overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="menu-panel">
            <nav className="menu-nav">
              <Link to="/portfolio" className="menu-link" onClick={() => setMenuOpen(false)}>WRKS</Link>
              <Link to="/experience" className="menu-link" onClick={() => setMenuOpen(false)}>XPRNC</Link>
              <Link to="/sndbx" className="menu-link" onClick={() => setMenuOpen(false)}>SNDBX</Link>
              <Link to="/photography" className="menu-link" onClick={() => setMenuOpen(false)}>PHTGRPHY</Link>
              <a href="https://medium.com/@tobilobaodu" target="_blank" rel="noopener noreferrer" className="menu-link" onClick={() => setMenuOpen(false)}>NTPD</a>
              <Link to="/cntct" className="menu-link" onClick={() => setMenuOpen(false)}>CNTCT</Link>
            </nav>
          </div>
        </>
      )}

      <main>{children}</main>

      <style jsx="true">{`
        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 100px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
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
          z-index: 101;
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
          background: #BBBBBB;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
          z-index: -1;
        }

        .menu-icon:hover::before {
          width: 32px;
          height: 32px;
        }

        .menu-blur-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(2.5px);
          z-index: 99;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .menu-panel {
          position: fixed;
          top: 57px;
          right: 100px;
          width: 76px;
          background: transparent;
          z-index: 100;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .menu-link {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--black-pitch-nah);
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 5px 0;
        }

        .menu-link:hover {
          color: var(--orange);
        }

        main {
          padding-left: 100px;
        }

        @media (max-width: 1200px) {
          .navigation {
            padding: 32px 20px;
          }

          .menu-panel {
            right: 20px;
          }

          main {
            padding-left: 20px;
          }
        }

        @media (max-width: 768px) {
          .navigation {
            padding: 32px 20px;
          }

          .menu-panel {
            right: 20px;
            top: 70px;
          }

          .menu-link {
            font-size: 16px;
          }

          main {
            padding-left: 20px;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            display: flex;
            width: 100%;
            padding: 30px 40px;
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

          .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }

          .logo svg {
            height: auto;
            width: auto;
          }

          .menu-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }

          .menu-panel {
            right: 40px;
            top: 84px;
          }

          .menu-nav {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
          }

          .menu-link {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 120%;
            color: var(--black-pitch-nah);
          }

          main {
            padding-left: 0;
            padding-top: 0;
            min-height: calc(100vh - 84px);
          }
        }
      `}</style>
    </>
  )
}

export default Layout
