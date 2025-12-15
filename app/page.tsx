'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Mountain, Snowflake, Wind } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()

  // Popular ski resorts for suggestions
  const popularResorts = ['Ischgl', 'St. Anton am Arlberg', 'Aspen Snowmass']

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to dashboard with search query
      router.push(`/dashboard?resort=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)

    // Show suggestions when user types
    if (value.trim().length > 0) {
      const filtered = popularResorts.filter(resort =>
        resort.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const selectSuggestion = (resort: string) => {
    setSearchQuery(resort)
    setSuggestions([])
    router.push(`/dashboard?resort=${encodeURIComponent(resort)}`)
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2400)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/30 to-blue-900/50"></div>
      </div>

      {/* Animated Snow Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Snowflake className="text-white/20" size={12 + Math.random() * 8} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <Mountain className="text-white drop-shadow-lg" size={48} />
          <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl">
            Schnee<span className="text-blue-300">Info</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-lg font-light">
          Your Ultimate Snow Intelligence Platform
        </p>

        {/* Search Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
            <Wind className="text-blue-200" />
            Find Your Perfect Conditions
          </h2>

          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Search for a ski resort (e.g., Ischgl, Aspen...)"
                className="glass-input w-full px-6 py-4 md:py-5 text-lg rounded-full text-gray-800 placeholder-gray-500 pr-14"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-3.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Search"
              >
                <Search size={24} />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-2 glass-card rounded-xl overflow-hidden shadow-2xl">
                {suggestions.map((resort, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(resort)}
                    className="w-full px-6 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 border-b border-white/10 last:border-b-0"
                  >
                    {resort}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Popular Resorts Quick Links */}
        <div className="glass rounded-xl p-6">
          <p className="text-white/80 mb-4 text-sm uppercase tracking-wider">Popular Resorts</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularResorts.map((resort, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(resort)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
              >
                {resort}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <Snowflake className="text-blue-200 mb-3 mx-auto" size={32} />
            <h3 className="text-white font-semibold mb-2">Real-Time Snow Data</h3>
            <p className="text-white/70 text-sm">Live snow depth updates from valley to peak</p>
          </div>
          <div className="glass rounded-xl p-6">
            <Wind className="text-blue-200 mb-3 mx-auto" size={32} />
            <h3 className="text-white font-semibold mb-2">Accurate Forecasts</h3>
            <p className="text-white/70 text-sm">5-day weather predictions with snowfall probability</p>
          </div>
          <div className="glass rounded-xl p-6">
            <Mountain className="text-blue-200 mb-3 mx-auto" size={32} />
            <h3 className="text-white font-semibold mb-2">Live Webcams</h3>
            <p className="text-white/70 text-sm">See current conditions with live camera feeds</p>
          </div>
        </div>
      </div>
    </main>
  )
}
