import * as React from "react"
import { Link } from "gatsby"
import "./layout.css"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <nav className="navigation">
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
          className="menu-icon" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
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
        </button>
      </nav>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#FFF" strokeWidth="2"/>
              </svg>
            </button>
            <nav className="menu-nav">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/experience" onClick={() => setMenuOpen(false)}>Experience</Link>
              <Link to="/portfolio" onClick={() => setMenuOpen(false)}>wrk</Link>
              <Link to="/sndbx" onClick={() => setMenuOpen(false)}>sndbx</Link>
              <Link to="/photography" onClick={() => setMenuOpen(false)}>phtgrphy</Link>
              <Link to="/case-study" onClick={() => setMenuOpen(false)}>Case Study</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        </div>
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
          background: var(--white-not-wyt);
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
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 200;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-content {
          background: var(--black-nue-ish-black);
          padding: 60px;
          border-radius: 8px;
          position: relative;
          min-width: 300px;
        }

        .menu-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .menu-nav a {
          font-size: 24px;
          font-weight: 700;
          color: var(--white-heavenly);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .menu-nav a:hover {
          color: var(--orange);
        }

        main {
          padding-top: 0px;
          min-height: calc(100vh - 0px);
        }

        @media (max-width: 768px) {
          .navigation {
            padding: 32px 20px;
          }

          .menu-content {
            padding: 40px;
            min-width: 280px;
          }

          .menu-nav a {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  )
}

export default Layout
