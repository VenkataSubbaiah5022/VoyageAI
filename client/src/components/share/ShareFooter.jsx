export default function ShareFooter() {
  return (
    <footer className="mt-20 w-full border-t border-outline-variant bg-primary px-[var(--spacing-margin-desktop)] py-12 text-on-primary">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div>
          <span className="mb-4 block font-headline-md text-headline-md font-extrabold text-on-primary">
            VoyageAI
          </span>
          <p className="mb-4 font-label-sm text-label-sm text-on-primary/70">
            © {new Date().getFullYear()} VoyageAI. Travel with precision.
          </p>
        </div>

        <div>
          <h5 className="mb-4 font-label-md text-label-md font-bold uppercase tracking-wider">Product</h5>
          <ul className="space-y-2">
            {['Dashboard', 'Pricing', 'API'].map((item, i) => (
              <li key={item}>
                <a
                  href="#"
                  className={`font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary ${
                    i === 0 ? 'underline decoration-secondary-container underline-offset-4' : ''
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-label-md text-label-md font-bold uppercase tracking-wider">Company</h5>
          <ul className="space-y-2">
            {['About Us', 'Contact', 'Help Center'].map((item) => (
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
          <h5 className="mb-4 font-label-md text-label-md font-bold uppercase tracking-wider">Legal</h5>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
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
