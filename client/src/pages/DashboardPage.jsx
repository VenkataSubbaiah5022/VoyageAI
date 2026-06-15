import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { dashboardApi } from '../services/api'
import { DEMO_TRIP, formatDateRange } from '../data/dashboardDemo'
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

        if (upcoming.length) {
          setTrips(upcoming.map(mapItinerary))
          setTipDestination(upcoming[0].destination)
        } else {
          setTrips([])
          setTipDestination(null)
        }

        setPastTrips(past.map(mapItinerary))
        setUploads(uploadList.map(mapUpload))
      })
      .catch(() => {
        setTrips([DEMO_TRIP])
        setTipDestination(DEMO_TRIP.destination)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-svh bg-surface font-body-md text-body-md">
      <AppNavbar activeItem="dashboard" />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <DashboardHero firstName={user?.firstName} />
        {loading ? (
          <p className="py-12 text-center font-body-md text-on-surface-variant">Loading your trips...</p>
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
