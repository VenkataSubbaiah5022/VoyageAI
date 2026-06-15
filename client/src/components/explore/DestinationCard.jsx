import { Link } from 'react-router-dom'

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1 text-secondary">
      <span
        className="material-symbols-outlined filled text-[18px]"
        aria-hidden="true"
      >
        star
      </span>
      <span className="font-label-md text-label-md">{value}</span>
    </div>
  )
}

function DestinationTag({ tag, tagBg, tagColor }) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider ${tagBg} ${tagColor}`}
    >
      {tag}
    </span>
  )
}

function ViewButton({ style, shareId }) {
  if (style === 'primary') {
    return (
      <Link
        to={`/share/${shareId}`}
        className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary transition-colors hover:bg-primary-container"
      >
        View Itinerary
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          explore
        </span>
      </Link>
    )
  }

  return (
    <Link
      to={`/share/${shareId}`}
      className="w-full rounded-lg border border-primary py-3 text-center font-label-md text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
    >
      View Itinerary
    </Link>
  )
}

export default function DestinationCard({ destination }) {
  const isLarge = destination.size === 'large'

  if (isLarge) {
    return (
      <div className="group relative col-span-12 overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all duration-300 hover:shadow-lg md:col-span-8">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-start justify-between">
            <DestinationTag
              tag={destination.tag}
              tagBg={destination.tagBg}
              tagColor={destination.tagColor}
            />
            <Rating value={destination.rating} />
          </div>
          <h3 className="mb-2 font-headline-md text-headline-md text-primary">{destination.title}</h3>
          <p className="mb-6 max-w-2xl font-body-md text-body-md text-on-surface-variant">
            {destination.description}
          </p>
          <ViewButton style={destination.buttonStyle} shareId={destination.shareId} />
        </div>
      </div>
    )
  }

  return (
    <div className="group relative col-span-12 overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all duration-300 hover:shadow-lg md:col-span-4">
      <div className="aspect-square overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <DestinationTag
            tag={destination.tag}
            tagBg={destination.tagBg}
            tagColor={destination.tagColor}
          />
          <Rating value={destination.rating} />
        </div>
        <h3 className="mb-2 font-title-lg text-title-lg text-primary">{destination.title}</h3>
        <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{destination.description}</p>
        <ViewButton style={destination.buttonStyle} shareId={destination.shareId} />
      </div>
    </div>
  )
}
