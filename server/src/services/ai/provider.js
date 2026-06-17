const env = require('../../config/env')

function getAiProvider() {
  if (env.geminiApiKey) {
    return 'gemini'
  }
  if (env.openaiApiKey) {
    return 'openai'
  }
  return null
}

function requireAiProvider() {
  const provider = getAiProvider()
  if (!provider) {
    throw new Error(
      'No AI API key configured. Set GEMINI_API_KEY or OPENAI_API_KEY in your .env file.',
    )
  }
  return provider
}

module.exports = { getAiProvider, requireAiProvider }
