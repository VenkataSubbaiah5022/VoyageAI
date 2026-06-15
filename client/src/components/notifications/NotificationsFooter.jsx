export default function NotificationsFooter() {
  const links = ['Product', 'Support', 'Legal', 'Privacy', 'Terms', 'Careers']

  return (
    <footer className="w-full border-t border-outline-variant/50 bg-surface-container-lowest px-[var(--spacing-margin-mobile)] py-16 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-col items-center justify-between gap-[var(--spacing-gutter)] md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <span className="font-headline-md text-headline-md font-bold text-primary">VoyageAI</span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            © {new Date().getFullYear()} VoyageAI. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body-md text-body-md text-on-surface-variant transition-all duration-200 hover:text-primary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
