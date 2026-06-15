import { Link } from 'react-router-dom'

export default function CreateTripCard() {
  return (
    <Link
      to="/upload"
      className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-outline-variant p-8 transition-colors hover:bg-surface-container-low"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container transition-colors group-hover:bg-primary-fixed">
        <span
          className="material-symbols-outlined text-[32px] text-outline group-hover:text-primary"
          aria-hidden="true"
        >
          add_location
        </span>
      </div>
      <div className="text-center">
        <p className="font-headline-md text-headline-md text-on-surface-variant">Create New Itinerary</p>
        <p className="font-label-md text-label-md text-outline">Let AI build your perfect route</p>
      </div>
    </Link>
  )
}
