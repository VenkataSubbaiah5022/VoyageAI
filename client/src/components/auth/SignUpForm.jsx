const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function SignUpForm({ visible }) {
  return (
    <div
      className={`form-transition ${visible ? 'auth-form-visible' : 'auth-form-hidden'}`}
      aria-hidden={!visible}
    >
      <header className="mb-5">
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">Join VoyageAI</h3>
        <p className="text-on-surface-variant">Start your journey with precision planning.</p>
      </header>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="ml-1 font-label-md text-on-surface-variant">First Name</label>
            <input className={inputClass} placeholder="Jane" type="text" autoComplete="given-name" />
          </div>
          <div className="space-y-2">
            <label className="ml-1 font-label-md text-on-surface-variant">Last Name</label>
            <input className={inputClass} placeholder="Doe" type="text" autoComplete="family-name" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant">Email Address</label>
          <input
            className={inputClass}
            placeholder="jane.doe@example.com"
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant">Password</label>
          <input
            className={inputClass}
            placeholder="Create a strong password"
            type="password"
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            className="mt-1 rounded border-outline-variant text-secondary focus:ring-secondary"
            id="terms"
            type="checkbox"
          />
          <label className="font-label-sm text-label-sm leading-relaxed text-on-surface-variant" htmlFor="terms">
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
          className="mt-2 w-full rounded-lg bg-secondary py-3 font-headline-md text-headline-md text-on-secondary shadow-lg shadow-secondary/20 transition-all hover:scale-[1.01] active:scale-95"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}
