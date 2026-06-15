import { Link } from 'react-router-dom'
import DestinationCard from './DestinationCard'

export default function TrendingDestinations({ destinations }) {
  return (
    <section className="mb-24">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Trending Now</h2>
          <p className="font-label-md text-label-md text-outline">
            Most popular AI-planned destinations this week
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 font-label-md text-label-md text-secondary decoration-2 underline-offset-4 hover:underline"
        >
          See all
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>

      {destinations.length > 0 ? (
        <div className="bento-grid">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-outline-variant bg-surface-container-low py-16 text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-outline" aria-hidden="true">
            travel_explore
          </span>
          <p className="font-headline-md text-headline-md text-primary">No destinations match your filters</p>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Try a different category or search term.
          </p>
        </div>
      )}
    </section>
  )
}

export function ExploreHowItWorks() {
  const steps = [
    {
      icon: 'search_check',
      title: '1. Explore',
      description:
        'Browse our AI-generated trending destinations or search for your specific dream location.',
    },
    {
      icon: 'auto_fix_high',
      title: '2. Personalize',
      description:
        'Our AI adjusts the itinerary based on your preferences, budget, and travel style in real-time.',
    },
    {
      icon: 'event_available',
      title: '3. Book & Go',
      description:
        'Secure your flights and stays directly through our integrated platform and start your journey.',
    },
  ]

  return (
    <section className="relative mb-16 overflow-hidden rounded-3xl bg-primary p-12">
      <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-on-tertiary-container/10 blur-3xl" />

      <div className="relative z-10 mx-auto mb-16 max-w-2xl text-center">
        <h2 className="mb-4 font-display-lg text-display-lg text-on-primary">How it works</h2>
        <p className="font-body-lg text-body-lg text-on-primary/80">
          From inspiration to departure, VoyageAI streamlines every step of your travel journey.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="group text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-on-primary-fixed/20 transition-transform duration-300 group-hover:scale-110">
              <span
                className="material-symbols-outlined text-[40px] text-secondary"
                style={{ fontVariationSettings: "'wght' 300" }}
                aria-hidden="true"
              >
                {step.icon}
              </span>
            </div>
            <h4 className="mb-3 font-headline-md text-headline-md text-on-primary">{step.title}</h4>
            <p className="px-4 font-body-md text-body-md text-on-primary/70">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-16 text-center">
        <Link
          to="/upload"
          className="inline-block rounded-xl bg-secondary px-10 py-4 font-headline-md text-headline-md text-on-secondary shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Start Your Trip Planning
        </Link>
      </div>
    </section>
  )
}
