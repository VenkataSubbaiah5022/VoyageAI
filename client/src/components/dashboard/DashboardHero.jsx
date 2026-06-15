export default function DashboardHero({ firstName }) {
  const name = firstName || 'Traveler'

  return (
    <section className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="space-y-2">
        <h1 className="font-display-lg text-display-lg tracking-tight text-primary">
          Welcome back, {name}.
        </h1>
        <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          Your AI-curated journeys are ready for exploration. Where will you go next?
        </p>
      </div>
      <button
        type="button"
        className="flex w-fit items-center gap-3 rounded-xl bg-secondary-container px-8 py-4 font-headline-md text-headline-md text-on-secondary-container shadow-lg transition-all hover:brightness-110"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          map
        </span>
        Plan New Trip
      </button>
    </section>
  )
}
