# syntax=docker/dockerfile:1

# Node 22.12 is the floor: Sanity v6 and @sanity/client v8 both require it.
# Pinned to a digest-stable minor rather than `22` so a base image refresh
# cannot move Node under the app.
ARG NODE_VERSION=22.12-alpine

# ---------- deps ----------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# ---------- builder ----------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .

# SANITY_READ_TOKEN is needed at BUILD time: pages are prerendered, so the
# content is fetched here, not at request time. Pass it as a build secret so it
# never lands in an image layer.
#   docker build --secret id=sanity_token,env=SANITY_READ_TOKEN .
RUN --mount=type=secret,id=sanity_token,required=false \
    SANITY_READ_TOKEN="$(cat /run/secrets/sanity_token 2>/dev/null || true)" \
    npm run build

# ---------- runner ----------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Never run as root. Alpine's node image ships a `node` user (uid 1000).
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# `output: 'standalone'` traces only the modules actually used into a minimal
# self-contained server.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# THE TWO LINES PEOPLE FORGET. The standalone bundle does NOT include static
# assets or public/. Without these the page loads and every stylesheet, script
# and font 404s — confirmed by testing, not assumed.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Coolify health-checks the first exposed port and holds traffic off a container
# that fails. Its default check is effectively a TCP probe, which goes green the
# instant Node binds — before the server can actually answer, so a broken deploy
# still takes traffic. This asks for a real response instead.
#
# /robots.txt is the target on purpose: it is prerendered at build time, so it
# proves the server is serving without touching Sanity. Pointing a health check
# at a page that fetches upstream turns someone else's outage into your restart
# loop.
#
# No curl or wget in the alpine image, and none is added for this — Node 22 has
# global fetch. start-period covers boot so a slow start is not counted as a
# failure.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# `next start` does NOT work with output: 'standalone' — Next says so on boot.
# The traced server is the entrypoint.
CMD ["node", "server.js"]

# NOTE ON sharp: normally required in the runner for next/image optimisation.
# It is deliberately absent here. next.config.mjs sets images.loader to
# 'custom', so every <Image> renders a Sanity CDN transform URL and Next never
# invokes its own optimiser. Re-add `RUN npm i sharp` if you ever drop the
# custom loader or start serving locally-hosted images through next/image.
