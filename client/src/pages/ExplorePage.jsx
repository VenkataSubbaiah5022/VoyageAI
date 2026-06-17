import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { exploreApi } from '../services/api'
import { CATEGORIES } from '../data/exploreDemo'
import AppNavbar from '../components/layout/AppNavbar'
import ExploreHero from '../components/explore/ExploreHero'
import TrendingDestinations, { ExploreHowItWorks } from '../components/explore/TrendingDestinations'
import ExploreFooter from '../components/explore/ExploreFooter'

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'all'
    setSearchQuery(q)
    setActiveCategory(category)

    setLoading(true)
    exploreApi
      .getDestinations({ q, category })
      .then(({ data }) => {
        setDestinations(data.destinations || [])
        setError(null)
      })
      .catch((err) => {
        setDestinations([])
        setError(err?.message || 'Could not load destinations')
      })
      .finally(() => setLoading(false))
  }, [searchParams])

  const updateFilters = (next) => {
    const params = new URLSearchParams()
    const q = next.searchQuery ?? searchQuery
    const category = next.category ?? activeCategory

    if (q.trim()) params.set('q', q.trim())
    if (category && category !== 'all') params.set('category', category)
    setSearchParams(params, { replace: true })
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    updateFilters({ category })
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  return (
    <div className="min-h-svh overflow-x-hidden bg-background font-body-md text-on-background">
      <AppNavbar activeItem="explore" />
      <main className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <ExploreHero
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={() => updateFilters({ searchQuery })}
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
        ) : destinations.length === 0 ? (
          <p className="py-16 text-center font-body-md text-on-surface-variant">
            No destinations match your search. Try a different keyword or category.
          </p>
        ) : (
          <TrendingDestinations destinations={destinations} />
        )}
        <ExploreHowItWorks />
      </main>
      <ExploreFooter />
    </div>
  )
}
