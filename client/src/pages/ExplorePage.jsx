import { useEffect, useMemo, useState } from 'react'
import { exploreApi } from '../services/api'
import { CATEGORIES } from '../data/exploreDemo'
import AppNavbar from '../components/layout/AppNavbar'
import ExploreHero from '../components/explore/ExploreHero'
import TrendingDestinations, { ExploreHowItWorks } from '../components/explore/TrendingDestinations'
import ExploreFooter from '../components/explore/ExploreFooter'

export default function ExplorePage() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    exploreApi
      .getDestinations()
      .then(({ data }) => {
        setDestinations(data.destinations || [])
        setError(null)
      })
      .catch((err) => {
        setDestinations([])
        setError(err?.message || 'Could not load destinations')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredDestinations = useMemo(() => {
    let results = destinations

    if (activeCategory !== 'all') {
      results = results.filter((d) => d.category === activeCategory)
    }

    const q = searchQuery.trim().toLowerCase()
    if (q) {
      results = results.filter(
        (d) =>
          d.title?.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q) ||
          d.tag?.toLowerCase().includes(q),
      )
    }

    return results
  }, [destinations, activeCategory, searchQuery])

  return (
    <div className="min-h-svh overflow-x-hidden bg-background font-body-md text-on-background">
      <AppNavbar activeItem="explore" />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <ExploreHero
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {error && (
          <div
            role="alert"
            className="mb-8 rounded-xl border border-error/30 bg-error-container px-4 py-3 font-body-md text-on-error-container"
          >
            {error}
          </div>
        )}
        {loading ? (
          <p className="py-16 text-center font-body-md text-on-surface-variant">
            Loading destinations...
          </p>
        ) : filteredDestinations.length === 0 ? (
          <p className="py-16 text-center font-body-md text-on-surface-variant">
            {destinations.length === 0
              ? 'No destinations available right now.'
              : 'No destinations match your filters.'}
          </p>
        ) : (
          <TrendingDestinations destinations={filteredDestinations} />
        )}
        <ExploreHowItWorks />
      </main>
      <ExploreFooter />
    </div>
  )
}
