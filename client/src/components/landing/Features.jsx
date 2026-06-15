import Icon from '../Icon'

const FEATURES_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxerZ0oUMHGWpIiATg3xYEF-5OpjL6K2REhMA95V6LvDWhp-ZY6kEdt1dk4craxkuDGef8AGzZ7EfYePHaeMPqxC_jeUhCOkGgm8bj5Hlyw1jODYRqv-fG0CAk9OID0ABDTgv1ux5nznwpupZElLEeqknzXeMEJwRDGEDQPQ-ToGxO_Ec79ZE_lpfnuSb8fkMsRvkHCzCsBzyEpHDKx4Drt5NtfjhilaMqXvovKiW_AKLTEBxQt0bd5lkbEo992o-aaglt42CydafV'

const FEATURES = [
  {
    icon: 'analytics',
    title: 'Automatic Extraction',
    description:
      'Say goodbye to manual data entry. We handle the complex parsing of hotel vouchers and flight e-tickets.',
  },
  {
    icon: 'event_note',
    title: 'AI-Powered Schedules',
    description:
      'Intelligent scheduling that accounts for travel time, opening hours, and your personal interests.',
  },
  {
    icon: 'share',
    title: 'Shareable Links',
    description:
      'Collab with friends or family. One link to view, comment, and sync with your digital calendars.',
  },
]

export default function Features() {
  return (
    <section className="bg-surface-container-low px-[var(--spacing-margin-mobile)] py-24 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto max-w-[var(--spacing-container-max)]">
        <div className="mb-24 flex flex-col items-center gap-16 md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src={FEATURES_IMAGE}
              alt="Traveler's workspace with laptop and passport"
              className="h-[400px] w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          <div className="w-full md:w-1/2">
            <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Unmatched Efficiency
            </span>
            <h2 className="mb-8 font-display-lg-mobile text-primary md:font-headline-md md:text-headline-md">
              Features built for the modern voyager.
            </h2>
            <ul className="space-y-8">
              {FEATURES.map((feature) => (
                <li key={feature.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                    <Icon name={feature.icon} size={18} />
                  </div>
                  <div>
                    <h4 className="font-title-lg text-title-lg text-primary">{feature.title}</h4>
                    <p className="text-on-surface-variant">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
