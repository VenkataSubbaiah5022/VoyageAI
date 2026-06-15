import { useEffect, useRef } from 'react'
import Icon from '../Icon'

const STEPS = [
  {
    icon: 'upload_file',
    title: '1. Upload',
    description:
      'Simply drag and drop your PDFs, emails, or screenshots of your flight and hotel confirmations.',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    progress: 'w-1/3',
    progressColor: 'bg-primary',
  },
  {
    icon: 'psychology',
    title: '2. Extract',
    description:
      'Our AI scans your documents to pull dates, times, locations, and confirmation numbers with 99% accuracy.',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-secondary',
    progress: 'w-2/3',
    progressColor: 'bg-secondary',
  },
  {
    icon: 'map',
    title: '3. Explore',
    description:
      'Receive a complete itinerary featuring local gems, dining spots, and transit routes mapped out for you.',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed-variant',
    progress: 'w-full',
    progressColor: 'bg-on-tertiary-container',
  },
]

export default function HowItWorks() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-background px-[var(--spacing-margin-mobile)] py-24 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto max-w-[var(--spacing-container-max)]">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-headline-md text-headline-md text-primary">How it Works</h2>
          <p className="mx-auto max-w-xl text-on-surface-variant">
            From messy confirmation emails to a polished schedule in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="glass-card flex flex-col gap-6 rounded-xl border-outline-variant/30 p-8 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${step.iconBg} ${step.iconColor}`}
              >
                <Icon name={step.icon} size={32} />
              </div>
              <div>
                <h3 className="mb-2 font-title-lg text-title-lg text-primary">{step.title}</h3>
                <p className="font-body-md text-on-surface-variant">{step.description}</p>
              </div>
              <div className="mt-auto pt-4">
                <div className="h-1 overflow-hidden rounded-full bg-surface-container-high">
                  <div className={`h-full rounded-full ${step.progress} ${step.progressColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
