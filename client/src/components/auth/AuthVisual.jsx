const AUTH_VISUAL_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBTce5jBXvrQPfFblMGGEU7G92LBQ0kVbP2_40WXKyeq3503tTa1Hz_x_I1lkF-MbNcAQDLvlSCQvpZwP7TPwLuQ6pa1R4zwalBie1aeCPdaEIGWIpCGZvPRKBgxUbtbTg-4YnsdIKY-XfEDXHbUkRXPND0A4oxpWRVh466UPPLPllc7SJJsPXF591uA2uVc-iaFQgqM6sZ84FjMOY34v3oYyrvTQhktU4dcASSzvy3TTr3QOc5Twi5lV-HAjaK58ZE6NqC0OjCKpV6'

export default function AuthVisual({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      className="relative hidden h-full overflow-hidden bg-primary-container lg:flex lg:w-1/2"
    >
      <img
        src={AUTH_VISUAL_IMAGE}
        alt="Tropical island aerial view"
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-[var(--spacing-margin-desktop)]">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined filled text-4xl text-secondary"
            aria-hidden="true"
          >
            explore
          </span>
          <h1 className="font-headline-md text-title-lg font-bold tracking-tight text-white">
            VoyageAI
          </h1>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 font-display-lg text-display-lg text-white">
            Precision planning for your next adventure.
          </h2>
          <p className="max-w-md font-body-lg text-body-lg text-white/80">
            Experience the future of travel with AI-driven itineraries tailored to your unique
            spirit of discovery.
          </p>
        </div>

        <div className="flex gap-8 text-white/60">
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-white">12k+</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">
              Destinations
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-white">4.9/5</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">
              User Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
