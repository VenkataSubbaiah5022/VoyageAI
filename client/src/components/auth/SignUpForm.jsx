import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function SignUpForm({ visible }) {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await register({ firstName, lastName, email, password, acceptedTerms })
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
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">Join VoyageAI</h3>
        <p className="text-on-surface-variant">Start your journey with precision planning.</p>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="ml-1 font-label-md text-on-surface-variant" htmlFor="signup-first-name">
              First Name
            </label>
            <input
              id="signup-first-name"
              className={inputClass}
              placeholder="Jane"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="ml-1 font-label-md text-on-surface-variant" htmlFor="signup-last-name">
              Last Name
            </label>
            <input
              id="signup-last-name"
              className={inputClass}
              placeholder="Doe"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant" htmlFor="signup-email">
            Email Address
          </label>
          <input
            id="signup-email"
            className={inputClass}
            placeholder="jane.doe@example.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className={inputClass}
            placeholder="Create a strong password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            className="mt-1 rounded border-outline-variant text-secondary focus:ring-secondary"
            id="terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
          />
          <label
            className="font-label-sm text-label-sm leading-relaxed text-on-surface-variant"
            htmlFor="terms"
          >
            I agree to the{' '}
            <a className="text-secondary hover:underline" href="#">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="text-secondary hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-lg bg-secondary py-3 font-headline-md text-headline-md text-on-secondary shadow-lg shadow-secondary/20 transition-all hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
