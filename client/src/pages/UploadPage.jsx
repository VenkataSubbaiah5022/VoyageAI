import { useCallback, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

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

  const [extractionMeta, setExtractionMeta] = useState(null)

  const [error, setError] = useState(null)



  const runSequentialExtraction = useCallback((items, totalFiles) => {

    let index = 0

    const maxItems = items.length



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

      setError(null)

      setExtractionMeta(null)



      try {

        const { data } = await uploadApi.uploadFiles(files)

        const ids = (data.uploads || []).map((u) => u._id || u.id)

        setUploadIds(ids)



        if (ids.length === 0) {

          throw new Error('Upload failed — no files were saved')

        }



        const processResult = await uploadApi.processUploads(ids)

        const items = processResult.data?.items || []



        if (!items.length) {

          throw new Error('No travel details could be extracted from your documents')

        }



        setExtractionMeta(processResult.data?.meta || null)

        runSequentialExtraction(items, files.length)

      } catch (err) {

        setIsProcessing(false)

        processingRef.current = false

        setError(err?.message || 'Upload or extraction failed. Check your API keys and try again.')

      }

    },

    [runSequentialExtraction],

  )



  const handleGenerate = async () => {

    if (extractedItems.length === 0 || isProcessing || isGenerating) return



    setIsGenerating(true)

    setError(null)



    try {

      const { data } = await itineraryApi.generate({

        uploadIds,

        extractedItems,

        meta: extractionMeta,

      })

      const shareId = data.itinerary?.shareId

      if (shareId) {

        navigate(`/share/${shareId}`)

        return

      }

      throw new Error('Itinerary was created but no share link was returned')

    } catch (err) {

      setError(err?.message || 'Could not generate itinerary. Please try again.')

    } finally {

      setIsGenerating(false)

    }

  }



  return (

    <div className="flex min-h-screen flex-col bg-surface font-body-md text-on-surface selection:bg-secondary-fixed-dim">

      <AppNavbar />

      <main className="mx-auto w-full max-w-[var(--spacing-container-max)] flex-grow px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">

        {error && (

          <div

            role="alert"

            className="mb-8 rounded-xl border border-error/30 bg-error-container px-4 py-3 font-body-md text-on-error-container"

          >

            {error}

          </div>

        )}

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

