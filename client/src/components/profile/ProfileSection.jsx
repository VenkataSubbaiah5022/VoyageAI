import { useState } from 'react'
import { getAvatarColor, getUserInitials } from '../../utils/user'

const TRAVEL_STYLES = [
  { key: 'travelStyle', icon: 'hiking', label: 'Style', value: 'Adventure', hint: 'High intensity, nature-focused', color: 'text-secondary' },
  { key: 'budget', icon: 'payments', label: 'Budget', value: 'Premium', hint: 'Luxury stays & private tours', color: 'text-on-tertiary-container' },
  { key: 'dining', icon: 'restaurant', label: 'Dining', value: 'Foodie', hint: 'Michelin-star & local hidden gems', color: 'text-on-primary-container' },
]

const STYLE_OPTIONS = {
  travelStyle: ['Adventure', 'Relaxation', 'Culture', 'Luxury'],
  budget: ['Budget', 'Moderate', 'Premium', 'Luxury'],
  dining: ['Casual', 'Foodie', 'Vegetarian', 'Local'],
}

export default function ProfileSection({ profile, onSave, saving }) {
  const [firstName, setFirstName] = useState(profile.firstName || '')
  const [lastName, setLastName] = useState(profile.lastName || '')
  const [email, setEmail] = useState(profile.email || '')
  const [preferences, setPreferences] = useState(profile.preferences || {})
  const [newInterest, setNewInterest] = useState('')
  const [message, setMessage] = useState(null)

  const initials = getUserInitials(profile)
  const avatarColor = getAvatarColor(profile.email)

  const cyclePreference = (key) => {
    const options = STYLE_OPTIONS[key]
    const current = preferences[key] || options[0]
    const nextIndex = (options.indexOf(current) + 1) % options.length
    setPreferences((prev) => ({ ...prev, [key]: options[nextIndex] }))
  }

  const removeInterest = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: (prev.interests || []).filter((i) => i !== interest),
    }))
  }

  const addInterest = () => {
    const trimmed = newInterest.trim()
    if (!trimmed) return
    setPreferences((prev) => ({
      ...prev,
      interests: [...new Set([...(prev.interests || []), trimmed])],
    }))
    setNewInterest('')
  }

  const handleSave = async () => {
    setMessage(null)
    try {
      await onSave({ firstName, lastName, email, preferences })
      setMessage({ type: 'success', text: 'Profile saved successfully.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Personal Profile</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Update your travel identity and preferences.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary px-8 py-2.5 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
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

      <div className="space-y-10">
        <div className="flex items-center space-x-8">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-surface-container text-2xl font-bold text-on-primary ${avatarColor}`}
          >
            {initials}
          </div>
          <div>
            <h3 className="font-title-lg text-title-lg text-primary">Profile Avatar</h3>
            <p className="mb-2 font-label-md text-label-md text-on-surface-variant">
              Your initials are generated from your account name.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="px-1 font-label-md text-label-md text-on-surface-variant">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-on-tertiary-container"
            />
          </div>
          <div className="space-y-2">
            <label className="px-1 font-label-md text-label-md text-on-surface-variant">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-on-tertiary-container"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="px-1 font-label-md text-label-md text-on-surface-variant">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-on-tertiary-container"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-title-lg text-title-lg text-primary">Travel Preferences</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.key}
                type="button"
                onClick={() => cyclePreference(style.key)}
                className="cursor-pointer rounded-xl border border-transparent bg-surface-container-low p-5 text-left transition-all hover:border-on-tertiary-container/30"
              >
                <div className={`mb-3 flex items-center space-x-2 ${style.color}`}>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {style.icon}
                  </span>
                  <span className="font-label-md text-label-md">{style.label}</span>
                </div>
                <p className="mb-1 font-title-lg text-title-lg">{preferences[style.key] || style.value}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{style.hint}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(preferences.interests || []).map((interest) => (
              <span
                key={interest}
                className="flex items-center gap-2 rounded-full bg-tertiary-fixed px-4 py-1.5 font-label-sm text-label-sm text-on-tertiary-fixed-variant"
              >
                {interest}
                <button type="button" onClick={() => removeInterest(interest)} aria-label={`Remove ${interest}`}>
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    close
                  </span>
                </button>
              </span>
            ))}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                placeholder="Add interest"
                className="rounded-full border border-dashed border-outline-variant px-4 py-1.5 font-label-sm text-label-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={addInterest}
                className="rounded-full border border-dashed border-outline-variant px-4 py-1.5 font-label-sm text-label-sm text-outline transition-colors hover:border-primary hover:text-primary"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
