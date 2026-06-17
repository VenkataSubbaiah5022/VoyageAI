const { GoogleGenerativeAI } = require('@google/generative-ai')
const env = require('../../config/env')

let client = null

function getGeminiModel(modelName = 'gemini-2.0-flash') {
  if (!client) {
    client = new GoogleGenerativeAI(env.geminiApiKey)
  }
  return client.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  })
}

async function generateJsonWithGemini({ prompt, filePart = null }) {
  const model = getGeminiModel()
  const parts = filePart ? [filePart, { text: prompt }] : [{ text: prompt }]
  const result = await model.generateContent(parts)
  return result.response.text()
}

module.exports = { generateJsonWithGemini }
