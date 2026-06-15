export default function ProcessingOverlay({ fileCount }) {
  return (
    <div className="glass-panel flex items-center gap-6 rounded-xl border border-secondary-container p-6 shadow-lg">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-secondary-fixed" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
      </div>
      <div>
        <p className="font-title-lg text-title-lg text-primary">Analyzing documents...</p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          VoyageAI is reading details from {fileCount} {fileCount === 1 ? 'file' : 'files'}.
        </p>
      </div>
    </div>
  )
}
