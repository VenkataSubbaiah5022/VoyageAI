import SiteFooter from '../layout/SiteFooter'

export function NotFoundDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-[10%] opacity-10">
        <span className="material-symbols-outlined text-6xl text-primary" aria-hidden="true">
          flight
        </span>
      </div>
      <div className="absolute right-[15%] bottom-32 opacity-10">
        <span className="material-symbols-outlined text-5xl text-secondary" aria-hidden="true">
          hotel
        </span>
      </div>
    </div>
  )
}

export default function NotFoundFooter() {
  return <SiteFooter variant="light" />
}
