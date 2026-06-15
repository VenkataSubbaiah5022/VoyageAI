const asyncHandler = require('../utils/asyncHandler')
const Itinerary = require('../models/Itinerary')

const inferCategory = (destination = '') => {
  const d = destination.toLowerCase()
  if (/coast|beach|amalfi|bali|santorini|maldives/.test(d)) return 'beach'
  if (/kyoto|rome|paris|culture|museum/.test(d)) return 'culture'
  if (/iceland|adventure|ring road|hike/.test(d)) return 'adventure'
  if (/dubai|luxury|resort|spa/.test(d)) return 'relaxation'
  return 'adventure'
}

const mapDestination = (item, index) => ({
  id: item._id?.toString() || item.shareId,
  size: index === 0 ? 'large' : 'small',
  category: item.exploreCategory || inferCategory(item.destination),
  tag: item.tag?.replace('AI ', '') || 'Featured',
  tagBg: index % 2 === 0 ? 'bg-tertiary-fixed' : 'bg-secondary-fixed',
  tagColor: index % 2 === 0 ? 'text-on-tertiary-fixed-variant' : 'text-on-secondary-fixed-variant',
  rating: (4.7 + (index % 3) * 0.1).toFixed(1),
  title: item.title || item.destination,
  description:
    item.subtitle ||
    `AI-planned journey to ${item.destination}. ${item.stopsCount || 0} stops curated for you.`,
  image: item.heroImageUrl || item.imageUrl,
  shareId: item.shareId,
  buttonStyle: index === 0 ? 'primary' : 'outline',
})

const FALLBACK = [
  {
    id: 'demo',
    size: 'large',
    category: 'beach',
    tag: 'Beach',
    tagBg: 'bg-tertiary-fixed',
    tagColor: 'text-on-tertiary-fixed-variant',
    rating: '4.9',
    title: 'Amalfi Coast, Italy',
    destination: 'Amalfi Coast, Italy',
    description:
      'Explore the dramatic coastline, lemon groves, and cliffside villages of Southern Italy with a fully AI-curated itinerary.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9kkhR2wMmUPiyqUtJcZb4xkFQcj4lzT3Oh4As4u5IbU9-BuMdLrUBYZftK97AxqLACaa3M6jr2R8neAz4ekEyfHz3C12pDmfMAddebp6RCoa7N2iCG_bYzghcybUOmsivzxe8zLAa3XqH3wpDUUO9dsa6az5Efb8nc5KI1mBVHZqfLUrjpCmS7I55Mi0DiY8nxF6LxaRmGWFF41nvssuEJ72H5AyjafVN2VCPR8dFVqqkEIFpsfP1F3anIV98rBT3yE9vi-2v8Eu',
    shareId: 'demo',
    buttonStyle: 'primary',
  },
]

const getExploreDestinations = asyncHandler(async (_req, res) => {
  const itineraries = await Itinerary.find({ shareId: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean()

  const destinations =
    itineraries.length > 0 ? itineraries.map(mapDestination) : FALLBACK

  res.json({ success: true, data: { destinations } })
})

module.exports = { getExploreDestinations }
