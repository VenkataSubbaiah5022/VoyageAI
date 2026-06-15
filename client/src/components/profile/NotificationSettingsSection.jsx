import { useState } from 'react'

const NOTIFICATION_OPTIONS = [
  {
    key: 'tripUpdates',
    title: 'Trip Updates',
    description: 'Real-time alerts about flight changes and hotel check-ins.',
  },
  {
    key: 'priceAlerts',
    title: 'Price Alerts',
    description: 'Get notified when tracked destination prices drop.',
  },
  {
    key: 'weeklyDigest',
    title: 'VoyageAI Weekly',
    description: 'Personalized travel inspiration and AI-curated guides.',
  },
]

export default function NotificationSettingsSection({ settings, onSave, saving }) {
  const [localSettings, setLocalSettings] = useState(settings || {})
  const [message, setMessage] = useState(null)

  const toggle = (key) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setMessage(null)
    try {
      await onSave({ notificationSettings: localSettings })
      setMessage({ type: 'success', text: 'Notification preferences saved.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Notifications</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Control how you stay updated with your travels.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary px-6 py-2.5 font-label-md text-label-md text-on-primary disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
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

      <div className="space-y-6">
        {NOTIFICATION_OPTIONS.map((option, index) => (
          <div
            key={option.key}
            className={`flex items-center justify-between py-4 ${
              index > 0 ? 'border-t border-outline-variant' : ''
            }`}
          >
            <div>
              <p className="font-title-lg text-title-lg text-primary">{option.title}</p>
              <p className="font-label-md text-label-md text-on-surface-variant">{option.description}</p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(localSettings[option.key])}
              onChange={() => toggle(option.key)}
              className="h-5 w-5 rounded border-outline text-secondary focus:ring-secondary"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
