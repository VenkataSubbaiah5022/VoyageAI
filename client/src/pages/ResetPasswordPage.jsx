import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../services/api'

const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [token, setToken] = useState(searchParams.get('token') || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)

    try {
      const result = await authApi.resetPassword({ email, token, password })
      setMessage(result.message)
      setTimeout(() => navigate('/auth'), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
        <h1 className="mb-2 font-headline-md text-headline-md text-primary">Choose a new password</h1>
        <p className="mb-6 font-body-md text-on-surface-variant">
          Enter your new password below to complete the reset.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">{error}</p>
          )}
          {message && (
            <p className="rounded-lg bg-tertiary-fixed px-3 py-2 text-sm text-on-tertiary-fixed-variant">
              {message}
            </p>
          )}

          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant" htmlFor="reset-email">
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              className={`${inputClass} px-4`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant" htmlFor="reset-token">
              Reset token
            </label>
            <input
              id="reset-token"
              type="text"
              className={`${inputClass} px-4`}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant" htmlFor="reset-password">
              New password
            </label>
            <input
              id="reset-password"
              type="password"
              className={`${inputClass} px-4`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant" htmlFor="reset-confirm">
              Confirm password
            </label>
            <input
              id="reset-confirm"
              type="password"
              className={`${inputClass} px-4`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary disabled:opacity-70"
          >
            {submitting ? 'Updating...' : 'Update password'}
          </button>
        </form>

        <p className="mt-6 text-center font-label-sm text-label-sm text-on-surface-variant">
          <Link to="/auth" className="text-secondary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
