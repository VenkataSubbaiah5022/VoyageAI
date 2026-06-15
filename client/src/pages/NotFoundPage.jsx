import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AppNavbar from '../components/layout/AppNavbar'
import NotFoundFooter, { NotFoundDecorations } from '../components/notfound/NotFoundFooter'

export default function NotFoundPage() {
  const illustrationRef = useRef(null)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01
      if (illustrationRef.current) {
        illustrationRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-on-background">
      <AppNavbar />

      <main className="relative flex flex-grow flex-col items-center justify-center overflow-hidden px-[var(--spacing-margin-mobile)] py-16 md:px-[var(--spacing-margin-desktop)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-10 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-3xl text-center">
          <div ref={illustrationRef} className="mb-12 flex justify-center">
            <div className="paper-plane-animation relative">
              <span
                className="material-symbols-outlined text-[120px] text-primary"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
                aria-hidden="true"
              >
                explore
              </span>
              <div className="absolute -top-4 -right-4 rounded-full bg-secondary p-3 text-on-secondary shadow-lg">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  send
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              404 Error
            </span>
            <h1 className="mb-6 font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Looks like you&apos;re off the map.
            </h1>
            <p className="mx-auto max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              The destination you&apos;re looking for doesn&apos;t exist in our database. Let&apos;s get
              you back on track with your AI-powered journey.
            </p>
          </div>

          <div className="mx-auto mb-10 max-w-md">
            <div
              className={`relative transition-transform duration-200 ${searchFocused ? 'scale-[1.02]' : ''}`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-outline">
                <span className="material-symbols-outlined" aria-hidden="true">
                  search
                </span>
              </div>
              <input
                type="text"
                placeholder="Search destinations, trips, or help..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-4 pr-4 pl-12 font-body-md shadow-sm transition-all outline-none focus:border-on-tertiary-container focus:ring-4 focus:ring-on-tertiary-container/10"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-label-md text-label-md text-on-primary transition-all hover:opacity-90 hover:shadow-lg active:scale-90 sm:w-auto"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                dashboard
              </span>
              Back to Dashboard
            </Link>
            <Link
              to="/explore"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-8 py-4 font-label-md text-label-md text-primary transition-all hover:bg-primary/5 active:scale-90 sm:w-auto"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                explore
              </span>
              Explore Destinations
            </Link>
          </div>
        </div>

        <NotFoundDecorations />
      </main>

      <NotFoundFooter />
    </div>
  )
}
