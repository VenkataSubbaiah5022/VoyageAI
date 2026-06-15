import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_EXTRACTED_FALLBACK } from '../data/uploadDemo'
import { uploadApi, itineraryApi } from '../services/api'
import AppNavbar from '../components/layout/AppNavbar'
import UploadFooter from '../components/upload/UploadFooter'
import DropZone from '../components/upload/DropZone'
import ProcessingOverlay from '../components/upload/ProcessingOverlay'
import ExtractedDataPanel from '../components/upload/ExtractedDataPanel'

const PROCESS_INTERVAL_MS = 1200

export default function UploadPage() {
  const navigate = useNavigate()
  const processingRef = useRef(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [fileCount, setFileCount] = useState(0)
  const [extractedItems, setExtractedItems] = useState([])
  const [uploadIds, setUploadIds] = useState([])

  const runSequentialExtraction = useCallback((items, totalFiles) => {
    let index = 0
    const maxItems = Math.min(items.length, totalFiles + 1)

    const interval = setInterval(() => {
      if (index < maxItems) {
        setExtractedItems((prev) => [...prev, items[index]])
        index += 1
      } else {
        clearInterval(interval)
        setIsProcessing(false)
        processingRef.current = false
      }
    }, PROCESS_INTERVAL_MS)
  }, [])

  const handleFilesSelected = useCallback(
    async (files) => {
      if (processingRef.current) return
      processingRef.current = true

      setFileCount(files.length)
      setIsProcessing(true)
      setExtractedItems([])

      let ids = []
      let itemsToShow = MOCK_EXTRACTED_FALLBACK

      try {
        const { data } = await uploadApi.uploadFiles(files)
        ids = (data.uploads || []).map((u) => u._id || u.id)
        setUploadIds(ids)

        if (ids.length > 0) {
          const processResult = await uploadApi.processUploads(ids)
          if (processResult.data?.items?.length) {
            itemsToShow = processResult.data.items
          }
        }
      } catch {
        // Fall back to Stitch demo extraction when API unavailable
      }

      runSequentialExtraction(itemsToShow, files.length)
    },
    [runSequentialExtraction],
  )

  const handleGenerate = async () => {
    if (extractedItems.length === 0 || isProcessing || isGenerating) return

    setIsGenerating(true)

    try {
      const { data } = await itineraryApi.generate({
        uploadIds,
        extractedItems,
      })
      const shareId = data.itinerary?.shareId
      if (shareId) {
        navigate(`/share/${shareId}`)
        return
      }
    } catch (err) {
      setIsGenerating(false)
      alert(err?.message || 'Could not generate itinerary. Please try again.')
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface font-body-md text-on-surface selection:bg-secondary-fixed-dim">
      <AppNavbar />
      <main className="mx-auto w-full max-w-[var(--spacing-container-max)] flex-grow px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <section>
              <h1 className="mb-2 font-headline-md text-display-lg-mobile text-primary md:text-display-lg">
                Plan your next adventure
              </h1>
              <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                Upload your travel documents—flights, hotel bookings, or activity confirmations. Our
                AI will automatically organize your itinerary.
              </p>
            </section>

            <DropZone onFilesSelected={handleFilesSelected} disabled={isProcessing || isGenerating} />

            {isProcessing && <ProcessingOverlay fileCount={fileCount} />}
          </div>

          <div className="lg:col-span-5">
            <ExtractedDataPanel
              items={extractedItems}
              isProcessing={isProcessing}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
          </div>
        </div>
      </main>
      <UploadFooter />
    </div>
  )
}
