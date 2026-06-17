import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { uploadApi } from '../../services/api'

export default function DocumentsSection() {
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [openingId, setOpeningId] = useState(null)
  const [message, setMessage] = useState(null)

  const loadUploads = () => {
    setLoading(true)
    uploadApi
      .listUploads()
      .then(({ data }) => setUploads(data.uploads || []))
      .catch(() => setUploads([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUploads()
  }, [])

  const handleView = async (id) => {
    setOpeningId(id)
    setMessage(null)
    try {
      await uploadApi.openFile(id)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setOpeningId(null)
    }
  }

  const handleDownload = async (id, fileName) => {
    setOpeningId(id)
    setMessage(null)
    try {
      const token = localStorage.getItem('voyageai_token')
      const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api'
      const response = await fetch(`${API_BASE}/uploads/${id}/file?download=1`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'document'
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setOpeningId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document permanently?')) return

    setDeletingId(id)
    setMessage(null)
    try {
      await uploadApi.deleteUpload(id)
      setUploads((prev) => prev.filter((u) => (u._id || u.id) !== id))
      setMessage({ type: 'success', text: 'Document deleted.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteAll = async () => {
    if (!window.confirm('Delete all uploaded documents? This cannot be undone.')) return

    setMessage(null)
    try {
      await uploadApi.deleteAllUploads()
      setUploads([])
      setMessage({ type: 'success', text: 'All documents deleted.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Uploaded Documents</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your travel confirmations, tickets, and booking files.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/upload"
            className="rounded-lg border border-primary px-4 py-2 font-label-md text-label-md text-primary hover:bg-primary/5"
          >
            Upload New
          </Link>
          {uploads.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteAll}
              className="rounded-lg bg-error px-4 py-2 font-label-md text-label-md text-on-error"
            >
              Delete All
            </button>
          )}
        </div>
      </div>

      {message && (
        <p
          className={`mb-6 rounded-lg px-4 py-3 font-label-md text-label-md ${
            message.type === 'success'
              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
              : 'bg-error-container text-on-error-container'
          }`}
        >
          {message.text}
        </p>
      )}

      {loading ? (
        <p className="py-8 text-center text-on-surface-variant">Loading documents...</p>
      ) : uploads.length === 0 ? (
        <div className="rounded-xl border border-outline-variant bg-surface-container-low py-16 text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-outline" aria-hidden="true">
            folder_open
          </span>
          <p className="font-headline-md text-headline-md text-primary">No documents yet</p>
          <p className="mt-2 font-body-md text-on-surface-variant">
            Upload flight confirmations or hotel bookings to get started.
          </p>
          <Link
            to="/upload"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-on-primary"
          >
            Go to Upload
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {uploads.map((upload) => {
            const id = upload._id || upload.id
            return (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl border border-outline-variant p-4 transition-all hover:shadow-md"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${upload.iconBg || 'bg-primary-fixed'} ${upload.iconColor || 'text-on-primary-fixed'}`}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {upload.icon || 'description'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-label-md text-label-md font-semibold text-primary">
                      {upload.fileName}
                    </p>
                    <p className="font-label-sm text-label-sm text-outline">
                      {upload.tripLabel || 'Unassigned'} • {upload.fileSizeLabel}
                      {upload.processingStatus === 'completed' && ' • Extracted'}
                      {upload.processingStatus === 'failed' && ' • Extraction failed'}
                    </p>
                    {upload.itineraryId?.shareId && (
                      <Link
                        to={`/share/${upload.itineraryId.shareId}`}
                        className="font-label-sm text-label-sm text-primary hover:underline"
                      >
                        Linked trip: {upload.itineraryId.title || upload.itineraryId.destination}
                      </Link>
                    )}
                    <p className="font-label-sm text-label-sm text-outline">
                      {new Date(upload.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleView(id)}
                    disabled={openingId === id}
                    className="rounded-lg px-3 py-2 font-label-sm text-label-sm text-primary transition-colors hover:bg-primary/5 disabled:opacity-60"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(id, upload.fileName)}
                    disabled={openingId === id}
                    className="rounded-lg px-3 py-2 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-60"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    disabled={deletingId === id}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 font-label-sm text-label-sm text-error transition-colors hover:bg-error-container/20 disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      delete
                    </span>
                    {deletingId === id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
