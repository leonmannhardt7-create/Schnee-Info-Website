'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Mountain } from 'lucide-react'

// Fix for default marker icon in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface MapProps {
  lat: number
  lng: number
  resortName: string
  zoom?: number
}

export default function Map({ lat, lng, resortName, zoom = 13 }: MapProps) {
  useEffect(() => {
    // Clean up on component unmount
    return () => {
      // Leaflet cleanup if needed
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        {/*
          OpenStreetMap tile layer
          In production, consider using:
          - Mapbox (https://www.mapbox.com/) for custom styling
          - Google Maps API
          - Other premium tile providers
        */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Alternative: Topographic map (better for ski resorts) */}
        {/* <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        /> */}

        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <div className="font-semibold text-center">
              <Mountain className="inline-block mr-2" size={16} />
              {resortName}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
