const OpenAI = require('openai')
const env = require('../../config/env')

let client = null

function getOpenAIClient() {
  if (!client) {
    client = new OpenAI({ apiKey: env.openaiApiKey })
  }
  return client
}

async function generateJsonWithOpenAI({ prompt, imageBase64 = null, imageMimeType = null }) {
  const openai = getOpenAIClient()

  const userContent = imageBase64
    ? [
        { type: 'text', text: prompt },
        {
          type: 'image_url',
          image_url: {
            url: `data:${imageMimeType};base64,${imageBase64}`,
          },
        },
      ]
    : prompt

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a travel document analyst. Always respond with valid JSON only, no markdown.',
      },
      { role: 'user', content: userContent },
    ],
  })

  return response.choices[0]?.message?.content || ''
}

module.exports = { generateJsonWithOpenAI }
