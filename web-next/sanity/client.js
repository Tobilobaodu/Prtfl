import { createClient } from '@sanity/client'

/**
 * Read-only Sanity client for server-side data fetching.
 *
 * This runs only in server components and route handlers, never in the
 * browser, so the token is never shipped to the client. Do not import this
 * from a file carrying 'use client'.
 *
 * `perspective: 'drafts'` matches netlify/functions/get-case-study.js. The
 * dataset is public, so any *published* caseStudy body can be read by an
 * anonymous API caller regardless of the password gate — keeping locked bodies
 * unpublished is what actually hides them, and reading them back needs this
 * perspective plus the token.
 */
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'drafts',
  token: process.env.SANITY_READ_TOKEN,
})

/**
 * Client without the token, for anything that must only ever see published,
 * publicly-readable content. Using this for the public pages means a leak of
 * gated content cannot happen by accident — the credential simply isn't there.
 */
export const publicClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})
