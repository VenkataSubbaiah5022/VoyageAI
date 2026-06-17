const { parseJsonFromText } = require('./parseJson')
const { requireAiProvider } = require('./provider')
const { generateJsonWithGemini } = require('./geminiClient')
const { generateJsonWithOpenAI } = require('./openaiClient')
const { buildMapImageUrl } = require('../mapImage')

const DEFAULT_HERO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9kkhR2wMmUPiyqUtJcZb4xkFQcj4lzT3Oh4As4u5IbU9-BuMdLrUBYZftK97AxqLACaa3M6jr2R8neAz4ekEyfHz3C12pDmfMAddebp6RCoa7N2iCG_bYzghcybUOmsivzxe8zLAa3XqH3wpDUUO9dsa6az5Efb8nc5KI1mBVHZqfLUrjpCmS7I55Mi0DiY8nxF6LxaRmGWFF41nvssuEJ72H5AyjafVN2VCPR8dFVqqkEIFpsfP1F3anIV98rBT3yE9vi-2v8Eu'

const ITINERARY_PROMPT = `You are an expert travel planner. Create a detailed day-by-day itinerary from the extracted bookings and user context.

Return JSON with this exact shape:
{
  "title": "trip title",
  "destination": "city/region, country",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "travelersLabel": "Solo|Couple|Family|Group",
  "subtitle": "e.g. 5 Days Planned",
  "dateRangeLabel": "human readable date range",
  "imageUrl": "https URL for destination hero image (use a realistic stock-style URL or the default)",
  "heroImageUrl": "same as imageUrl",
  "tag": "AI GENERATED",
  "transportIcon": "flight_takeoff|train|directions_car",
  "stopsCount": number,
  "activitiesCount": number,
  "overview": {
    "weather": "seasonal weather summary for trip dates",
    "budget": "estimated total budget with currency",
    "language": "primary local language",
    "progress": 100
  },
  "packingList": ["item1", "item2", "item3", "item4"],
  "days": [
    {
      "dayNumber": 1,
      "title": "day theme",
      "dateLabel": "Day 1 • Mon, Jan 12",
      "activities": [
        {
          "type": "standard",
          "icon": "flight|hotel|confirmation_number|train|restaurant|event",
          "iconBg": "bg-tertiary-fixed",
          "iconColor": "text-on-tertiary-fixed-variant",
          "title": "activity title",
          "time": "9:00 AM",
          "description": "details",
          "badge": "CONFIRMED|SUGGESTED|OPTIONAL"
        }
      ]
    }
  ]
}

Rules:
- Build multiple days spanning startDate to endDate (minimum 2 days when trip length allows).
- Place confirmed bookings on their actual dates when known; fill gaps with realistic nearby activities.
- Mark extracted bookings as badge CONFIRMED; suggested filler activities as SUGGESTED.
- Use practical times and logical geographic flow.
- activitiesCount should equal total activities across all days.
- stopsCount should reflect distinct locations/venues.`

function buildUserPrompt({ extractedItems, mergedMeta, userPreferences }) {
  const prefs = userPreferences || {}
  const budget = prefs.budget || 'moderate'
  const travelStyle = prefs.travelStyle || 'balanced'
  const dining = prefs.dining || 'mixed'
  const interests = Array.isArray(prefs.interests) ? prefs.interests.join(', ') : 'general sightseeing'

  return `${ITINERARY_PROMPT}

User preferences: budget=${budget}, travelStyle=${travelStyle}, dining=${dining}, interests=${interests}

Extracted trip metadata:
${JSON.stringify(mergedMeta, null, 2)}

Extracted booking items:
${JSON.stringify(extractedItems, null, 2)}`
}

function parseIsoDate(value, fallback) {
  if (!value) return fallback
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? fallback : date
}

function formatDateRangeLabel(startDate, endDate) {
  const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const end = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${start} — ${end}`
}

function countActivities(days) {
  return (days || []).reduce((sum, day) => sum + (day.activities?.length || 0), 0)
}

function normalizeItinerary(raw, { extractedItems, mergedMeta, user, mapImageUrl }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const defaultStart = new Date(today)
  defaultStart.setDate(defaultStart.getDate() + 30)

  const defaultEnd = new Date(defaultStart)
  defaultEnd.setDate(defaultEnd.getDate() + 6)

  const startDate = parseIsoDate(raw?.startDate || mergedMeta?.startDate, defaultStart)
  const endDate = parseIsoDate(raw?.endDate || mergedMeta?.endDate, defaultEnd)

  if (endDate < startDate) {
    endDate.setTime(startDate.getTime())
    endDate.setDate(endDate.getDate() + 3)
  }

  const destination =
    raw?.destination || mergedMeta?.destination || extractedItems[0]?.location || 'Your Destination'

  const days = Array.isArray(raw?.days) && raw.days.length > 0 ? raw.days : null

  const travelersLabel =
    raw?.travelersLabel ||
    (user?.preferences?.travelStyle?.toLowerCase().includes('family')
      ? 'Family'
      : user?.preferences?.travelStyle?.toLowerCase().includes('couple')
        ? 'Couple'
        : 'Solo')

  const hero = raw?.heroImageUrl || raw?.imageUrl || DEFAULT_HERO

  return {
    title: raw?.title || `${destination} Trip`,
    destination,
    startDate,
    endDate,
    travelersLabel,
    imageUrl: raw?.imageUrl || hero,
    heroImageUrl: hero,
    tag: raw?.tag || 'AI GENERATED',
    transportIcon: raw?.transportIcon || 'flight_takeoff',
    status: endDate < today ? 'past' : 'upcoming',
    subtitle: raw?.subtitle || `${Math.max(1, Math.ceil((endDate - startDate) / 86400000) + 1)} Days Planned`,
    dateRangeLabel: raw?.dateRangeLabel || formatDateRangeLabel(startDate, endDate),
    stopsCount: raw?.stopsCount || extractedItems.length || 3,
    activitiesCount: raw?.activitiesCount || countActivities(days) || extractedItems.length || 3,
    overview: {
      weather: raw?.overview?.weather || 'Check forecast before departure',
      budget: raw?.overview?.budget || 'Varies by preferences',
      language: raw?.overview?.language || 'Local language',
      progress: typeof raw?.overview?.progress === 'number' ? raw.overview.progress : 100,
    },
    packingList:
      Array.isArray(raw?.packingList) && raw.packingList.length > 0
        ? raw.packingList
        : ['Passport', 'Travel adapter', 'Comfortable shoes', 'Weather-appropriate clothing'],
    mapImageUrl: raw?.mapImageUrl || mapImageUrl || null,
    days: days || buildFallbackDays(extractedItems, startDate),
  }
}

function buildFallbackDays(extractedItems, startDate) {
  const activities = (extractedItems.length ? extractedItems : [{ title: 'Explore the city', status: 'Free time', icon: 'event' }]).map(
    (item, index) => ({
      type: 'standard',
      icon: item.icon || 'event',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-on-tertiary-fixed-variant',
      title: item.title,
      time: `${9 + index}:00 AM`,
      description: item.status,
      badge: 'CONFIRMED',
    }),
  )

  const dateLabel = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return [
    {
      dayNumber: 1,
      title: 'Arrival & essentials',
      dateLabel: `Day 1 • ${dateLabel}`,
      activities,
    },
  ]
}

async function generateItineraryFromExtractions({ extractedItems, mergedMeta, user }) {
  const provider = requireAiProvider()
  const prompt = buildUserPrompt({ extractedItems, mergedMeta, userPreferences: user?.preferences })

  let responseText
  if (provider === 'gemini') {
    responseText = await generateJsonWithGemini({ prompt })
  } else {
    responseText = await generateJsonWithOpenAI({ prompt })
  }

  const raw = parseJsonFromText(responseText)
  const destination =
    raw?.destination || mergedMeta?.destination || extractedItems[0]?.location || 'Your Destination'
  const mapImageUrl = await buildMapImageUrl(destination)
  return normalizeItinerary(raw, { extractedItems, mergedMeta, user, mapImageUrl })
}

module.exports = {
  generateItineraryFromExtractions,
  DEFAULT_HERO,
}
