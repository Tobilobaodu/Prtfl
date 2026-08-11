const test = require('node:test')
const assert = require('node:assert')

process.env.CASE_STUDY_SECRET = 'test-secret-that-is-long-enough-32chars'

const { issueToken, verifyToken } = require('../netlify/lib/access-token')

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
  const [, signature] = token.split('.')
  const forged = Buffer.from(
    JSON.stringify({ slug: 'my-project', exp: 9999999999 })
  ).toString('base64url')

  assert.strictEqual(verifyToken(`${forged}.${signature}`, 'my-project'), false)
})

test('a token signed with a different secret is rejected', () => {
  const token = issueToken('my-project')

  process.env.CASE_STUDY_SECRET = 'a-completely-different-secret-value-32'
  delete require.cache[require.resolve('../netlify/lib/access-token')]
  const other = require('../netlify/lib/access-token')

  assert.strictEqual(other.verifyToken(token, 'my-project'), false)

  process.env.CASE_STUDY_SECRET = 'test-secret-that-is-long-enough-32chars'
  delete require.cache[require.resolve('../netlify/lib/access-token')]
})

test('an expired token is rejected', () => {
  const { verifyToken: verify } = require('../netlify/lib/access-token')
  const crypto = require('node:crypto')

  const payload = Buffer.from(
    JSON.stringify({ slug: 'my-project', exp: Math.floor(Date.now() / 1000) - 10 })
  ).toString('base64url')
  const signature = crypto
    .createHmac('sha256', process.env.CASE_STUDY_SECRET)
    .update(payload)
    .digest('base64url')

  assert.strictEqual(verify(`${payload}.${signature}`, 'my-project'), false)
})

test('malformed input is rejected rather than throwing', () => {
  const { verifyToken: verify } = require('../netlify/lib/access-token')
  for (const bad of [undefined, null, '', 'no-dot', 'a.b.c', 42, {}]) {
    assert.strictEqual(verify(bad, 'my-project'), false)
  }
})

test('no token is issued when the secret is missing', () => {
  delete process.env.CASE_STUDY_SECRET
  delete require.cache[require.resolve('../netlify/lib/access-token')]
  const unconfigured = require('../netlify/lib/access-token')

  assert.strictEqual(unconfigured.issueToken('my-project'), null)
  assert.strictEqual(unconfigured.verifyToken('anything', 'my-project'), false)

  process.env.CASE_STUDY_SECRET = 'test-secret-that-is-long-enough-32chars'
  delete require.cache[require.resolve('../netlify/lib/access-token')]
})
