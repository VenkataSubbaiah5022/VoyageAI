import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardApi } from '../services/api'
import { formatDateRange } from '../data/dashboardDemo'
import AppNavbar from '../components/layout/AppNavbar'
import DashboardHero from '../components/dashboard/DashboardHero'
import TripsSection from '../components/dashboard/TripsSection'
import RecentUploads from '../components/dashboard/RecentUploads'
import DashboardFooter from '../components/dashboard/DashboardFooter'

function mapItinerary(item) {
  return {
    id: item._id || item.id,
    title: item.title,
    destination: item.destination,
    imageUrl: item.imageUrl,
    tag: item.tag,
    transportIcon: item.transportIcon || 'flight_takeoff',
    dateLabel: formatDateRange(item.startDate, item.endDate),
    travelersLabel: item.travelersLabel,
    shareId: item.shareId,
  }
}

function mapUpload(item) {
  return {
    id: item._id || item.id,
    fileName: item.fileName,
    tripLabel: item.tripLabel,
    fileSizeLabel: item.fileSizeLabel,
    icon: item.icon || 'description',
    iconBg: item.iconBg || 'bg-primary-fixed',
    iconColor: item.iconColor || 'text-on-primary-fixed',
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [pastTrips, setPastTrips] = useState([])
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tipDestination, setTipDestination] = useState(null)

  useEffect(() => {
    Promise.all([
      dashboardApi.getItineraries('upcoming'),
      dashboardApi.getItineraries('past'),
      dashboardApi.getUploads(),
    ])
      .then(([upcomingRes, pastRes, uploadsRes]) => {
        const upcoming = upcomingRes.data?.itineraries || []
        const past = pastRes.data?.itineraries || []
        const uploadList = uploadsRes.data?.uploads || []

        setTrips(upcoming.map(mapItinerary))
        setPastTrips(past.map(mapItinerary))
        setUploads(uploadList.map(mapUpload))
        setTipDestination(upcoming[0]?.destination || null)
        setError(null)
      })
      .catch((err) => {
        setTrips([])
        setPastTrips([])
        setUploads([])
        setTipDestination(null)
        setError(err?.message || 'Could not load your dashboard')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-svh bg-surface font-body-md text-body-md">
      <AppNavbar activeItem="dashboard" />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <DashboardHero firstName={user?.firstName} />
        {error && (
          <div
            role="alert"
            className="mb-8 rounded-xl border border-error/30 bg-error-container px-4 py-3 font-body-md text-on-error-container"
          >
            {error}
          </div>
        )}
        {loading ? (
          <p className="py-12 text-center font-body-md text-on-surface-variant">Loading your trips...</p>
        ) : trips.length === 0 && pastTrips.length === 0 && !error ? (
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-6 py-12 text-center">
            <p className="font-title-lg text-title-lg text-primary">No trips yet</p>
            <p className="mt-2 font-body-md text-on-surface-variant">
              Upload travel documents to generate your first AI itinerary.
            </p>
            <Link
              to="/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary transition-colors hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                upload_file
              </span>
              Upload documents
            </Link>
            <p className="mt-6 font-body-sm text-body-sm text-on-surface-variant">
              Or preview a{' '}
              <Link to="/share/demo" className="text-primary underline">
                sample itinerary
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] lg:grid-cols-12">
            <TripsSection trips={trips} pastTrips={pastTrips} />
            <RecentUploads uploads={uploads} tipDestination={tipDestination} />
          </div>
        )}
      </main>
      <DashboardFooter />
    </div>
  )
}
