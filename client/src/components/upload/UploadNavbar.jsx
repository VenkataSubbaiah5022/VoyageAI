import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCqZYyC6--CbKYP2WPNhyfvtHYyJX2BZC_0z3R--89fsG_O0fSDmuYmBk8dI-GLa77lt6CWUe81iLkJQGuLyqELt_5GwfLmHOoWCprac63ll6a2LNeN23W0flWaqUV0cZxfDXeJS5fdUNOstFPYs3HvuhOls1FfIoOd3LCjDjW5JM50XDXJIog5dtvuK9INCNAq4ahyXa7vqxInqV2Cc2uq4BRoCDX63oHfI4UOuBvv6ScR14qy88184-R2jlsoGp42bV62592nxT-n'

export default function UploadNavbar() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-surface/80 shadow-sm backdrop-blur-md">
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
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <a
            href="/dashboard#trips"
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
          <Link
            to="/upload"
            className="hidden rounded-lg bg-primary px-6 py-2 font-label-md text-label-md font-bold text-on-primary transition-all duration-200 hover:scale-95 active:scale-90 md:block"
          >
            Create Trip
          </Link>
          <button
            type="button"
            onClick={logout}
            className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-outline-variant"
            title="Sign out"
          >
            <img src={PROFILE_IMAGE} alt="User profile" className="h-full w-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  )
}
