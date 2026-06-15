const crypto = require('crypto')
const asyncHandler = require('../utils/asyncHandler')
const Itinerary = require('../models/Itinerary')

const DEFAULT_HERO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9kkhR2wMmUPiyqUtJcZb4xkFQcj4lzT3Oh4As4u5IbU9-BuMdLrUBYZftK97AxqLACaa3M6jr2R8neAz4ekEyfHz3C12pDmfMAddebp6RCoa7N2iCG_bYzghcybUOmsivzxe8zLAa3XqH3wpDUUO9dsa6az5Efb8nc5KI1mBVHZqfLUrjpCmS7I55Mi0DiY8nxF6LxaRmGWFF41nvssuEJ72H5AyjafVN2VCPR8dFVqqkEIFpsfP1F3anIV98rBT3yE9vi-2v8Eu'

const buildDaysFromExtracted = (items) => {
  const activities = items.map((item, index) => ({
    type: 'standard',
    icon: item.icon || 'event',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed-variant',
    title: item.title,
    time: `${9 + index}:00 AM`,
    description: item.status,
    badge: 'CONFIRMED',
  }))

  return [
    {
      dayNumber: 1,
      title: 'Arrival & Check-in',
      dateLabel: 'Day 1',
      activities,
    },
  ]
}

const generateItinerary = asyncHandler(async (req, res) => {
  const { extractedItems = [] } = req.body

  const shareId = crypto.randomBytes(6).toString('hex')
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 30)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 7)

  const destination = extractedItems.some((item) => /tokyo|kyoto|japan/i.test(item.title))
    ? 'Tokyo & Kyoto, Japan'
    : 'Your Destination'

  const itinerary = await Itinerary.create({
    user: req.user._id,
    title: extractedItems[0]?.title ? `${destination} Trip` : 'New Adventure',
    destination,
    startDate,
    endDate,
    travelersLabel: 'Solo',
    imageUrl: DEFAULT_HERO,
    heroImageUrl: DEFAULT_HERO,
    tag: 'AI GENERATED',
    transportIcon: 'flight_takeoff',
    status: 'upcoming',
    shareId,
    subtitle: '7 Days Planned',
    dateRangeLabel: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    stopsCount: extractedItems.length || 4,
    activitiesCount: extractedItems.length || 4,
    overview: {
      weather: '22°C, Partly Cloudy',
      budget: '¥180,000 Total',
      language: 'Japanese',
      progress: 100,
    },
    packingList: ['Passport', 'Universal adapter', 'Comfortable walking shoes', 'Light jacket'],
    days: buildDaysFromExtracted(extractedItems.length ? extractedItems : []),
  })

  res.status(201).json({ success: true, data: { itinerary } })
})

module.exports = {
  generateItinerary,
}
