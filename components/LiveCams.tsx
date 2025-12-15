'use client'

import { useState } from 'react'
import { Camera, ExternalLink, MapPin, Maximize2 } from 'lucide-react'
import Image from 'next/image'

interface LiveCam {
  id: string
  name: string
  location: string
  url: string
  thumbnailUrl: string
}

interface LiveCamsProps {
  cams: LiveCam[]
}

export default function LiveCams({ cams }: LiveCamsProps) {
  const [selectedCam, setSelectedCam] = useState<LiveCam | null>(null)

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Camera className="text-blue-600" size={28} />
        Live Webcams
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cams.map((cam) => (
          <div
            key={cam.id}
            className="bg-white/40 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-white/60 transition-all duration-300 hover:scale-105 cursor-pointer group"
            onClick={() => setSelectedCam(cam)}
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Image
                src={cam.thumbnailUrl}
                alt={cam.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Live Badge */}
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                LIVE
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Camera size={16} className="text-blue-500" />
                {cam.name}
              </h4>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <MapPin size={12} />
                {cam.location}
              </p>

              {/* View Link */}
              <a
                href={cam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Open Full Stream
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Cam */}
      {selectedCam && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCam(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedCam.name}</h3>
                <p className="text-sm text-blue-100 flex items-center gap-1">
                  <MapPin size={14} />
                  {selectedCam.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedCam(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            {/* Image */}
            <div className="relative h-96 bg-gray-100">
              <Image
                src={selectedCam.thumbnailUrl}
                alt={selectedCam.name}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />

              {/* Live Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                <span className="w-3 h-3 bg-white rounded-full"></span>
                LIVE
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCam(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <a
                href={selectedCam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                Open Full Stream
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/*
        INTEGRATION NOTE:
        Live webcam feeds can be sourced from:
        - Feratel.com (provides webcam infrastructure for many European resorts)
        - Resort official websites (look for webcam sections)
        - Webcam services like:
          * roundshot.com
          * panomax.com
          * foto-webcam.eu

        Many resorts provide embeddable iframe URLs or direct image URLs
        that refresh every few minutes.

        Example implementation:
        <iframe
          src="https://www.feratel.com/webcams/embed/resort-name"
          width="100%"
          height="400"
          frameBorder="0"
        />

        For live streaming, some resorts use:
        - YouTube Live (can be embedded)
        - Direct RTSP/HLS streams (require video player)
      */}
    </div>
  )
}
