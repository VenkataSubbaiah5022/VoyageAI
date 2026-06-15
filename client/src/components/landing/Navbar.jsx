const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7j_zeteQ51AbQZY13WwvZ7OlhgyxDZaYZrVJgTsOAa16clgFq279hmiRxCujGW40KJbtNbAyHmS_4MwnIuT5Lobi4T_JVrXV5xmuGiTBBv3G-od5yMZOh9GXG_IO5xQkdbFE-uwlpASqVBU86n4h7tSTIIhaORvRpaKjTefdcyJUmDfslkaErH653DPPMReQgZnUus83Qr_s6zc2FlhJWTUJnsvyE-SKAKXZbEngObl3nXJQkAPXx_kh0SVGA4cdni4530cpByhG'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[var(--spacing-container-max)] items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        <div className="font-headline-md text-title-lg font-bold tracking-tight text-primary">
          VoyageAI
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Trips
          </a>
          <a
            href="#"
            className="border-b-2 border-primary pb-1 font-label-md text-label-md font-bold text-primary"
          >
            Explore
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary transition-transform duration-200 active:scale-90 md:flex"
          >
            Create Trip
          </button>
          <img
            src={PROFILE_IMAGE}
            alt="User profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      </nav>
    </header>
  )
}
