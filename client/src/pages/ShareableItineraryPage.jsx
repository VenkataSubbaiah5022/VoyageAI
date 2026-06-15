import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SHARE_DEMO } from '../data/shareDemo'
import { shareApi } from '../services/api'
import ShareNavbar from '../components/share/ShareNavbar'
import TripHero from '../components/share/TripHero'
import ItineraryTimeline from '../components/share/ItineraryTimeline'
import TripSidebar from '../components/share/TripSidebar'
import ShareFooter from '../components/share/ShareFooter'

export default function ShareableItineraryPage() {
  const { shareId } = useParams()
  const [trip, setTrip] = useState(SHARE_DEMO)
  const [loading, setLoading] = useState(shareId !== 'demo')

  useEffect(() => {
    if (shareId === 'demo') return

    shareApi
      .getShared(shareId)
      .then(({ data }) => setTrip(data.itinerary))
      .catch(() => setTrip(SHARE_DEMO))
      .finally(() => setLoading(false))
  }, [shareId])

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="font-label-md text-on-surface-variant">Loading itinerary...</p>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background font-body-md text-body-md text-on-background">
      <ShareNavbar />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-8 md:px-[var(--spacing-margin-desktop)]">
        <TripHero trip={trip} />

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-primary">Daily Itinerary</h2>
            <div className="h-6 w-px bg-outline-variant" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              {trip.stopsCount} Stops • {trip.activitiesCount} Activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            {['print', 'picture_as_pdf', 'settings'].map((icon) => (
              <button
                key={icon}
                type="button"
                title={icon}
                className="rounded-lg p-2 text-outline transition-all hover:bg-surface-container"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ItineraryTimeline days={trip.days} />
          </div>
          <TripSidebar trip={trip} />
        </div>
      </main>
      <ShareFooter />
    </div>
  )
}
