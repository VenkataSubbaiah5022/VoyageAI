export default function RecentUploads({ uploads }) {
  return (
    <aside className="space-y-8 lg:col-span-4">
      <div className="space-y-6 rounded-2xl border border-outline-variant bg-surface-container-low p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-title-lg text-title-lg text-primary">Recent Uploads</h2>
          <button type="button" className="font-label-sm text-label-sm text-secondary hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="elevation-1 flex cursor-pointer gap-4 rounded-lg bg-surface-container-lowest p-3 transition-shadow hover:elevation-2"
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

        <div className="cursor-pointer space-y-2 rounded-xl border-2 border-dashed border-outline p-6 text-center transition-colors hover:bg-white">
          <span className="material-symbols-outlined text-[32px] text-outline" aria-hidden="true">
            cloud_upload
          </span>
          <p className="font-label-md text-label-md text-primary">Drop files to organize</p>
          <p className="font-label-sm text-label-sm text-outline">VoyageAI will auto-tag them</p>
        </div>
      </div>

      <div className="relative space-y-4 overflow-hidden rounded-2xl bg-primary p-6 text-on-primary shadow-xl">
        <div className="relative z-10">
          <h3 className="mb-2 font-headline-md text-headline-md">AI Traveler Tip</h3>
          <p className="font-body-md text-body-md opacity-90">
            Based on your Amalfi trip, we suggest booking &apos;The Blue Grotto&apos; tour at least 3
            weeks in advance for the best morning light.
          </p>
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-10">
          <span
            className="material-symbols-outlined filled text-[120px]"
            aria-hidden="true"
          >
            lightbulb
          </span>
        </div>
      </div>
    </aside>
  )
}
