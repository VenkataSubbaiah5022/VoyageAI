import { useCallback, useRef, useState } from 'react'

const MAX_SIZE = 20 * 1024 * 1024

function validateFiles(fileList) {
  const valid = []
  for (const file of fileList) {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    const isImage = file.type.startsWith('image/')
    if ((isPdf || isImage) && file.size <= MAX_SIZE) {
      valid.push(file)
    }
  }
  return valid
}

export default function DropZone({ onFilesSelected, disabled }) {
  const inputRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  const handleFiles = useCallback(
    (fileList) => {
      const files = validateFiles(Array.from(fileList))
      if (files.length > 0) {
        onFilesSelected(files)
      }
    },
    [onFilesSelected],
  )

  const onDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsActive(true)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsActive(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(false)
    if (!disabled) handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group relative cursor-pointer rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-12 text-center transition-all hover:border-secondary ${
        isActive ? 'drop-zone-active' : ''
      } ${disabled ? 'pointer-events-none opacity-60' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/*"
        multiple
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed-variant transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
            upload_file
          </span>
        </div>
        <div>
          <p className="font-headline-md text-headline-md text-primary">Drag and drop documents here</p>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Supports PDFs, JPEGs, and PNGs (Max 20MB)
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.click()
          }}
          disabled={disabled}
          className="mt-4 rounded-lg border border-outline px-8 py-3 font-label-md text-label-md font-semibold text-primary transition-colors hover:bg-surface-container-low"
        >
          Browse Files
        </button>
      </div>
    </div>
  )
}
