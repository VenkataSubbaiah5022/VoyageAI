const geocodeCache = new Map()

async function geocodeDestination(destination) {
  const key = destination.trim().toLowerCase()
  if (geocodeCache.has(key)) {
    return geocodeCache.get(key)
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`
  const response = await fetch(url, {
    headers: { 'User-Agent': 'VoyageAI/1.0 (travel-itinerary-app)' },
  })

  if (!response.ok) {
    return null
  }

  const results = await response.json()
  if (!results?.length) {
    return null
  }

  const coords = {
    lat: Number(results[0].lat),
    lon: Number(results[0].lon),
  }

  geocodeCache.set(key, coords)
  return coords
}

function buildStaticMapUrl({ lat, lon, destination }) {
  const zoom = 11
  const size = '600x300'
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${size}&markers=${lat},${lon},red-pushpin`
}

async function buildMapImageUrl(destination) {
  if (!destination) {
    return null
  }

  try {
    const coords = await geocodeDestination(destination)
    if (!coords) {
      return null
    }
    return buildStaticMapUrl({ ...coords, destination })
  } catch {
    return null
  }
}

module.exports = { buildMapImageUrl, geocodeDestination }
