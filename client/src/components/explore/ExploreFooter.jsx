import { Link } from 'react-router-dom'

export default function ExploreFooter() {
  return (
    <footer className="border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div>
          <span className="mb-4 block font-headline-md text-headline-md font-extrabold text-on-primary">
            VoyageAI
          </span>
          <p className="font-label-md text-label-md text-on-primary/60">
            © {new Date().getFullYear()} VoyageAI. Travel with precision.
          </p>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-on-primary">Product</h5>
          <ul className="space-y-2">
            <li>
              <Link
                to="/explore"
                className="font-label-sm text-label-sm text-on-primary/80 underline decoration-secondary-container underline-offset-4 transition-colors hover:text-on-primary"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                AI Planner
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-on-primary">Company</h5>
          <ul className="space-y-2">
            {['About Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-on-primary">Support</h5>
          <ul className="space-y-2">
            {['Help Center', 'API', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
