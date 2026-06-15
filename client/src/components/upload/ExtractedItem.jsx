import { useEffect, useState } from 'react'

export default function ExtractedItem({ title, status, icon }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="group flex items-start gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-4 transition-all hover:shadow-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease-out',
      }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="grow">
        <div className="flex items-start justify-between">
          <p className="font-label-md text-label-md font-bold text-primary">{title}</p>
          <span className="material-symbols-outlined text-[18px] text-green-600" aria-hidden="true">
            check_circle
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">{status}</p>
      </div>
    </div>
  )
}
