import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getAvatarColor, getUserInitials } from '../../utils/user'

/**
 * @param {'dashboard' | 'trips' | 'explore' | null} activeItem
 */
export default function AppNavbar({ activeItem = null }) {
  const { user, isAuthenticated, logout } = useAuth()
  const avatarColor = getAvatarColor(user?.email || user?.firstName || 'guest')
  const initials = getUserInitials(user)

  const navClass = (item) =>
    `font-label-md text-label-md transition-colors ${
      activeItem === item
        ? 'border-b-2 border-primary pb-1 font-bold text-primary'
        : 'text-on-surface-variant hover:text-primary'
    }`

  const createTripPath = isAuthenticated ? '/upload' : '/auth'

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[var(--spacing-container-max)] items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        <div className="flex items-center gap-8">
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="font-headline-md text-title-lg font-bold tracking-tight text-primary"
          >
            VoyageAI
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/dashboard" className={navClass('dashboard')}>
              Dashboard
            </Link>
            <Link to="/dashboard#trips" className={navClass('trips')}>
              Trips
            </Link>
            <Link to="/explore" className={navClass('explore')}>
              Explore
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={createTripPath}
            className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-container active:scale-90 md:flex"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              add
            </span>
            Create Trip
          </Link>

          {isAuthenticated && (
            <Link
              to="/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant transition-all hover:bg-surface-container-low"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant" aria-hidden="true">
                notifications
              </span>
            </Link>
          )}

          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-outline-variant text-sm font-bold text-on-primary ${avatarColor}`}
              title={`${user.firstName} ${user.lastName} — Profile`}
            >
              {initials}
            </Link>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg border border-outline-variant px-4 py-2 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container-low"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
