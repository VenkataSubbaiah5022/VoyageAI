const inputClass =
  'w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5'

export default function SignInForm({ visible }) {
  return (
    <div
      className={`form-transition ${visible ? 'auth-form-visible' : 'auth-form-hidden'}`}
      aria-hidden={!visible}
    >
      <header className="mb-5">
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">Welcome Back</h3>
        <p className="text-on-surface-variant">Enter your credentials to access your trips.</p>
      </header>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="ml-1 font-label-md text-on-surface-variant">Email Address</label>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-outline"
              aria-hidden="true"
            >
              mail
            </span>
            <input
              className={`${inputClass} pl-12 pr-4`}
              placeholder="name@company.com"
              type="email"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="font-label-md text-on-surface-variant">Password</label>
            <a className="font-label-sm text-label-sm text-secondary hover:underline" href="#">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-outline"
              aria-hidden="true"
            >
              lock
            </span>
            <input
              className={`${inputClass} pl-12 pr-4`}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 font-headline-md text-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
