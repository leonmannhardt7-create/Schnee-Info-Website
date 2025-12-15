'use client'

import { Mountain, TrendingUp, TrendingDown, Clock } from 'lucide-react'

interface SnowDepthProps {
  valleyDepth: number
  mountainDepth: number
  lastUpdated: string
  valleyElevation: number
  mountainElevation: number
}

export default function SnowDepth({
  valleyDepth,
  mountainDepth,
  lastUpdated,
  valleyElevation,
  mountainElevation,
}: SnowDepthProps) {
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate the visual representation
  const maxDepth = Math.max(valleyDepth, mountainDepth)
  const valleyPercentage = (valleyDepth / maxDepth) * 100
  const mountainPercentage = (mountainDepth / maxDepth) * 100

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Mountain className="text-blue-600" size={28} />
          Snow Depth Report
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>Updated: {formatLastUpdated(lastUpdated)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Valley Snow */}
        <div className="bg-white/40 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Valley Station</p>
              <p className="text-xs text-gray-500">{valleyElevation}m elevation</p>
            </div>
            <TrendingDown className="text-blue-400" size={24} />
          </div>

          <div className="mb-4">
            <p className="text-5xl font-bold text-gray-800 mb-2">
              {valleyDepth}
              <span className="text-2xl text-gray-600 ml-2">cm</span>
            </p>
          </div>

          {/* Visual Bar */}
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-300 to-blue-500 transition-all duration-500"
              style={{ width: `${valleyPercentage}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            {valleyDepth < 30 && 'Limited coverage'}
            {valleyDepth >= 30 && valleyDepth < 60 && 'Good coverage'}
            {valleyDepth >= 60 && 'Excellent coverage'}
          </p>
        </div>

        {/* Mountain Snow */}
        <div className="bg-white/40 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Mountain Top</p>
              <p className="text-xs text-gray-500">{mountainElevation}m elevation</p>
            </div>
            <TrendingUp className="text-blue-600" size={24} />
          </div>

          <div className="mb-4">
            <p className="text-5xl font-bold text-gray-800 mb-2">
              {mountainDepth}
              <span className="text-2xl text-gray-600 ml-2">cm</span>
            </p>
          </div>

          {/* Visual Bar */}
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-700 transition-all duration-500"
              style={{ width: `${mountainPercentage}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            {mountainDepth < 50 && 'Limited coverage'}
            {mountainDepth >= 50 && mountainDepth < 100 && 'Good coverage'}
            {mountainDepth >= 100 && 'Excellent coverage'}
          </p>
        </div>
      </div>

      {/* Snow Quality Indicator */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Overall Conditions</p>
          <div className="flex items-center gap-2">
            {mountainDepth >= 100 && valleyDepth >= 40 && (
              <span className="px-4 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                Excellent
              </span>
            )}
            {mountainDepth >= 60 && mountainDepth < 100 && (
              <span className="px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                Good
              </span>
            )}
            {mountainDepth < 60 && (
              <span className="px-4 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                Fair
              </span>
            )}
          </div>
        </div>
      </div>

      {/*
        INTEGRATION NOTE:
        Real snow depth data can be sourced from:
        - Ski resort official APIs (most reliable)
        - Snow-forecast.com API
        - OnTheSnow.com (may require web scraping)
        - Resort-specific weather stations

        Example integration:
        const fetchSnowDepth = async (resortId) => {
          const response = await fetch(`/api/snow-depth?resort=${resortId}`)
          const data = await response.json()
          return data
        }
      */}
    </div>
  )
}
