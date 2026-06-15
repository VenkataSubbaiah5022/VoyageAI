import { Link } from 'react-router-dom'

export default function RecentUploads({ uploads, tipDestination }) {
  const tip = tipDestination
    ? `Based on your ${tipDestination} trip, book popular tours early for the best availability and morning light.`
    : 'Upload your travel documents and VoyageAI will organize them into your itinerary automatically.'

  return (
    <aside className="space-y-8 lg:col-span-4">
      <div className="space-y-6 rounded-2xl border border-outline-variant bg-surface-container-low p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-title-lg text-title-lg text-primary">Recent Uploads</h2>
          <Link to="/profile?tab=documents" className="font-label-sm text-label-sm text-secondary hover:underline">
            View All
          </Link>
        </div>

        {uploads.length > 0 ? (
          <div className="space-y-4">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="elevation-1 flex gap-4 rounded-lg bg-surface-container-lowest p-3 transition-shadow hover:elevation-2"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded ${upload.iconBg} ${upload.iconColor}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {upload.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-label-md text-label-md text-primary">{upload.fileName}</p>
                  <p className="font-label-sm text-label-sm text-outline">
                    {upload.tripLabel} • {upload.fileSizeLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body-md text-body-md text-on-surface-variant">
            No uploads yet. Drop your flight or hotel confirmations to get started.
          </p>
        )}

        <Link
          to="/upload"
          className="block space-y-2 rounded-xl border-2 border-dashed border-outline p-6 text-center transition-colors hover:bg-white"
        >
          <span className="material-symbols-outlined text-[32px] text-outline" aria-hidden="true">
            cloud_upload
          </span>
          <p className="font-label-md text-label-md text-primary">Drop files to organize</p>
          <p className="font-label-sm text-label-sm text-outline">VoyageAI will auto-tag them</p>
        </Link>
      </div>

      <div className="relative space-y-4 overflow-hidden rounded-2xl bg-primary p-6 text-on-primary shadow-xl">
        <div className="relative z-10">
          <h3 className="mb-2 font-headline-md text-headline-md">AI Traveler Tip</h3>
          <p className="font-body-md text-body-md opacity-90">{tip}</p>
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-10">
          <span className="material-symbols-outlined filled text-[120px]" aria-hidden="true">
            lightbulb
          </span>
        </div>
      </div>
    </aside>
  )
}
