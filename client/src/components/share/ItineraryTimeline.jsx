function ActivityCard({ activity }) {
  const isHotel = activity.type === 'hotel'
  const isAi = activity.type === 'ai'

  if (isAi) {
    return (
      <div className="flex items-start gap-5 rounded-xl border border-primary/10 bg-primary-container/5 p-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${activity.iconBg} ${activity.iconColor}`}
        >
          <span className="material-symbols-outlined filled" aria-hidden="true">
            {activity.icon}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-headline-md text-body-lg text-primary">{activity.title}</h4>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{activity.description}</p>
          {activity.cta && (
            <button
              type="button"
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(activity.title)}`,
                  '_blank',
                  'noopener,noreferrer',
                )
              }
              className="mt-3 flex items-center gap-1 font-label-md text-label-md text-secondary transition-all hover:gap-2"
            >
              {activity.cta}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`glass-card flex items-start gap-5 rounded-xl p-5 ${
        isHotel ? 'border-l-4 border-l-secondary-container' : ''
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${activity.iconBg} ${activity.iconColor}`}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {activity.icon}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h4 className="font-headline-md text-body-lg text-primary">{activity.title}</h4>
          <span className="font-label-sm text-label-sm uppercase text-outline">{activity.time}</span>
        </div>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{activity.description}</p>
        {activity.badge && (
          <div className="mt-3 flex gap-2">
            <span className="rounded bg-surface-container px-2 py-1 text-[10px] font-bold text-outline">
              {activity.badge}
            </span>
          </div>
        )}
        {activity.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {activity.images.map((src) => (
              <img key={src} src={src} alt="" className="h-32 w-full rounded-lg object-cover" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DaySection({ day }) {
  return (
    <div className="relative pl-12 md:pl-16">
      <div
        className={`absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md md:h-12 md:w-12 ${
          day.isActive
            ? 'bg-primary text-on-primary'
            : 'bg-surface-container-high text-on-surface-variant'
        }`}
      >
        <span className="font-headline-md text-lg">{String(day.dayNumber).padStart(2, '0')}</span>
      </div>

      <div className="mb-6">
        <h3 className="font-headline-md text-title-lg text-primary">{day.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">{day.dateLabel}</p>
      </div>

      <div className="space-y-4">
        {day.activities.map((activity, index) => (
          <ActivityCard key={`${day.dayNumber}-${index}`} activity={activity} />
        ))}
      </div>
    </div>
  )
}

export default function ItineraryTimeline({ days }) {
  return (
    <div className="timeline-line relative space-y-12 pb-12">
      {days.map((day) => (
        <DaySection key={day.dayNumber} day={day} />
      ))}
    </div>
  )
}
