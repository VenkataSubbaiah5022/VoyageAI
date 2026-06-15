import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { dashboardApi } from '../services/api'
import { DEMO_TRIPS, DEMO_UPLOADS, formatDateRange } from '../data/dashboardDemo'
import DashboardNavbar from '../components/dashboard/DashboardNavbar'
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
  const [trips, setTrips] = useState(DEMO_TRIPS)
  const [uploads, setUploads] = useState(DEMO_UPLOADS)

  useEffect(() => {
    dashboardApi
      .getDashboard()
      .then(({ data }) => {
        if (data.itineraries?.length) {
          setTrips(data.itineraries.map(mapItinerary))
        }
        if (data.uploads?.length) {
          setUploads(data.uploads.map(mapUpload))
        }
      })
      .catch(() => {
        // Keep Stitch demo data when API unavailable or empty
      })
  }, [])

  return (
    <div className="min-h-svh bg-surface font-body-md text-body-md">
      <DashboardNavbar />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <DashboardHero firstName={user?.firstName} />
        <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] lg:grid-cols-12">
          <TripsSection trips={trips} />
          <RecentUploads uploads={uploads} />
        </div>
      </main>
      <DashboardFooter />
    </div>
  )
}
