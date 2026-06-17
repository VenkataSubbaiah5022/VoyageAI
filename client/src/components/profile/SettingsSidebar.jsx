import { Link } from 'react-router-dom'

const TABS = [
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'documents', label: 'Documents', icon: 'folder_open' },
  { id: 'accounts', label: 'Linked Accounts', icon: 'link' },
]

export default function SettingsSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="md:col-span-3">
      <h1 className="mb-8 font-headline-md text-headline-md text-primary">Settings</h1>
      <nav className="space-y-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? 'active-nav-link'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="font-label-md text-label-md">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-12 rounded-xl bg-primary-fixed p-6 text-on-primary-fixed">
        <p className="mb-2 font-label-md text-label-md">Plan more trips</p>
        <p className="mb-4 text-[13px] leading-relaxed opacity-80">
          Upload bookings and let AI build your next shareable itinerary.
        </p>
        <Link
          to="/upload"
          className="block w-full rounded-lg bg-primary py-2 text-center font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary/90"
        >
          Start planning
        </Link>
      </div>
    </aside>
  )
}
