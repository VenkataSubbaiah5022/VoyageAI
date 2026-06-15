import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB8gWVjoxuAVG75GDujXrgTnGftAVtubq5FrK4i_0Mm-bgWpFN0adcmqKlIVXW6ooFqR2SNn2r5B3L5-iv6npWe6c3UkYmcQVQiDrHO4DzmtiunX2rC2nlBdBNvHd45ZmKC9rs0NDgotbtg_2u8YyssH6KwvV70b9AObNE15nTAA_vCx9XRk6co8CGG13iruFXjIc0WBqjjtlnNOprXwTGgKCl4xblvYTGUQLeiuo7jkGzRqEuFl4yjqIjSsEndW5IAHkzXK-0pT0aS'

export default function DashboardNavbar() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[var(--spacing-container-max)] items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        <Link
          to="/dashboard"
          className="font-headline-md text-title-lg font-bold tracking-tight text-primary"
        >
          VoyageAI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/dashboard"
            className="border-b-2 border-primary pb-1 font-label-md text-label-md font-bold text-primary"
          >
            Dashboard
          </Link>
          <a
            href="#trips"
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Trips
          </a>
          <Link
            to="/"
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Explore
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-on-primary transition-all duration-200 hover:bg-primary-container active:scale-90 lg:flex"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              add
            </span>
            Create Trip
          </button>
          <button
            type="button"
            onClick={logout}
            className="h-10 w-10 overflow-hidden rounded-full border-2 border-outline-variant transition-all hover:bg-surface-container-low"
            title="Sign out"
          >
            <img src={PROFILE_IMAGE} alt="User profile" className="h-full w-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  )
}
