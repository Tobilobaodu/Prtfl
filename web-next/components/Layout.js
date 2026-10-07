'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { subscribe } from '../lib/ticker'

// In nav order. External links open in a new tab and are never "current".
const MENU_LINKS = [
  { href: '/portfolio', label: 'WRKS' },
  { href: '/experience', label: 'XPRNC' },
  { href: '/sndbx', label: 'SNDBX' },
  { href: '/photography', label: 'PHTGRPHY' },
  { href: 'https://medium.com/@tobilobaodu', label: 'NTPD', external: true },
  // Was /cntct, which has no matching page and 404'd site-wide.
  { href: '/contact', label: 'CNTCT' },
]

// The nav stays put until the page has scrolled past this, so it never slides
// away while it still overlaps the top of the page.
const HIDE_AFTER = 150
// Movement smaller than this is ignored, so the tail of a Lenis ease or a
// trackpad's jitter does not flick the nav back and forth.
const DIRECTION_TOLERANCE = 4

/**
 * Site chrome: the scroll-reactive nav and the slide-in menu.
 *
 * Ported from src/components/layout.js. Changes are mechanical:
 *   - 'use client', because it holds scroll and menu state
 *   - gatsby `Link to=` becomes next/link `href=`
 *   - the `import './layout.css'` is gone; that stylesheet is now imported once
 *     in app/layout.js as globals.css
 *
 * It stays a leaf: pages render it, but the pages themselves remain server
 * components, so their data fetching never ships to the browser.
 */
const Layout = ({ children }) => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0)
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 80
      const opacity = Math.min(scrollY / threshold, 1)
      setScrollOpacity(opacity)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scrolling down hides the nav, scrolling up brings it back. Runs on the
  // shared ticker rather than a scroll listener so it reads the offset after
  // Lenis has written it for the frame. A page too short to scroll never gets
  // past HIDE_AFTER, so its nav simply never hides.
  useEffect(() => {
    let lastY = window.scrollY
    let current = false

    return subscribe(() => {
      const y = window.scrollY
      const delta = y - lastY
      // lastY only advances once the tolerance is crossed, so a slow scroll
      // still accumulates into a direction instead of being dropped frame by
      // frame.
      if (Math.abs(delta) < DIRECTION_TOLERANCE) return
      lastY = y

      const next = delta > 0 && y > HIDE_AFTER
      if (next === current) return
      current = next
      setNavHidden(next)
    })
  }, [])

  // Escape closes the menu, matching the click-outside affordance.
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <>
      <nav
        // Never hidden while the menu is open: the close button lives in it.
        className={`navigation ${navHidden && !menuOpen ? 'is-hidden' : ''}`}
        style={{
          background:
            scrollOpacity > 0
              ? `rgba(255, 255, 255, ${0.05 * scrollOpacity})`
              : 'transparent',
          backdropFilter:
            scrollOpacity > 0 ? `blur(${2.5 * scrollOpacity}px)` : 'none',
        }}
      >
        <Link href="/" className="logo">
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
          type="button"
          className={`menu-icon ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
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
          <button
            type="button"
            className="menu-blur-overlay"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="menu-panel" id="primary-menu">
            <nav className="menu-nav" aria-label="Primary">
              {MENU_LINKS.map(({ href, label, external }) =>
                external ? (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="menu-link" onClick={() => setMenuOpen(false)}>{label}</a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className="menu-link"
                    aria-current={pathname === href ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </>
      )}

      <main>{children}</main>
    </>
  )
}

export default Layout
