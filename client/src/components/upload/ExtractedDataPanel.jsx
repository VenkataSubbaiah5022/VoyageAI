import ExtractedItem from './ExtractedItem'

export default function ExtractedDataPanel({
  items,
  isProcessing,
  isGenerating,
  onGenerate,
}) {
  const canGenerate = items.length > 0 && !isProcessing && !isGenerating

  return (
    <div className="sticky top-24 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container p-6">
        <h2 className="flex items-center gap-2 font-headline-md text-headline-md text-primary">
          <span className="material-symbols-outlined" aria-hidden="true">
            auto_awesome
          </span>
          Extracted Data
        </h2>
        <span className="rounded-full bg-primary px-2 py-1 font-label-sm text-label-sm text-on-primary">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="min-h-[300px] space-y-4 p-6">
        {items.length === 0 && !isProcessing ? (
          <div className="flex h-full flex-col items-center justify-center py-12 text-center text-on-surface-variant opacity-60">
            <span className="material-symbols-outlined mb-2 text-4xl" aria-hidden="true">
              description
            </span>
            <p className="font-body-md">Uploaded documents will appear here once processed.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <ExtractedItem key={`${item.title}-${index}`} {...item} />
          ))
        )}
      </div>

      <div className="bg-surface-container-high p-6">
        <button
          type="button"
          disabled={!canGenerate}
          onClick={onGenerate}
          className={`w-full rounded-lg py-4 font-headline-md text-headline-md transition-all duration-300 ${
            canGenerate
              ? 'cursor-pointer bg-secondary-container text-on-secondary-container hover:scale-95 active:scale-90'
              : 'cursor-not-allowed bg-outline text-on-surface-variant opacity-50'
          }`}
        >
          {isGenerating ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin" aria-hidden="true">
                sync
              </span>
              Generating...
            </span>
          ) : (
            'Generate Itinerary'
          )}
        </button>
        <p className="mt-3 text-center font-label-sm text-label-sm text-on-surface-variant">
          Ready to build your journey
        </p>
      </div>
    </div>
  )
}
