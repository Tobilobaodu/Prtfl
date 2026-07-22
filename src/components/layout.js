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

    </>
  )
}

export default Layout
