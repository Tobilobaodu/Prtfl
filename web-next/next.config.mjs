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
}

export default nextConfig
