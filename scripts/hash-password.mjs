#!/usr/bin/env node
/**
 * Turns a plaintext case study password into a scrypt hash for Sanity.
 *
 *   npm run hash-password "my secret password"
 *
 * Paste the printed `scrypt$…` value into the project's "Access Password"
 * field in the Studio. Plaintext values still work, but hashed ones mean a
 * leak of the dataset does not leak usable passwords.
 *
 * .mjs, and importing across into web-next/, for one reason each:
 *
 *   - The hashing now lives in web-next/lib/password.js. The old copy under
 *     netlify/lib/ was deleted with the rest of the Netlify config, and having
 *     two implementations of the stored-password format is exactly how a
 *     hashing script drifts from the verifier that has to read its output.
 *   - That module is ESM and the repo root has no "type": "module", so a .js
 *     file here would be parsed as CommonJS and `import` would be a syntax
 *     error.
 *
 * It imports nothing but node:crypto transitively, so this runs from the repo
 * root without web-next/node_modules being installed.
 */

import { hashPassword } from '../web-next/lib/password.js'

const password = process.argv[2]

if (!password) {
  console.error('Usage: npm run hash-password "<password>"')
  process.exit(1)
}

console.log(hashPassword(password))
