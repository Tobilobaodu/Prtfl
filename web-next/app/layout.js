import './globals.css'
import SmoothScroll from '../components/SmoothScroll'
import { SITE_URL } from '../lib/site'

/**
 * Replaces the Gatsby `Seo` component and the eleven `export const Head`
 * blocks. Per-page values are merged over these by exporting `metadata` (or
 * `generateMetadata`) from each page.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tobiloba Odu - Experienced Product Designer Portfolio',
    template: '%s | Tobiloba Odu',
  },
  description:
    'Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.',
  authors: [{ name: 'Tobiloba Odu' }],
  openGraph: {
    siteName: 'Tobiloba Odu',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tobilobaodu',
    images: ['/og-image.png'],
  },
}

/**
 * Ported from gatsby-ssr.js `onRenderBody`. Must run before first paint: on a
 * repeat visit within the same session it marks <html> so CSS hides the intro
 * loader before it can flash. Running this after hydration would be too late —
 * the flash is exactly what it exists to prevent.
 *
 * Keep the storage key in sync with LOADER_SESSION_KEY in PageLoader.
 *
 * This is the mismatch `suppressHydrationWarning` below exists for. The server
 * cannot know about sessionStorage, so it emits a bare <html>; this script adds
 * the class before React arrives. That divergence is the design, not a bug.
 */
const LOADER_SKIP_SCRIPT = `
try {
  if (window.sessionStorage.getItem('loader_shown') === 'true') {
    document.documentElement.classList.add('loader-skip');
  }
} catch (e) {}
`

/**
 * `suppressHydrationWarning` on <html> is scoped to that one element and one
 * level deep: it covers <html>'s own attributes and nothing inside <body>, so
 * genuine mismatches elsewhere in the tree still surface.
 *
 * Without it React treats the class LOADER_SKIP_SCRIPT added as a hydration
 * error and recovers by client-rendering from the nearest boundary — throwing
 * away the very DOM the script corrected. The console warning is not the
 * problem; that recovery is.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SKIP_SCRIPT }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
