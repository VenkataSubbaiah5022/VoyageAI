function formatIcsDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

function escapeIcs(text) {
  return String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

function parseDateRange(dateRange) {
  if (!dateRange) return null
  const match = dateRange.match(
    /([A-Za-z]+)\s+(\d{1,2})\s*[—–-]\s*([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})?/,
  )
  if (!match) return null

  const [, startMonth, startDay, endMonth, endDay, year] = match
  const y = year || String(new Date().getFullYear())
  const start = new Date(`${startMonth} ${startDay}, ${y}`)
  const end = new Date(`${endMonth} ${endDay}, ${y}`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  return { start, end }
}

export function downloadTripCalendar(trip) {
  let start = trip.startDate ? new Date(trip.startDate) : null
  let end = trip.endDate ? new Date(trip.endDate) : null

  if (!start || !end) {
    const parsed = parseDateRange(trip.dateRange)
    if (parsed) {
      start = parsed.start
      end = parsed.end
    }
  }

  if (!start || !end) {
    start = new Date()
    end = new Date(start)
    end.setDate(end.getDate() + 7)
  }

  end.setHours(23, 59, 59)

  const title = trip.title || trip.destination || 'VoyageAI Trip'
  const description = [
    trip.subtitle,
    trip.stopsCount ? `${trip.stopsCount} stops` : null,
    trip.activitiesCount ? `${trip.activitiesCount} activities` : null,
    window.location.href,
  ]
    .filter(Boolean)
    .join(' • ')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VoyageAI//Trip Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${trip.shareId || 'trip'}-${Date.now()}@voyageai.app`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(trip.destination)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${title.replace(/[^a-z0-9-_]+/gi, '-').toLowerCase() || 'trip'}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
