import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="mb-20 px-[var(--spacing-margin-mobile)] py-20 md:px-[var(--spacing-margin-desktop)]">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary p-12 text-center text-on-primary md:p-16">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary opacity-20" />

        <div className="relative z-10">
          <h2 className="mb-6 font-display-lg-mobile md:font-headline-md md:text-headline-md">
            Ready for your next adventure?
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-body-lg text-body-lg opacity-90">
            Join over 50,000 travelers who use VoyageAI to plan smarter and discover more.
          </p>
          <Link
            to="/auth/signup"
            className="inline-block rounded-lg bg-secondary-container px-10 py-5 font-title-lg text-title-lg font-bold text-on-secondary-container shadow-2xl transition-transform hover:scale-105"
          >
            Get Started Free
          </Link>
          <p className="mt-6 font-label-sm text-label-sm opacity-70">
            No credit card required. Free for your first 3 trips.
          </p>
        </div>
      </div>
    </section>
  )
}
