import test from 'node:test'
import assert from 'node:assert'
import { registerHooks } from 'node:module'

process.env.CASE_STUDY_SECRET = 'test-secret-that-is-long-enough-32chars'

// Route handlers import without extensions ('../../../sanity/client'), which
// Next's bundler resolves and plain Node does not. Retry those with '.js'.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.')) throw error
      return nextResolve(`${specifier}.js`, context)
    }
  },
})

const { issueToken } = await import('../lib/access-token.js')
const { client } = await import('../sanity/client.js')
const { POST } = await import('../app/api/get-case-study/route.js')

// The route reads the body through the shared client; stub it so the tests
// never reach Sanity.
client.fetch = async () => ({ components: [] })

// Each test uses its own address, because the limiter's counters are module
// state that persists across tests in this file.
const call = (ip, slug, token) =>
  POST(
    new Request('http://localhost/api/get-case-study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-real-ip': ip },
      body: JSON.stringify({ slug, token }),
    })
  ).then((res) => res.status)

test('a reader with a valid token is not locked out by repeat page views', async () => {
  const token = issueToken('locked-project')
  const statuses = []
  for (let i = 0; i < 20; i++) statuses.push(await call('10.0.0.1', 'locked-project', token))
  // This used to turn into 429 on the 9th view, which the page answered by
  // reopening the password gate.
  assert.deepStrictEqual(statuses, Array(20).fill(200))
})

test('bad tokens are still limited to 8 attempts', async () => {
  const statuses = []
  for (let i = 0; i < 10; i++) statuses.push(await call('10.0.0.2', 'locked-project', 'bogus.token'))
  assert.deepStrictEqual(statuses, [...Array(8).fill(401), 429, 429])
})

test('spent bad-token attempts do not block a valid token', async () => {
  for (let i = 0; i < 10; i++) await call('10.0.0.3', 'locked-project', 'bogus.token')
  assert.strictEqual(await call('10.0.0.3', 'locked-project', issueToken('locked-project')), 200)
})
