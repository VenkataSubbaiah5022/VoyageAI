const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { parseJsonFromText } = require('./parseJson')
const { formatRelative } = require('../../controllers/notificationsController')

describe('parseJsonFromText', () => {
  it('parses raw JSON objects', () => {
    const result = parseJsonFromText('{"title":"Trip"}')
    assert.equal(result.title, 'Trip')
  })

  it('parses JSON inside markdown fences', () => {
    const result = parseJsonFromText('```json\n{"items":[]}\n```')
    assert.deepEqual(result.items, [])
  })

  it('throws on empty input', () => {
    assert.throws(() => parseJsonFromText(''), /empty response/)
  })
})

describe('formatRelative', () => {
  it('returns Just now for recent timestamps', () => {
    assert.equal(formatRelative(new Date()), 'Just now')
  })
})
