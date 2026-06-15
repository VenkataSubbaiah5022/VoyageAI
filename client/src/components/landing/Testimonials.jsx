import Icon from '../Icon'

const TESTIMONIALS = [
  {
    quote:
      'VoyageAI turned my messy pile of booking emails into a seamless 10-day Tokyo itinerary in less than two minutes. The suggestions for local ramen spots were spot on!',
    name: 'Sarah J.',
    role: 'Frequent Traveler',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2HWn7H3uuKZqEbPce5rkTd1soaaia4Sgw8kPfSI60G9-AleRWJmYjEt09_2-48T9NY5CGNjeS-Pks0ulIvWJBGbEPTP5ak3QxAGoVV8TZs9Eq6y9RMI-6MXhZIbpyodvhFhhZqZYoxjcx1e441RxsKEfdfY1-j6JIKIn4DWOxu2Kyx9uQj7hg3Qf7apeItFjpCl5zSjQIqNX2L43hZUVTU6r2ZJcwTbh5JISx6rnjhMEYvagiaQWoFHaebC9ZlaFhyWnZoI9_0lxS',
  },
  {
    quote:
      'Planning group trips used to be a nightmare. Now I just upload the group hotel reservation and share the VoyageAI link. It\'s transformed how we travel.',
    name: 'Mark D.',
    role: 'Digital Nomad',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3FXPmDrtYZZwIP75PA2Y_udfAkIDkTRPSjidEcC9uaPOpqFmGVfNxfe3nU2VE7XsLMXtapHHa1AZ7PFO7NTBT18N7I3ChIBRWlynJXsLt93msTnD6XbhpT5kujwwloLvSs7UsMgCMKwBF-EuJn-qJdV_Rmd8bze9-n1zDrNlSpjA0yKc6vLd85OLCHkj95fN-qYQ5xRZuGPSOv1H2-8DzdLmMJ-8HAa7J8zKPUA5wkLNtQr1OaJTnm47Qii2wZsPDwzQXptRhKtHB',
  },
]

function Stars() {
  return (
    <div className="mb-4 flex gap-1 text-secondary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={18} filled />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-background px-[var(--spacing-margin-mobile)] py-24 md:px-[var(--spacing-margin-desktop)]">
      <div className="relative mx-auto max-w-[var(--spacing-container-max)] text-center">
        <div className="absolute -left-12 -top-12 scale-[5] text-primary opacity-5">
          <Icon name="format_quote" size={24} filled />
        </div>

        <h2 className="mb-16 font-headline-md text-headline-md text-primary">What Travelers Say</h2>

        <div className="flex flex-wrap justify-center gap-[var(--spacing-gutter)]">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative z-10 max-w-sm rounded-xl border border-outline-variant/30 bg-white p-8 text-left shadow-sm"
            >
              <Stars />
              <p className="mb-6 font-body-md italic text-on-surface-variant">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-label-md text-label-md font-bold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
