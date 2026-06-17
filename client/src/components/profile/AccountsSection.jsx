export default function AccountsSection() {
  return (
    <div>
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h2 className="font-headline-md text-headline-md text-primary">Linked Accounts</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          VoyageAI uses secure email and password authentication. Social login is not enabled in this
          version.
        </p>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-6">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-3xl text-primary" aria-hidden="true">
            mail
          </span>
          <div>
            <p className="font-title-lg text-title-lg text-primary">Email sign-in</p>
            <p className="mt-1 font-body-md text-on-surface-variant">
              Your account is managed with the email and password you registered. Update your password
              anytime under the Security tab.
            </p>
            <p className="mt-4 font-label-sm text-label-sm text-outline">
              Google, Apple, and Facebook sign-in may be added in a future release.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
