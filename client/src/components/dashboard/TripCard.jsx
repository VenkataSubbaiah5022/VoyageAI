export default function TripCard({ trip }) {
  return (
    <div className="group elevation-1 cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all hover:elevation-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {trip.tag && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 font-label-sm text-label-sm text-primary shadow-sm backdrop-blur-md">
              {trip.tag}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-title-lg text-title-lg text-primary">{trip.title}</h3>
            <p className="font-label-md text-label-md text-on-surface-variant">{trip.destination}</p>
          </div>
          <span className="material-symbols-outlined text-secondary" aria-hidden="true">
            {trip.transportIcon}
          </span>
        </div>
        <div className="flex items-center gap-4 font-label-sm text-label-sm text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              calendar_today
            </span>
            {trip.dateLabel}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              group
            </span>
            {trip.travelersLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
