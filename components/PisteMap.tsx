'use client'

import { useState } from 'react'
import { Map as MapIcon, ExternalLink, Download, TrendingUp, Activity } from 'lucide-react'
import Image from 'next/image'

interface PisteMapProps {
  mapUrl: string
  officialLink: string
  stats: {
    totalPistes: number
    openPistes: number
    liftsTotal: number
    liftsOpen: number
  }
}

export default function PisteMap({ mapUrl, officialLink, stats }: PisteMapProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openPercentage = Math.round((stats.openPistes / stats.totalPistes) * 100)
  const liftsPercentage = Math.round((stats.liftsOpen / stats.liftsTotal) * 100)

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MapIcon className="text-blue-600" size={28} />
          Piste Map & Resort Status
        </h3>
        <a
          href={officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          Official Map
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Open Pistes</p>
            <Activity className="text-green-500" size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {stats.openPistes}
            <span className="text-sm text-gray-600">/{stats.totalPistes}</span>
          </p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${openPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{openPercentage}% open</p>
        </div>

        <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Lifts Running</p>
            <TrendingUp className="text-blue-500" size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {stats.liftsOpen}
            <span className="text-sm text-gray-600">/{stats.liftsTotal}</span>
          </p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
              style={{ width: `${liftsPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{liftsPercentage}% operational</p>
        </div>

        <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-gray-600 mb-2">Total Terrain</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalPistes}</p>
          <p className="text-xs text-gray-500 mt-1">Pistes available</p>
        </div>

        <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-gray-600 mb-2">Infrastructure</p>
          <p className="text-2xl font-bold text-gray-800">{stats.liftsTotal}</p>
          <p className="text-xs text-gray-500 mt-1">Total lifts</p>
        </div>
      </div>

      {/* Map Preview */}
      <div
        className="relative h-96 rounded-xl overflow-hidden cursor-pointer group bg-gray-200"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={mapUrl}
          alt="Piste Map"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-gray-800 font-semibold flex items-center gap-2">
              <MapIcon size={20} />
              Click to Enlarge
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
        >
          <MapIcon size={18} />
          View Full Map
        </button>
        <a
          href={mapUrl}
          download
          className="bg-white/60 hover:bg-white/80 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 backdrop-blur-sm"
        >
          <Download size={18} />
          Download
        </a>
        <a
          href={officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/60 hover:bg-white/80 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 backdrop-blur-sm"
        >
          <ExternalLink size={18} />
          Official Site
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full h-[85vh] bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src={mapUrl}
                alt="Full Piste Map"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}

      {/*
        INTEGRATION NOTE:
        Piste map data can be obtained from:
        - Resort official websites (usually have downloadable PDF/JPG maps)
        - Skiresort.info API
        - OpenStreetMap data for custom trail rendering
        - Resort APIs (if available)

        Live piste status can be scraped from:
        - Resort official apps/websites
        - Third-party services like:
          * Skiresort.info
          * Bergfex.com
          * OnTheSnow.com

        Example API endpoint structure:
        GET /api/resort-status?resortId=ischgl
        Response: {
          openPistes: 215,
          totalPistes: 239,
          liftsOpen: 42,
          liftsTotal: 45,
          lastUpdated: "2025-12-15T08:00:00Z"
        }
      */}
    </div>
  )
}
