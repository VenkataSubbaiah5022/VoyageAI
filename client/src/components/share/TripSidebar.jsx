export default function TripSidebar({ trip }) {
  const { overview, mapImage, packingList } = trip

  return (
    <div className="space-y-6 lg:col-span-4">
      <div className="glass-card rounded-2xl p-6">
        <h4 className="mb-4 font-headline-md text-title-lg text-primary">Trip Overview</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              wb_sunny
            </span>
            <div>
              <p className="font-label-sm text-label-sm text-outline">Weather Forecast</p>
              <p className="font-body-md text-body-md font-semibold">{overview.weather}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              payments
            </span>
            <div>
              <p className="font-label-sm text-label-sm text-outline">Est. Budget</p>
              <p className="font-body-md text-body-md font-semibold">{overview.budget}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              translate
            </span>
            <div>
              <p className="font-label-sm text-label-sm text-outline">Local Language</p>
              <p className="font-body-md text-body-md font-semibold">{overview.language}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-outline-variant pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-label-md text-label-md">Planning Progress</span>
            <span className="font-label-md text-label-md font-bold text-primary">
              {overview.progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
            <div
              className="h-full rounded-full bg-secondary"
              style={{ width: `${overview.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="glass-card group relative h-64 overflow-hidden rounded-2xl p-4">
        <img src={mapImage} alt="Trip map" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute inset-0 bg-primary/10 transition-all group-hover:bg-transparent" />
        <button
          type="button"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 font-label-md text-label-md text-primary shadow-lg"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            map
          </span>
          Expand Map
        </button>
      </div>

      <div className="rounded-2xl bg-tertiary-container p-6 text-on-tertiary-container">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined filled" aria-hidden="true">
            inventory_2
          </span>
          <h4 className="font-headline-md text-title-lg">Smart Packing List</h4>
        </div>
        <ul className="space-y-3 font-body-md opacity-90">
          {packingList.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                check_box_outline_blank
              </span>
              {item}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-6 w-full rounded-lg border border-white/20 bg-white/10 py-2 font-label-md text-label-md text-white transition-all hover:bg-white/20"
        >
          Edit List
        </button>
      </div>
    </div>
  )
}
