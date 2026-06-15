import { Link } from 'react-router-dom'

export default function SettingsFooter() {
  return (
    <footer className="mt-12 border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div>
          <div className="mb-4 font-headline-md text-headline-md font-extrabold text-on-primary">
            VoyageAI
          </div>
          <p className="font-body-md text-body-md text-on-primary/80">
            © {new Date().getFullYear()} VoyageAI. Travel with precision.
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Product</h4>
          <Link to="/explore" className="font-label-sm text-label-sm text-on-primary/80 underline decoration-secondary-container underline-offset-4 hover:text-on-primary">
            Explore
          </Link>
          <Link to="/upload" className="font-label-sm text-label-sm text-on-primary/80 hover:text-on-primary">
            AI Planner
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Legal</h4>
          <Link to="/" className="font-label-sm text-label-sm text-on-primary/80 hover:text-on-primary">
            Privacy Policy
          </Link>
          <Link to="/" className="font-label-sm text-label-sm text-on-primary/80 hover:text-on-primary">
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Support</h4>
          <Link to="/explore" className="font-label-sm text-label-sm text-on-primary/80 hover:text-on-primary">
            Help Center
          </Link>
          <Link to="/profile" className="font-label-sm text-label-sm text-on-primary/80 hover:text-on-primary">
            Account Settings
          </Link>
        </div>
      </div>
    </footer>
  )
}
