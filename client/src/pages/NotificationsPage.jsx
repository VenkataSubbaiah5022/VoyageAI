import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notificationsApi } from '../services/api'
import AppNavbar from '../components/layout/AppNavbar'
import NotificationCard from '../components/notifications/NotificationCard'
import NotificationsFooter from '../components/notifications/NotificationsFooter'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(false)

  const loadNotifications = () => {
    setLoading(true)
    return notificationsApi
      .getNotifications()
      .then(({ data }) => setNotifications(data.notifications || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [])

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'read' } : n)),
    )
    try {
      const { data } = await notificationsApi.markRead({ ids: [id] })
      setNotifications(data.notifications || [])
    } catch {
      loadNotifications()
    }
  }

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: 'read' })))
    try {
      const { data } = await notificationsApi.markRead({ markAll: true })
      setNotifications(data.notifications || [])
    } catch {
      loadNotifications()
    }
  }

  const handleAction = (notification) => {
    markAsRead(notification.id)
    if (notification.link) navigate(notification.link)
  }

  const unreadCount = notifications.filter((n) => n.status === 'new').length

  return (
    <div className="min-h-svh bg-background font-body-md text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <AppNavbar />

      <main className="mx-auto max-w-4xl px-[var(--spacing-margin-mobile)] pt-32 pb-24 md:px-[var(--spacing-margin-desktop)]">
        <header
          className="mb-12 flex flex-col justify-between gap-6 transition-all duration-600 ease-out md:flex-row md:items-end"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div>
            <h1 className="mb-2 font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
              Activity Center
            </h1>
            <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant">
              Stay updated with your latest travel arrangements and AI-powered insights.
              {unreadCount > 0 && ` (${unreadCount} unread)`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-label-md text-label-md text-on-surface transition-colors duration-200 hover:bg-surface-container-low disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                done_all
              </span>
              Mark all as read
            </button>
            <Link
              to="/profile"
              aria-label="Settings"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface transition-colors duration-200 hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                settings
              </span>
            </Link>
          </div>
        </header>

        {loading ? (
          <p className="py-12 text-center text-on-surface-variant">Loading activity...</p>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={markAsRead}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-outline-variant bg-surface-container-low py-16 text-center">
            <span className="material-symbols-outlined mb-3 text-4xl text-outline" aria-hidden="true">
              notifications_none
            </span>
            <p className="font-headline-md text-headline-md text-primary">No activity yet</p>
            <p className="mt-2 font-body-md text-on-surface-variant">
              Upload documents or generate an itinerary to see updates here.
            </p>
          </div>
        )}

        {notifications.length > 0 && unreadCount === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="font-label-sm text-label-sm text-outline">You&apos;re all caught up</p>
          </div>
        )}
      </main>

      <NotificationsFooter />
    </div>
  )
}
