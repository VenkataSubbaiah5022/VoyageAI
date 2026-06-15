import { Link } from 'react-router-dom'

const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDwekesdTcJZgk_atYIu9jil6PhwdPPFDTvSHikOXNCFL1OBsOanGyDvaHCqlJwTgIoNhKlEufuNJCngBJbfWIOk44AtvxaN5xDSXFCMtMHLG3ZfqAAYlQl2eoBij8BBI89ws-bIeCUJ39nJs6YvVGAO1mA5Duom58EkXTjjBlYwQSybBNTxt-yzesaMn6p0W4_P3w_jcl6SBnFYak6WydbI0p-UNQuXh1e7ZBfiwo6zysoxvGRbDimdmEBJ5M8ZT3GpAxj3YRD1p0P'

export default function ShareNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[var(--spacing-container-max)] items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-headline-md text-title-lg font-bold tracking-tight text-primary"
          >
            VoyageAI
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/dashboard"
              className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <span className="border-b-2 border-primary pb-1 font-label-md text-label-md font-bold text-primary">
              Trips
            </span>
            <Link
              to="/"
              className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              Explore
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary transition-all duration-200 hover:bg-primary-container active:scale-90 md:flex"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              add
            </span>
            Create Trip
          </Link>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-surface-container-high">
            <img src={PROFILE_IMAGE} alt="User profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}
