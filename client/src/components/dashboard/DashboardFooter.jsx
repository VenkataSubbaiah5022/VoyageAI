export default function DashboardFooter() {
  return (
    <footer className="w-full border-t border-outline-variant bg-primary px-[var(--spacing-margin-desktop)] py-12 text-on-primary">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-headline-md text-headline-md font-extrabold text-on-primary">VoyageAI</div>
          <p className="max-w-[200px] font-label-sm text-label-sm opacity-80">
            Travel with precision. Guided by Intelligence.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest opacity-60">
            Explore
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 underline decoration-secondary-container underline-offset-4 transition-colors hover:text-on-primary"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest opacity-60">
            Legal
          </h4>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'API'].map((item) => (
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

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest opacity-60">
            Connect
          </h4>
          <div className="flex gap-4">
            {['public', 'mail'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-primary/20 transition-colors hover:bg-on-primary/10"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[var(--spacing-container-max)] border-t border-on-primary/10 pt-8 text-center font-label-sm text-label-sm opacity-60">
        © {new Date().getFullYear()} VoyageAI. Travel with precision.
      </div>
    </footer>
  )
}
