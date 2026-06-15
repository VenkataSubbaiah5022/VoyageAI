import Icon from '../Icon'

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBc59oomq1M2htPEgMZ1OoJBA5hBhiNb4zxRecp6QPfhnj-2ualEHrjpJDymywAGbv9s32Zp7yQI_iprhkuLlYT-__OTS8m3-Yngb5IBfFc9Fbjk38ZD5Q2gFdT_B6LGy__3CzTzV3bRNrw2pyMQAoSFgpCVHy1KYDuhNLTdlA_W5OQFDItcgWtVjZfK5beuiB07JQ4TjVkeP5fAUAPIWa9fWmHfmwEzSo7izIwH6ttTwcBgmG87jkMTQng63YSKyrk-kRhOCAYiA7T'

export default function Hero() {
  return (
    <section className="relative flex min-h-[870px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Panoramic mountain lake at dawn"
          className="h-full w-full object-cover brightness-75"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] text-center text-white md:px-[var(--spacing-margin-desktop)]">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1 backdrop-blur-md">
          <Icon name="auto_awesome" size={18} />
          <span className="font-label-md text-label-md">Next-Gen AI Planning</span>
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl font-display-lg-mobile text-display-lg-mobile drop-shadow-lg md:font-display-lg md:text-display-lg">
          Your Trip, Perfectly Planned by AI
        </h1>

        <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-white/90 drop-shadow-md">
          Upload your flight and hotel bookings. We&apos;ll instantly extract the details and craft a
          personalized, hour-by-hour itinerary for your perfect getaway.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="rounded-lg bg-secondary-container px-8 py-4 font-title-lg text-title-lg font-bold text-on-secondary-container shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Get Started
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/40 bg-white/10 px-8 py-4 font-title-lg text-title-lg text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            Watch Demo
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
