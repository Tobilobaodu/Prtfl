'use client'

import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '../lib/site'

const ArrowOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 2V14H14V8H12.6667V12.6667H3.33333V3.33333H8V2H2ZM9.33333 2V3.33333H11.724L5.52865 9.52865L6.47135 10.4714L12.6667 4.27604V6.66667H14V2H9.33333Z" fill="currentColor"/>
  </svg>
)

// No clipPath: the path already sits inside the 16×16 box, and a fixed clip id
// would be duplicated on every page that renders these links twice.
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10.6667 0.666992H1.33337V11.3337H2.66671V2.00033H10.6667V0.666992ZM14 3.33366H4.00004V15.3337H14V3.33366ZM12.6667 14.0003H5.33337V4.66699H12.6667V14.0003Z" fill="currentColor"/>
  </svg>
)

const LINKS = [
  { href: 'https://www.behance.net/tobilobaodu', label: 'Behance' },
  { href: 'https://dribbble.com/tobilobaodu', label: 'Dribbble' },
  { href: 'https://github.com/Tobilobaodu', label: 'Github' },
]

/**
 * Email (copies CONTACT_EMAIL) plus the external profiles. One component so the
 * home page, case studies and every other page footer show the same links and
 * copy the same address the "Get in touch" panel does — they used to copy
 * three different ones.
 *
 * Layout comes from the caller's `.social-links` rules; this only renders the
 * row.
 */
const SocialLinks = ({ className = 'social-links' }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL).then(
      () => setCopied(true),
      () => { window.location.href = `mailto:${CONTACT_EMAIL}` }
    )
  }

  return (
    <div className={className}>
      <button type="button" className="social-link email-copy-btn" onClick={copyEmail}>
        <span aria-live="polite">{copied ? 'Copied!' : 'Email'}</span>
        <CopyIcon />
      </button>
      {LINKS.map(({ href, label }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
          <span>{label}</span>
          <ArrowOutIcon />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
