import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../services/api'

const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [resetUrl, setResetUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setResetUrl('')
    setSubmitting(true)

    try {
      const result = await authApi.forgotPassword({ email })
      setMessage(result.message)
      if (result.data?.resetUrl) {
        setResetUrl(result.data.resetUrl)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
        <Link to="/auth" className="mb-6 inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:underline">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_back
          </span>
          Back to sign in
        </Link>

        <h1 className="mb-2 font-headline-md text-headline-md text-primary">Reset your password</h1>
        <p className="mb-6 font-body-md text-on-surface-variant">
          Enter your email and we&apos;ll send instructions to reset your password.
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
            <label className="font-label-md text-on-surface-variant" htmlFor="forgot-email">
              Email address
            </label>
            <input
              id="forgot-email"
              type="email"
              className={`${inputClass} px-4`}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary disabled:opacity-70"
          >
            {submitting ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        {resetUrl && (
          <div className="mt-6 rounded-lg border border-outline-variant bg-surface-container-low p-4">
            <p className="mb-2 font-label-sm text-label-sm text-on-surface-variant">
              Development mode — use this reset link:
            </p>
            <Link
              to={
                resetUrl.startsWith('http')
                  ? `${new URL(resetUrl).pathname}${new URL(resetUrl).search}`
                  : resetUrl
              }
              className="break-all text-sm text-primary underline"
            >
              Open reset page
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
