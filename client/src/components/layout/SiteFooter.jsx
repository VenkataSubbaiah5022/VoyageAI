import { Link } from 'react-router-dom'
import { FOOTER_SECTIONS, SOCIAL_LINKS } from '../../data/siteLinks'

export default function SiteFooter({ variant = 'dark' }) {
  const isDark = variant === 'dark'

  return (
    <footer
      className={
        isDark
          ? 'w-full border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 text-on-primary md:px-[var(--spacing-margin-desktop)]'
          : 'w-full border-t border-outline-variant bg-surface-container-low px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]'
      }
    >
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] sm:grid-cols-2 md:grid-cols-5">
        <div className="space-y-4">
          <div
            className={`font-headline-md text-headline-md font-extrabold ${isDark ? 'text-on-primary' : 'text-primary'}`}
          >
            VoyageAI
          </div>
          <p
            className={`max-w-[220px] font-label-sm text-label-sm ${isDark ? 'text-on-primary/80' : 'text-on-surface-variant'}`}
          >
            Travel with precision. Guided by intelligence.
          </p>
        </div>

        {Object.entries(FOOTER_SECTIONS).map(([title, links]) => (
          <div key={title} className="space-y-4">
            <h4
              className={`font-label-md text-label-md font-bold uppercase tracking-widest ${isDark ? 'opacity-60' : 'text-on-surface-variant'}`}
            >
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={`font-label-sm text-label-sm transition-colors ${
                      isDark
                        ? 'text-on-primary/80 hover:text-on-primary'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <h4
            className={`font-label-md text-label-md font-bold uppercase tracking-widest ${isDark ? 'opacity-60' : 'text-on-surface-variant'}`}
          >
            Connect
          </h4>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((item) => (
              <Link
                key={item.icon}
                to={item.to}
                aria-label={item.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isDark
                    ? 'border-on-primary/20 hover:bg-on-primary/10'
                    : 'border-outline-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto mt-12 max-w-[var(--spacing-container-max)] border-t pt-8 text-center font-label-sm text-label-sm ${
          isDark ? 'border-on-primary/10 text-on-primary/60' : 'border-outline-variant text-on-surface-variant'
        }`}
      >
        © {new Date().getFullYear()} VoyageAI. Travel with precision.
      </div>
    </footer>
  )
}
