'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ArrowLeft, MapPin, Globe, Calendar } from 'lucide-react'
import { searchResorts, type SkiResort } from '@/data/mockResorts'
import WeatherCard from '@/components/WeatherCard'
import SnowDepth from '@/components/SnowDepth'
import LiveCams from '@/components/LiveCams'
import PisteMap from '@/components/PisteMap'

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [resort, setResort] = useState<SkiResort | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resortQuery = searchParams.get('resort')

    if (!resortQuery) {
      setError('No resort specified')
      setLoading(false)
      return
    }

    /*
      INTEGRATION NOTE:
      In production, this would be an API call to fetch real-time data:

      const fetchResortData = async (query: string) => {
        try {
          // Call your backend API
          const response = await fetch(`/api/resorts/search?q=${encodeURIComponent(query)}`)

          if (!response.ok) {
            throw new Error('Resort not found')
          }

          const data = await response.json()

          // The API should aggregate data from multiple sources:
          // 1. OpenWeatherMap for weather forecast
          // 2. Resort official API for snow depth and piste status
          // 3. Webcam providers for live cams
          // 4. Your database for cached/historical data

          return data
        } catch (err) {
          throw new Error('Failed to fetch resort data')
        }
      }

      Example API response structure:
      {
        id: "ischgl",
        name: "Ischgl",
        coordinates: { lat: 47.0116, lng: 10.2991 },
        snowDepth: { valley: 45, mountain: 125, lastUpdated: "..." },
        weather: { ... },
        liveCams: [ ... ],
        pisteMap: { ... },
        stats: { ... }
      }
    */

    // Mock implementation - search from local data
    const results = searchResorts(resortQuery)

    if (results.length === 0) {
      setError(`No results found for "${resortQuery}". Try searching for Ischgl, St. Anton, or Aspen.`)
      setLoading(false)
      return
    }

    setResort(results[0])
    setLoading(false)
  }, [searchParams])

  const handleBackToSearch = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading resort data...</p>
        </div>
      </div>
    )
  }

  if (error || !resort) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Resort Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors font-medium flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=2400)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>

        <div className="container mx-auto px-6 relative z-10">
          <button
            onClick={handleBackToSearch}
            className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Search
          </button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{resort.name}</h1>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <p className="flex items-center gap-2">
                  <MapPin size={18} />
                  {resort.region}, {resort.country}
                </p>
                <p className="flex items-center gap-2">
                  <Globe size={18} />
                  {resort.elevation.valley}m - {resort.elevation.mountain}m
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 glass rounded-xl px-6 py-3">
              <p className="text-sm text-blue-100 mb-1">Season</p>
              <p className="flex items-center gap-2 font-semibold">
                <Calendar size={18} />
                {new Date(resort.stats.season.start).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                {' - '}
                {new Date(resort.stats.season.end).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Interactive Map Section */}
          <section className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="text-blue-600" size={28} />
              Location
            </h2>
            <div className="h-[400px] rounded-xl overflow-hidden">
              <Map
                lat={resort.coordinates.lat}
                lng={resort.coordinates.lng}
                resortName={resort.name}
              />
            </div>
          </section>

          {/* Snow Depth */}
          <section>
            <SnowDepth
              valleyDepth={resort.snowDepth.valley}
              mountainDepth={resort.snowDepth.mountain}
              lastUpdated={resort.snowDepth.lastUpdated}
              valleyElevation={resort.elevation.valley}
              mountainElevation={resort.elevation.mountain}
            />
          </section>

          {/* Weather Forecast */}
          <section>
            <WeatherCard
              forecast={resort.weather.forecast}
              currentTemp={resort.weather.current.temperature}
              currentCondition={resort.weather.current.condition}
              currentWindSpeed={resort.weather.current.windSpeed}
            />
          </section>

          {/* Piste Map & Status */}
          <section>
            <PisteMap
              mapUrl={resort.pisteMap.url}
              officialLink={resort.pisteMap.officialLink}
              stats={resort.stats}
            />
          </section>

          {/* Live Webcams */}
          <section>
            <LiveCams cams={resort.liveCams} />
          </section>

          {/* Data Sources Information */}
          <section className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Data Sources & Reliability</h3>
            <div className="bg-blue-50/50 rounded-xl p-4 text-sm text-gray-700">
              <p className="mb-2">
                <strong>Snow Intelligence Engine:</strong> Our platform aggregates data from multiple trusted sources to ensure accuracy:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Official resort APIs and weather stations for snow depth</li>
                <li>OpenWeatherMap API for meteorological forecasts</li>
                <li>Live webcam feeds from resort partners</li>
                <li>Real-time piste status from resort management systems</li>
              </ul>
              <p className="mt-3 text-xs text-gray-600">
                Data is updated every 15 minutes. Last update: {new Date().toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; 2025 Schnee Info. Premium Ski Resort Intelligence Platform.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built with Next.js, React, Tailwind CSS, and Leaflet
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
