function parseJsonFromText(text) {
  if (!text) {
    throw new Error('AI returned an empty response')
  }

  const trimmed = text.trim()

  try {
    return JSON.parse(trimmed)
  } catch {
    const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
    if (fenceMatch) {
      return JSON.parse(fenceMatch[1].trim())
    }

    const objectMatch = trimmed.match(/\{[\s\S]*\}/)
    if (objectMatch) {
      return JSON.parse(objectMatch[0])
    }

    const arrayMatch = trimmed.match(/\[[\s\S]*\]/)
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0])
    }
  }

  throw new Error('AI response was not valid JSON')
}

module.exports = { parseJsonFromText }
