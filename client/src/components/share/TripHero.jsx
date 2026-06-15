import { downloadTripCalendar } from '../../utils/calendar'

export default function TripHero({ trip }) {
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: trip.destination, url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  const handleCalendar = () => {
    downloadTripCalendar(trip)
  }

  return (
    <section className="relative mb-12 h-[400px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[500px]">
      <img src={trip.heroImage} alt={trip.destination} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 flex w-full flex-col justify-between gap-6 p-8 md:flex-row md:items-end md:p-12">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-secondary-container px-3 py-1 font-label-sm text-label-sm text-on-secondary-container">
              {trip.tag}
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-white/80">
              {trip.subtitle}
            </span>
          </div>
          <h1 className="mb-2 font-headline-md text-4xl text-white md:text-5xl">{trip.destination}</h1>
          <p className="font-body-lg text-body-lg text-white/90">{trip.dateRange}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-label-md text-label-md text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              share
            </span>
            Share Trip
          </button>
          <button
            type="button"
            onClick={handleCalendar}
            className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-label-md text-label-md text-white shadow-lg transition-all hover:brightness-110"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              calendar_add_on
            </span>
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  )
}
