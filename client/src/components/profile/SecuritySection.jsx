import { useState } from 'react'
import { profileApi } from '../../services/api'

export default function SecuritySection({ profile, onLogout, onAccountDeleted }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleting, setDeleting] = useState(false)

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently'

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }

    setSaving(true)
    try {
      await profileApi.updatePassword({ currentPassword, newPassword })
      setMessage({ type: 'success', text: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('This will permanently delete your account and all data. Continue?')) return

    setDeleting(true)
    try {
      await profileApi.deleteAccount({ password: deletePassword })
      onAccountDeleted()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h2 className="font-headline-md text-headline-md text-primary">Security Settings</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your account access and authentication.
        </p>
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
        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-1 font-title-lg text-title-lg text-primary">Update Password</h3>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Member since {memberSince}.
            </p>
          </div>
          <div className="space-y-4 md:col-span-2">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              required
              className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-on-tertiary-container"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                minLength={6}
                className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-on-tertiary-container"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
                minLength={6}
                className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-on-tertiary-container"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-6 py-2.5 font-label-md text-label-md text-on-primary disabled:opacity-60"
            >
              {saving ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between rounded-2xl bg-surface-container p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-on-tertiary-container/10 text-on-tertiary-container">
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                lock
              </span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg text-primary">Two-Factor Authentication (2FA)</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Secure your account with an extra layer of protection.
              </p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-7 w-14 rounded-full bg-outline-variant after:absolute after:top-0.5 after:left-[4px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-secondary peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="font-title-lg text-title-lg text-primary">Active Session</h3>
          <div className="flex items-center justify-between rounded-xl border border-outline-variant p-4">
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-outline" aria-hidden="true">
                laptop_mac
              </span>
              <div>
                <p className="font-label-md text-label-md text-primary">Current Browser Session</p>
                <p className="text-[12px] text-on-surface-variant">Active now</p>
              </div>
            </div>
            <span className="rounded bg-tertiary-fixed px-2 py-1 font-label-sm text-label-sm text-on-tertiary-container">
              Current
            </span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="font-label-md text-label-md text-error hover:underline"
          >
            Sign out of this device
          </button>
        </div>

        <div className="rounded-2xl border border-error/30 bg-error-container/20 p-6">
          <h3 className="mb-2 font-title-lg text-title-lg text-error">Delete Account</h3>
          <p className="mb-4 font-body-md text-body-md text-on-surface-variant">
            Permanently delete your account and all associated trips and documents.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Confirm with your password"
              className="flex-1 rounded-xl border-0 bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-error"
            />
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleting || !deletePassword}
              className="rounded-lg bg-error px-6 py-2.5 font-label-md text-label-md text-on-error disabled:opacity-60"
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
