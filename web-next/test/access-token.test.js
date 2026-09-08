import test from 'node:test'
import assert from 'node:assert'
import crypto from 'node:crypto'

const GOOD_SECRET = 'test-secret-that-is-long-enough-32chars'
process.env.CASE_STUDY_SECRET = GOOD_SECRET

import { issueToken, verifyToken } from '../lib/access-token.js'

/**
 * PORTING NOTE: the CommonJS original busted require.cache to reload the module
 * whenever it changed CASE_STUDY_SECRET. That was never necessary — getSecret()
 * reads process.env on every call rather than capturing it at module load — and
 * it has no clean ESM equivalent. Dropping it tests exactly the same behaviour
 * with less machinery.
 */

test('a freshly issued token verifies for its own slug', () => {
  const token = issueToken('my-project')
  assert.ok(token)
  assert.strictEqual(verifyToken(token, 'my-project'), true)
})

test('a token does not unlock a different slug', () => {
  const token = issueToken('project-a')
  assert.strictEqual(verifyToken(token, 'project-b'), false)
})

test('a tampered payload is rejected', () => {
  const token = issueToken('my-project')
  const [payload, signature] = token.split('.')
  const tampered = Buffer.from(
    JSON.stringify({ slug: 'my-project', exp: 9999999999 })
  ).toString('base64url')
  assert.notStrictEqual(tampered, payload)
  assert.strictEqual(verifyToken(`${tampered}.${signature}`, 'my-project'), false)
})

test('a token signed with a different secret is rejected', () => {
  const token = issueToken('my-project')

  process.env.CASE_STUDY_SECRET = 'a-completely-different-secret-value-32'
  try {
    assert.strictEqual(verifyToken(token, 'my-project'), false)
  } finally {
    process.env.CASE_STUDY_SECRET = GOOD_SECRET
  }
})

test('an expired token is rejected', () => {
  const payload = Buffer.from(
    JSON.stringify({
      slug: 'my-project',
      exp: Math.floor(Date.now() / 1000) - 10,
    })
  ).toString('base64url')
  const signature = crypto
    .createHmac('sha256', process.env.CASE_STUDY_SECRET)
    .update(payload)
    .digest('base64url')

  assert.strictEqual(verifyToken(`${payload}.${signature}`, 'my-project'), false)
})

test('malformed input is rejected rather than throwing', () => {
  for (const bad of [undefined, null, '', 'no-dot', 'a.b.c', 42, {}]) {
    assert.strictEqual(verifyToken(bad, 'my-project'), false)
  }
})

test('no token is issued when the secret is missing', () => {
  delete process.env.CASE_STUDY_SECRET
  try {
    assert.strictEqual(issueToken('my-project'), null)
    assert.strictEqual(verifyToken('anything', 'my-project'), false)
  } finally {
    process.env.CASE_STUDY_SECRET = GOOD_SECRET
  }
})
