export default function AccountsSection() {
  return (
    <div>
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h2 className="font-headline-md text-headline-md text-primary">Linked Accounts</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Connect external services for a smoother experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-transparent bg-surface-container-low p-6 transition-all hover:border-outline-variant">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <div>
              <p className="font-title-lg text-title-lg text-primary">Google</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Not connected</p>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="font-label-md text-label-md text-outline"
            title="Coming soon"
          >
            Connect
          </button>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-transparent bg-surface-container-low p-6 transition-all hover:border-outline-variant">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black shadow-sm">
              <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.05 20.28c-.96.95-2.04 1.43-3.23 1.43-1.16 0-2.13-.41-2.92-1.21-.8-.8-1.72-1.2-2.76-1.2s-2.04.42-2.88 1.25c-.84.83-1.84 1.24-3 1.24-1.23 0-2.28-.48-3.15-1.43C-.7 19.34-1.12 18.23-1.12 17c0-1.23.44-2.33 1.33-3.32 1.35-1.51 3.1-2.26 5.25-2.26s3.83.67 5.04 2c.28.31.5.65.65 1.02.15-.37.37-.71.65-1.02 1.21-1.33 2.89-2 5.04-2 2.15 0 3.9.75 5.25 2.26.89.99 1.33 2.09 1.33 3.32 0 1.23-.42 2.34-1.27 3.31-1.03 1.18-2.24 1.77-3.63 1.77-.52 0-1.01-.1-1.48-.3zm-4.32-8.58c-1.35 0-2.5.48-3.45 1.43-.95.95-1.43 2.1-1.43 3.45s.48 2.5 1.43 3.45c.95.95 2.1 1.43 3.45 1.43s2.5-.48 3.45-1.43c.95-.95 1.43-2.1 1.43-3.45s-.48-2.5-1.43-3.45c-.95-.95-2.1-1.43-3.45-1.43z" />
              </svg>
            </div>
            <div>
              <p className="font-title-lg text-title-lg text-primary">Apple ID</p>
              <p className="font-label-md text-label-md text-on-surface-variant">Not connected</p>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="font-label-md text-label-md text-outline"
            title="Coming soon"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}
