import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pinned explicitly. The Gatsby app one directory up has its own lockfile, and
  // without this Next infers *that* directory as the workspace root — the same
  // class of ambiguous resolution that produced the rxjs and xstate collisions
  // during the Sanity v6 upgrade. Keep the two apps' dependency trees separate.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },

  // Traces the exact dependencies used into a minimal self-contained server,
  // run with `node server.js`. This is what the Docker image ships, and it is
  // why `output: 'export'` is NOT used — a static export would make Route
  // Handlers GET-only, which would break the POST that verifies case study
  // passwords.
  output: 'standalone',

  images: {
    // Every <Image> renders a Sanity CDN transform URL instead of routing
    // through Next's optimiser — the images already live on a CDN that resizes
    // and format-negotiates closer to the viewer than this server can.
    loader: 'custom',
    loaderFile: './utils/sanityImageLoader.js',

    // Still an allowlist for any <Image> given a full remote URL.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'asset.sanity.io' },
    ],
  },

  // Ported from the [[headers]] blocks in netlify.toml, which is being deleted
  // along with the rest of the Netlify config. These were platform
  // configuration, not application code, so nothing carried them over when the
  // site moved to Next — the headers were simply absent on Coolify.
  //
  // Only the security set is ported. The caching rules that sat beside them are
  // deliberately dropped: they addressed Gatsby's output (/page-data/*, /app-*,
  // /component-*, /static/*), none of which exists any more. Next sets
  // immutable caching on its own /_next/static/* hashed assets.
  //
  // The functions' Cache-Control: no-store is NOT here because it already lives
  // in the route handlers themselves — see the jsonResponse helper in
  // app/api/verify-password/route.js — which is a better home for it: it
  // survives a move to any other host.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },

          // Explicitly disabled, not omitted. The legacy XSS auditor is
          // deprecated and its filtering has itself been a source of
          // vulnerabilities; "0" is the current OWASP recommendation.
          { key: 'X-XSS-Protection', value: '0' },

          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
