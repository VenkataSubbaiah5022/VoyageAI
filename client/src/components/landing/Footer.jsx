import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Product: [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Explore', to: '/explore' },
    { label: 'API', to: '/explore' },
  ],
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Contact', to: '/explore' },
    { label: 'Privacy Policy', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/explore' },
    { label: 'Terms of Service', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div className="col-span-1">
          <div className="mb-4 font-headline-md text-headline-md font-extrabold text-on-primary">
            VoyageAI
          </div>
          <p className="font-body-md text-body-md text-on-primary/80">
            Precision planning for the curious traveler.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 font-label-md text-label-md font-bold text-on-primary">{title}</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={`font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary ${
                      title === 'Product' && index === 0
                        ? 'underline decoration-secondary-container underline-offset-4'
                        : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-[var(--spacing-container-max)] border-t border-on-primary/10 pt-8 text-center">
        <p className="font-label-sm text-label-sm text-on-primary/60">
          © {new Date().getFullYear()} VoyageAI. Travel with precision.
        </p>
      </div>
    </footer>
  )
}
