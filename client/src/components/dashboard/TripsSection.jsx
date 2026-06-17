import { useState } from 'react'
import TripCard from './TripCard'
import CreateTripCard from './CreateTripCard'

export default function TripsSection({ trips, pastTrips = [], onDeleteTrip }) {
  const [filter, setFilter] = useState('upcoming')
  const visibleTrips = filter === 'upcoming' ? trips : pastTrips

  return (
    <div className="space-y-8 lg:col-span-8" id="trips">
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <h2 className="font-headline-md text-headline-md text-primary">Your Trips</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('upcoming')}
            className={`cursor-pointer rounded-full px-3 py-1 font-label-sm text-label-sm ${
              filter === 'upcoming'
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setFilter('past')}
            className={`cursor-pointer rounded-full px-3 py-1 font-label-sm text-label-sm ${
              filter === 'past'
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2">
        {visibleTrips.length > 0 ? (
          visibleTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={onDeleteTrip} />
          ))
        ) : (
          <p className="col-span-full py-8 text-center font-body-md text-on-surface-variant">
            {filter === 'past' ? 'No past trips yet.' : 'No upcoming trips yet.'}
          </p>
        )}
        {filter === 'upcoming' && <CreateTripCard />}
      </div>
    </div>
  )
}
