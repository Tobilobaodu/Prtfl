#!/usr/bin/env node
/**
 * Turns a plaintext case study password into a scrypt hash for Sanity.
 *
 *   node scripts/hash-password.js "my secret password"
 *
 * Paste the printed `scrypt$…` value into the project's "Access Password"
 * field in the Studio. Plaintext values still work, but hashed ones mean a
 * leak of the dataset does not leak usable passwords.
 */

const { hashPassword } = require('../netlify/lib/password')

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.js "<password>"')
  process.exit(1)
}

console.log(hashPassword(password))
