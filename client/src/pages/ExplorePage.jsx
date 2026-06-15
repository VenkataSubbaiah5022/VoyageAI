import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { exploreApi } from '../services/api'
import { CATEGORIES } from '../data/exploreDemo'
import AppNavbar from '../components/layout/AppNavbar'
import ExploreHero from '../components/explore/ExploreHero'
import TrendingDestinations, { ExploreHowItWorks } from '../components/explore/TrendingDestinations'
import ExploreFooter from '../components/explore/ExploreFooter'

export default function ExplorePage() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    exploreApi
      .getDestinations()
      .then(({ data }) => setDestinations(data.destinations || []))
      .catch(() => {
        setDestinations([
          {
            id: 'demo',
            size: 'large',
            category: 'beach',
            tag: 'Beach',
            tagBg: 'bg-tertiary-fixed',
            tagColor: 'text-on-tertiary-fixed-variant',
            rating: '4.9',
            title: 'Amalfi Coast, Italy',
            description:
              'Explore the dramatic coastline and cliffside villages of Southern Italy with a fully AI-curated itinerary.',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9kkhR2wMmUPiyqUtJcZb4xkFQcj4lzT3Oh4As4u5IbU9-BuMdLrUBYZftK97AxqLACaa3M6jr2R8neAz4ekEyfHz3C12pDmfMAddebp6RCoa7N2iCG_bYzghcybUOmsivzxe8zLAa3XqH3wpDUUO9dsa6az5Efb8nc5KI1mBVHZqfLUrjpCmS7I55Mi0DiY8nxF6LxaRmGWFF41nvssuEJ72H5AyjafVN2VCPR8dFVqqkEIFpsfP1F3anIV98rBT3yE9vi-2v8Eu',
            shareId: 'demo',
            buttonStyle: 'primary',
          },
        ])
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
        {loading ? (
          <p className="py-16 text-center font-body-md text-on-surface-variant">
            Loading destinations...
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
