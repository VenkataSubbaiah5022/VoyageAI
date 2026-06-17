import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function SignInForm({ visible }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`form-transition ${visible ? 'auth-form-visible' : 'auth-form-hidden'}`}
      aria-hidden={!visible}
    >
      <header className="mb-5">
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">Welcome Back</h3>
        <p className="text-on-surface-variant">Enter your credentials to access your trips.</p>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
            {error}
          </p>
        )}

        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant" htmlFor="signin-email">
            Email Address
          </label>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-outline"
              aria-hidden="true"
            >
              mail
            </span>
            <input
              id="signin-email"
              className={`${inputClass} pl-12 pr-4`}
              placeholder="name@company.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="font-label-md text-on-surface-variant" htmlFor="signin-password">
              Password
            </label>
            <Link className="font-label-sm text-label-sm text-secondary hover:underline" to="/auth/forgot">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-outline"
              aria-hidden="true"
            >
              lock
            </span>
            <input
              id="signin-password"
              className={`${inputClass} pl-12 pr-4`}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary py-3 font-headline-md text-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
