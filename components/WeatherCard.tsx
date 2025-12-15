'use client'

import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from 'lucide-react'

interface WeatherForecast {
  date: string
  tempHigh: number
  tempLow: number
  snowfall: number
  snowfallProbability: number
  condition: string
}

interface WeatherCardProps {
  forecast: WeatherForecast[]
  currentTemp: number
  currentCondition: string
  currentWindSpeed: number
}

// Helper function to get weather icon based on condition
const getWeatherIcon = (condition: string, size: number = 24) => {
  const lowerCondition = condition.toLowerCase()

  if (lowerCondition.includes('snow')) {
    return <CloudSnow size={size} className="text-blue-300" />
  } else if (lowerCondition.includes('rain')) {
    return <CloudRain size={size} className="text-blue-400" />
  } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
    return <Sun size={size} className="text-yellow-300" />
  } else if (lowerCondition.includes('cloud')) {
    return <Cloud size={size} className="text-gray-300" />
  }

  return <Cloud size={size} className="text-gray-300" />
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function WeatherCard({
  forecast,
  currentTemp,
  currentCondition,
  currentWindSpeed,
}: WeatherCardProps) {
  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          {getWeatherIcon(currentCondition, 32)}
          Current Conditions
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-gray-600 mb-1">Temperature</p>
            <p className="text-3xl font-bold text-gray-800">{currentTemp}°C</p>
          </div>

          <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
              <Wind size={16} /> Wind Speed
            </p>
            <p className="text-3xl font-bold text-gray-800">{currentWindSpeed} <span className="text-lg">km/h</span></p>
          </div>

          <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm col-span-2 md:col-span-1">
            <p className="text-sm text-gray-600 mb-1">Condition</p>
            <p className="text-xl font-semibold text-gray-800">{currentCondition}</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <CloudSnow className="text-blue-500" size={28} />
          5-Day Forecast
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white/40 rounded-xl p-4 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 hover:scale-105"
            >
              {/* Date */}
              <p className="font-semibold text-gray-800 mb-3 text-center">
                {formatDate(day.date)}
              </p>

              {/* Weather Icon */}
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.condition, 40)}
              </div>

              {/* Temperature */}
              <div className="text-center mb-3">
                <p className="text-2xl font-bold text-gray-800">
                  {day.tempHigh}°
                </p>
                <p className="text-sm text-gray-600">
                  Low: {day.tempLow}°
                </p>
              </div>

              {/* Snowfall */}
              {day.snowfall > 0 && (
                <div className="bg-blue-100/50 rounded-lg p-2 mb-2">
                  <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <CloudSnow size={14} className="text-blue-500" />
                    {day.snowfall}cm snow
                  </p>
                </div>
              )}

              {/* Probability */}
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                <Droplets size={14} className="text-blue-400" />
                {day.snowfallProbability}% chance
              </div>

              {/* Condition */}
              <p className="text-xs text-gray-500 text-center mt-2">
                {day.condition}
              </p>
            </div>
          ))}
        </div>

        {/*
          INTEGRATION NOTE:
          To fetch real weather data, integrate with APIs like:
          - OpenWeatherMap API: https://openweathermap.org/api
          - Weather.gov API (US): https://www.weather.gov/documentation/services-web-api
          - MeteoBlue API: https://www.meteoblue.com/en/weather-api

          Example API call structure:
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          )
          const data = await response.json()
        */}
      </div>
    </div>
  )
}
