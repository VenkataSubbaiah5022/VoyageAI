import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SHARE_DEMO } from '../data/shareDemo'
import { shareApi } from '../services/api'
import AppNavbar from '../components/layout/AppNavbar'
import TripHero from '../components/share/TripHero'
import ItineraryTimeline from '../components/share/ItineraryTimeline'
import TripSidebar from '../components/share/TripSidebar'
import ShareFooter from '../components/share/ShareFooter'

export default function ShareableItineraryPage() {
  const { shareId } = useParams()
  const [trip, setTrip] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (shareId === 'demo') {
      setTrip(SHARE_DEMO)
      setLoading(false)
      return
    }

    shareApi
      .getShared(shareId)
      .then(({ data }) => setTrip(data.itinerary))
      .catch(() => setError('This shared itinerary could not be found.'))
      .finally(() => setLoading(false))
  }, [shareId])

  const handlePrint = () => window.print()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="font-label-md text-on-surface-variant">Loading itinerary...</p>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="min-h-svh bg-background">
        <AppNavbar activeItem="trips" />
        <div className="mx-auto max-w-lg px-6 py-24 text-center">
          <p className="mb-6 font-body-lg text-on-surface-variant">{error}</p>
          <Link to="/dashboard" className="rounded-lg bg-primary px-6 py-3 text-on-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background font-body-md text-body-md text-on-background">
      <AppNavbar activeItem="trips" />
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
            <button
              type="button"
              title="Print itinerary"
              onClick={handlePrint}
              className="rounded-lg p-2 text-outline transition-all hover:bg-surface-container"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                print
              </span>
            </button>
            <button
              type="button"
              title="Save as PDF"
              onClick={handlePrint}
              className="rounded-lg p-2 text-outline transition-all hover:bg-surface-container"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                picture_as_pdf
              </span>
            </button>
            <Link
              to="/dashboard"
              title="Trip settings"
              className="rounded-lg p-2 text-outline transition-all hover:bg-surface-container"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                settings
              </span>
            </Link>
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
