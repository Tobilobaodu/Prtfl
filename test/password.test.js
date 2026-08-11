const test = require('node:test')
const assert = require('node:assert')

const { hashPassword, verifyPassword } = require('../netlify/lib/password')

test('a scrypt hash verifies against its original password', () => {
  const stored = hashPassword('correct horse battery staple')
  assert.ok(stored.startsWith('scrypt$'))
  assert.strictEqual(verifyPassword('correct horse battery staple', stored), true)
})

test('a scrypt hash rejects the wrong password', () => {
  const stored = hashPassword('correct horse battery staple')
  assert.strictEqual(verifyPassword('wrong password', stored), false)
})

test('hashing the same password twice gives different values', () => {
  // Distinct salts, so identical passwords are not identifiable in the dataset.
  assert.notStrictEqual(hashPassword('same'), hashPassword('same'))
})

test('legacy plaintext values still verify during migration', () => {
  assert.strictEqual(verifyPassword('letmein', 'letmein'), true)
  assert.strictEqual(verifyPassword('letmein', 'something-else'), false)
})

test('empty and non-string inputs are rejected', () => {
  const stored = hashPassword('secret')
  for (const bad of [undefined, null, '', 42, {}]) {
    assert.strictEqual(verifyPassword(bad, stored), false)
  }
  for (const bad of [undefined, null, '', 42, {}]) {
    assert.strictEqual(verifyPassword('secret', bad), false)
  }
})

test('a malformed scrypt value is rejected rather than throwing', () => {
  assert.strictEqual(verifyPassword('secret', 'scrypt$'), false)
  assert.strictEqual(verifyPassword('secret', 'scrypt$onlysalt'), false)
})
