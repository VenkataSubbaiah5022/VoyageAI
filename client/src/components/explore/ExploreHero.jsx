import { useState } from 'react'

export default function ExploreHero({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) {
  const [searchFocused, setSearchFocused] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearchSubmit?.()
  }

  return (
    <section className="mb-16">
      <div className="mb-12 max-w-3xl">
        <h1 className="mb-4 font-display-lg text-display-lg text-primary">
          Discover your next <span className="text-secondary">adventure</span>
        </h1>
        <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
          AI-curated itineraries and trending destinations tailored for the modern explorer.
        </p>
        <form
          onSubmit={handleSearch}
          className={`relative transition-transform duration-200 ${searchFocused ? 'scale-[1.01]' : ''}`}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="material-symbols-outlined text-outline" aria-hidden="true">
              search
            </span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Where do you want to go?"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-4 pr-32 pl-12 font-body-md text-body-md shadow-sm transition-all focus:border-transparent focus:ring-2 focus:ring-on-primary-container focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-2 right-2 bottom-2 rounded-lg bg-secondary px-6 font-label-md text-label-md text-on-secondary transition-colors hover:bg-secondary/90"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-2 font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-primary text-on-primary hover:opacity-90'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
